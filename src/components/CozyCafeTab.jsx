import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Coffee, Heart, Sparkles, Leaf, Flame, CloudRain, Info } from 'lucide-react';
import { CAFE_DRINKS } from '../data/comfortData';
import { playPop, playChime, playWarmHug } from '../utils/audio';

export default function CozyCafeTab({ name }) {
  const [selectedDrink, setSelectedDrink] = useState(CAFE_DRINKS[0]);
  const [isBrewing, setIsBrewing] = useState(false);
  const [servedDrink, setServedDrink] = useState(null);
  const [sipped, setSipped] = useState(false);

  const handleSelect = (drink) => {
    playPop(580);
    setSelectedDrink(drink);
    setServedDrink(null);
  };

  const handleBrew = () => {
    setIsBrewing(true);
    playWarmHug();

    setTimeout(() => {
      setIsBrewing(false);
      setServedDrink(selectedDrink);
      playChime();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff85a1', '#ffd166', '#a2d2ff']
      });
    }, 1100);
  };

  const handleTakeSip = () => {
    playWarmHug();
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.65 },
      colors: ['#ff85a1', '#ffd166', '#ffccd5']
    });
    setSipped(true);
    setTimeout(() => setSipped(false), 2800);
  };

  const renderDrinkIcon = (iconType, size = 20) => {
    switch (iconType) {
      case 'leaf': return <Leaf size={size} />;
      case 'flame': return <Flame size={size} />;
      case 'heart': return <Heart size={size} />;
      default: return <Coffee size={size} />;
    }
  };

  return (
    <div className="tab-container animate-pop">
      {/* Hero Cafe Card */}
      <section className="comfort-card cafe-hero-card">
        <div className="card-badge-row">
          <span className="soft-pill cafe-pill">
            <Coffee size={13} /> Warm Teas &amp; Drinks
          </span>
          <span className="cafe-tag">Gentle Remedies</span>
        </div>

        <div className="cafe-artwork-frame">
          <img 
            src="./assets/comfort_treats.jpg" 
            alt="Warm comfort drinks" 
            className="cafe-artwork-img"
          />
        </div>

        <div className="card-header-simple" style={{ marginTop: '12px' }}>
          <div>
            <h2 className="card-title">Warm Drink Brewer</h2>
            <p className="card-subtitle">Warm liquids help relax abdominal muscles and reduce cramping.</p>
          </div>
        </div>

        {/* Drink selection pills */}
        <div className="drinks-menu-grid">
          {CAFE_DRINKS.map((drink) => (
            <button
              key={drink.id}
              className={`drink-menu-item ${selectedDrink.id === drink.id ? 'active-drink' : ''}`}
              onClick={() => handleSelect(drink)}
            >
              <div className="drink-icon-wrap">
                {renderDrinkIcon(drink.iconType, 18)}
              </div>
              <span className="drink-name">{drink.name}</span>
              <span className="drink-tag-pill">{drink.tag}</span>
            </button>
          ))}
        </div>

        {/* Selected Drink Preview & Brew Button */}
        <div className="brew-action-card">
          <div className="brew-info-box">
            <div className="brew-info-header">
              <div className="large-drink-icon-wrap">
                {renderDrinkIcon(selectedDrink.iconType, 22)}
              </div>
              <div>
                <h4 className="brew-drink-title">{selectedDrink.name}</h4>
                <p className="brew-drink-desc">{selectedDrink.desc}</p>
              </div>
            </div>
            <div className="brew-benefit-tip">
              <Info size={14} />
              <span>{selectedDrink.benefit}</span>
            </div>
          </div>

          {!servedDrink ? (
            <button 
              className={`brew-cup-btn ${isBrewing ? 'brewing' : ''}`}
              onClick={handleBrew}
              disabled={isBrewing}
            >
              {isBrewing ? (
                <span>Brewing warm cup...</span>
              ) : (
                <>
                  <Coffee size={16} />
                  <span>Brew This Warm Cup</span>
                </>
              )}
            </button>
          ) : (
            <div className="served-drink-container animate-pop">
              <div className="steaming-cup-display">
                <div className="clean-steam-rings">
                  <span className="steam-wave wave-1" />
                  <span className="steam-wave wave-2" />
                </div>
                <div className="served-cup-icon">
                  <Coffee size={38} color="#ff4d6d" />
                </div>
              </div>
              <h3 className="served-title">Fresh &amp; Steaming Warm</h3>
              <p className="served-msg">
                Hold the warm cup, take a gentle breath, and enjoy the soothing warmth.
              </p>

              <div className="cafe-served-actions">
                <button className="ask-real-drink-btn" onClick={handleTakeSip}>
                  <Sparkles size={14} />
                  <span>{sipped ? 'Warmth Absorbed' : 'Take a Cozy Virtual Sip'}</span>
                </button>
                <button 
                  className="rebrew-btn" 
                  onClick={() => { playPop(500); setServedDrink(null); }}
                >
                  Brew Another Drink
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Gentle Comfort Habits */}
      <section className="comfort-card rituals-card">
        <h3 className="card-title">Three Simple Comfort Habits</h3>
        <p className="card-subtitle">Small physical cues that promote natural relaxation:</p>

        <div className="rituals-list">
          <div className="ritual-item">
            <div className="ritual-icon-wrap">
              <Coffee size={16} />
            </div>
            <div>
              <strong>Hold warmth in both hands</strong>
              <p>Warmth on your palms naturally prompts your parasympathetic nervous system to relax.</p>
            </div>
          </div>

          <div className="ritual-item">
            <div className="ritual-icon-wrap">
              <Flame size={16} />
            </div>
            <div>
              <strong>Softer lighting</strong>
              <p>Dimming harsh overhead lights reduces sensory strain and helps with hormonal headaches.</p>
            </div>
          </div>

          <div className="ritual-item">
            <div className="ritual-icon-wrap">
              <CloudRain size={16} />
            </div>
            <div>
              <strong>Gentle rain sound</strong>
              <p>Tap the rain toggle at the top header for quiet background rain sounds.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
