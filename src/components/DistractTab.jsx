import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trash2, RotateCcw, Trophy, Play, Heart, CloudRain, ShoppingBag } from 'lucide-react';
import { playPop, playShatter, playChime } from '../utils/audio';

export default function DistractTab({ name }) {
  // Bubble wrap state
  const totalBubbles = 24;
  const [poppedBubbles, setPoppedBubbles] = useState({});
  const [popScore, setPopScore] = useState(0);

  // Vent shredder state
  const [ventText, setVentText] = useState('');
  const [isShredding, setIsShredding] = useState(false);
  const [shreddedSuccess, setShreddedSuccess] = useState(false);

  // Mini game state
  const [gameActive, setGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameTimeLeft, setGameTimeLeft] = useState(20);
  const [basketPos, setBasketPos] = useState(50); // percentage 0-100
  const [fallingItems, setFallingItems] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef(null);
  const timerRef = useRef(null);

  // Bubble wrap click
  const handleBubbleClick = (index) => {
    if (poppedBubbles[index]) return;
    const randomFreq = 500 + Math.random() * 350;
    playPop(randomFreq);

    setPoppedBubbles((prev) => ({ ...prev, [index]: true }));
    setPopScore((prev) => prev + 1);

    if (Object.keys(poppedBubbles).length + 1 === totalBubbles) {
      playChime();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
    }
  };

  const resetBubbles = () => {
    playPop(480);
    setPoppedBubbles({});
  };

  // Vent shredder submit
  const handleShred = (e) => {
    e.preventDefault();
    if (!ventText.trim()) return;

    setIsShredding(true);
    playShatter();

    setTimeout(() => {
      setIsShredding(false);
      setVentText('');
      setShreddedSuccess(true);
      setTimeout(() => setShreddedSuccess(false), 3500);
    }, 1100);
  };

  // Mini Game logic
  const startGame = () => {
    playPop(650);
    setGameScore(0);
    setGameTimeLeft(20);
    setFallingItems([]);
    setGameOver(false);
    setGameActive(true);
  };

  useEffect(() => {
    if (!gameActive) return;

    timerRef.current = setInterval(() => {
      setGameTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          clearInterval(gameLoopRef.current);
          setGameActive(false);
          setGameOver(true);
          playChime();
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    let nextId = 0;
    gameLoopRef.current = setInterval(() => {
      setFallingItems((prev) => {
        let updated = prev
          .map((item) => ({ ...item, y: item.y + 4.5 }))
          .filter((item) => item.y < 100);

        updated = updated.filter((item) => {
          if (item.y > 80 && item.y < 95 && Math.abs(item.x - basketPos) < 16) {
            if (item.type === 'cloud') {
              playPop(300);
              setGameScore((s) => Math.max(0, s - 5));
            } else {
              playPop(750);
              setGameScore((s) => s + (item.type === 'star' ? 15 : 10));
            }
            return false;
          }
          return true;
        });

        if (Math.random() < 0.35) {
          const types = ['heart', 'heart', 'star', 'cloud'];
          const type = types[Math.floor(Math.random() * types.length)];
          updated.push({
            id: ++nextId,
            x: 12 + Math.random() * 76,
            y: 0,
            type,
          });
        }

        return updated;
      });
    }, 100);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(gameLoopRef.current);
    };
  }, [gameActive, basketPos]);

  const moveBasket = (direction) => {
    playPop(450);
    setBasketPos((prev) => {
      if (direction === 'left') return Math.max(10, prev - 18);
      if (direction === 'right') return Math.min(90, prev + 18);
      return prev;
    });
  };

  return (
    <div className="tab-container animate-pop">
      {/* Vent Shredder */}
      <section className="comfort-card vent-shredder-card">
        <div className="card-badge-row">
          <span className="soft-pill shred-pill">
            <Trash2 size={13} /> The Vent Box
          </span>
          <span className="shred-subtitle">De-Stress Tool</span>
        </div>

        <p className="card-subtitle">
          Type whatever feels heavy, painful, or frustrating right now. Hit the button to clear it away.
        </p>

        <form onSubmit={handleShred} className="vent-form">
          <textarea
            value={ventText}
            onChange={(e) => setVentText(e.target.value)}
            placeholder="Type your thoughts here to let them go..."
            className={`vent-textarea ${isShredding ? 'shredding-shake' : ''}`}
            rows={3}
            disabled={isShredding}
          />

          <button 
            type="submit" 
            className={`shred-btn ${isShredding ? 'shredding-active' : ''}`}
            disabled={!ventText.trim() || isShredding}
          >
            <Trash2 size={15} />
            <span>{isShredding ? 'Clearing thought...' : 'Clear This Thought'}</span>
          </button>
        </form>

        {shreddedSuccess && (
          <div className="shred-success-banner animate-pop">
            <Sparkles size={16} />
            <span>Cleared away. Take a gentle breath. You are safe and cared for.</span>
          </div>
        )}
      </section>

      {/* Bubble Wrap Popper */}
      <section className="comfort-card bubble-wrap-card">
        <div className="card-header-simple">
          <div>
            <h3 className="card-title">Sensory Bubble Wrap</h3>
            <p className="card-subtitle">Satisfying tactile pops to ease nervous tension.</p>
          </div>
          <span className="bubble-count-tag">{popScore} Popped</span>
        </div>

        <div className="bubble-grid">
          {Array.from({ length: totalBubbles }).map((_, idx) => {
            const isPopped = !!poppedBubbles[idx];
            return (
              <button
                key={idx}
                className={`bubble-cell ${isPopped ? 'popped' : ''}`}
                onClick={() => handleBubbleClick(idx)}
                aria-label={`Bubble ${idx + 1}`}
              >
                <span className="bubble-shine" />
              </button>
            );
          })}
        </div>

        <button className="reset-bubble-btn" onClick={resetBubbles}>
          <RotateCcw size={13} /> Refill Bubbles
        </button>
      </section>

      {/* Mini Game */}
      <section className="comfort-card game-card">
        <div className="card-header-simple">
          <div>
            <h3 className="card-title">Quiet Treat Catcher</h3>
            <p className="card-subtitle">Catch hearts &amp; sparkles, avoid rain clouds.</p>
          </div>
          <span className="game-score-tag">Score: {gameScore}</span>
        </div>

        <div className="game-stage-container">
          {!gameActive && !gameOver && (
            <div className="game-overlay-start">
              <div className="clean-game-icons-preview">
                <Heart size={24} fill="#ff4d6d" color="#ff4d6d" />
                <Sparkles size={24} color="#ffd166" />
              </div>
              <p>A simple 20-second calming distraction.</p>
              <button className="start-game-btn" onClick={startGame}>
                <Play size={14} fill="#ffffff" /> Start
              </button>
            </div>
          )}

          {gameOver && (
            <div className="game-overlay-gameover animate-pop">
              <Trophy size={32} color="#f59f00" />
              <h4>Session Complete</h4>
              <p>You scored <strong>{gameScore} points</strong>.</p>
              <button className="start-game-btn retry-btn" onClick={startGame}>
                Play Again
              </button>
            </div>
          )}

          {gameActive && (
            <>
              <div className="game-timer-badge">{gameTimeLeft}s</div>

              {/* Falling items with Lucide icons */}
              {fallingItems.map((item) => (
                <div
                  key={item.id}
                  className="game-falling-item"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                >
                  {item.type === 'heart' && <Heart size={22} fill="#ff4d6d" color="#ff4d6d" />}
                  {item.type === 'star' && <Sparkles size={22} color="#ffd166" fill="#ffd166" />}
                  {item.type === 'cloud' && <CloudRain size={22} color="#868e96" />}
                </div>
              ))}

              {/* Player Paddle */}
              <div 
                className="game-basket"
                style={{ left: `${basketPos}%` }}
              >
                <div className="clean-paddle">
                  <ShoppingBag size={20} color="#ff4d6d" />
                </div>
              </div>
            </>
          )}
        </div>

        {gameActive && (
          <div className="game-controls-row">
            <button className="game-touch-btn" onClick={() => moveBasket('left')}>
              Left
            </button>
            <span className="touch-hint">Tap to steer</span>
            <button className="game-touch-btn" onClick={() => moveBasket('right')}>
              Right
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
