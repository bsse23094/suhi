import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Mail, ShieldCheck, RefreshCw, X, Check } from 'lucide-react';
import { AFFIRMATIONS, LETTERS } from '../data/comfortData';
import { playPop, playChime, playWarmHug } from '../utils/audio';

export default function LoveShowerTab({ name }) {
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const [hugCount, setHugCount] = useState(1);
  const [isSquished, setIsSquished] = useState(false);
  const [openedLetter, setOpenedLetter] = useState(null);

  const triggerSquish = () => {
    setIsSquished(true);
    playChime();
    setHugCount(prev => prev + 1);

    const nextIdx = (currentAffirmationIndex + 1) % AFFIRMATIONS.length;
    setCurrentAffirmationIndex(nextIdx);

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.55 },
      colors: ['#ff4d6d', '#ff758f', '#ff85a1', '#fbb1bd']
    });

    setTimeout(() => {
      setIsSquished(false);
    }, 280);
  };

  const handleOpenLetter = (letter) => {
    playWarmHug();
    setOpenedLetter(letter);
  };

  const currentAffirmation = AFFIRMATIONS[currentAffirmationIndex];

  return (
    <div className="tab-container animate-pop">
      {/* Big Squishy Hug Button */}
      <section className="comfort-card squish-center-card">
        <div className="squish-header">
          <span className="soft-pill love-pill">
            <Heart size={13} fill="#ff4d6d" color="#ff4d6d" /> Comfort Generator
          </span>
          <span className="hug-counter-badge">
            {hugCount} Hugs Generated
          </span>
        </div>

        <p className="squish-instruction">
          Press the button whenever you need a reassuring reminder.
        </p>

        {/* Big tactile button */}
        <div className="squish-button-wrapper">
          <button
            className={`big-squishy-btn ${isSquished ? 'squished' : ''}`}
            onClick={triggerSquish}
            title="Press for comfort"
          >
            <div className="squish-btn-inner">
              <Heart size={34} fill="#ffffff" color="#ffffff" className="squish-icon" />
              <span className="squish-text">PRESS ME</span>
              <span className="squish-subtext">for warm thoughts</span>
            </div>
          </button>
        </div>

        {/* Affirmation Card */}
        <div className="affirmation-display-card animate-pop" key={currentAffirmation.id}>
          <div className="affirmation-tag-row">
            <span className="affirmation-tag">{currentAffirmation.tag}</span>
            <button 
              className="next-affirmation-icon-btn" 
              onClick={() => { playPop(600); triggerSquish(); }}
              title="Next thought"
            >
              <RefreshCw size={13} />
            </button>
          </div>
          <p className="affirmation-main-text">
            “{currentAffirmation.text.replace('sweetheart', name)}”
          </p>
          <p className="affirmation-sub-text">
            {currentAffirmation.sub}
          </p>
        </div>
      </section>

      {/* Letters */}
      <section className="comfort-card letters-section">
        <div className="card-header-simple">
          <div>
            <h2 className="card-title">Comfort Notes</h2>
            <p className="card-subtitle">Quiet notes to read when you need reassurance.</p>
          </div>
        </div>

        <div className="letters-grid">
          {LETTERS.map((letter) => (
            <div 
              key={letter.id} 
              className="letter-envelope-card"
              onClick={() => handleOpenLetter(letter)}
            >
              <div className="envelope-top-bar">
                <div className="letter-icon-pill">
                  <Mail size={16} />
                </div>
                <span className="wax-seal">
                  <Heart size={13} fill="#ff4d6d" color="#ff4d6d" />
                </span>
              </div>
              <h4 className="letter-card-title">{letter.title}</h4>
              <p className="letter-card-snippet">{letter.snippet}</p>
              <span className="tap-to-read">Read note →</span>
            </div>
          ))}
        </div>
      </section>

      {/* Letter Reading Modal */}
      {openedLetter && (
        <div className="modal-overlay animate-pop" onClick={() => setOpenedLetter(null)}>
          <div className="letter-modal-paper" onClick={(e) => e.stopPropagation()}>
            <button className="close-letter-btn" onClick={() => setOpenedLetter(null)}>
              <X size={18} />
            </button>

            <div className="letter-paper-header">
              <div className="paper-icon-wrapper">
                <Heart size={20} fill="#ff4d6d" color="#ff4d6d" />
              </div>
              <h3 className="paper-title">{openedLetter.title}</h3>
              <p className="paper-to">For {name}</p>
            </div>

            <div className="letter-paper-body">
              {openedLetter.body.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="letter-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="letter-paper-footer">
              <p className="handwritten-sign">Always in your corner,</p>
              <p className="handwritten-name">With warmth and care</p>
            </div>
          </div>
        </div>
      )}

      {/* Gentle Comfort Rules */}
      <section className="comfort-card pledge-card">
        <div className="card-header-simple">
          <div>
            <h3 className="card-title">Gentle Reminders</h3>
            <p className="card-subtitle">Zero pressure, pure support.</p>
          </div>
          <div className="shield-icon-badge">
            <ShieldCheck size={18} color="#ff4d6d" />
          </div>
        </div>
        
        <ul className="pledge-list">
          <li>
            <Check size={14} className="rule-check-icon" />
            <span>Zero guilt for resting, staying in bed, or canceling plans today.</span>
          </li>
          <li>
            <Check size={14} className="rule-check-icon" />
            <span>Whatever emotions or energy levels you have are completely respected.</span>
          </li>
          <li>
            <Check size={14} className="rule-check-icon" />
            <span>Resting is productive when your body is healing.</span>
          </li>
          <li>
            <Check size={14} className="rule-check-icon" />
            <span>You are doing great just getting through the day.</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
