import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Flame, CheckCircle2, Circle, Sparkles, Info, Cookie, Utensils, Heart, Crown } from 'lucide-react';
import { CHECKLIST_ITEMS, CRAVINGS } from '../data/comfortData';
import { playPop, playChime, playWarmHug } from '../utils/audio';

export default function WarmthTab({ name }) {
  const [heatLevel, setHeatLevel] = useState(2); // 0, 1, 2, 3
  const [checkedItems, setCheckedItems] = useState({
    water: true,
    socks: true,
    heat: true,
  });
  const [selectedCraving, setSelectedCraving] = useState(null);
  const [enjoyedTreat, setEnjoyedTreat] = useState(false);

  const heatSettings = [
    { level: 0, temp: 'Cool', label: 'Off', desc: 'Resting.' },
    { level: 1, temp: '38°C', label: 'Gentle', desc: 'Mild soothing warmth.' },
    { level: 2, temp: '42°C', label: 'Cozy', desc: 'Ideal comforting temperature for cramp relief.' },
    { level: 3, temp: '46°C', label: 'Toasty', desc: 'Deep heating relaxation for abdominal tension.' },
  ];

  const handleHeatChange = (level) => {
    playWarmHug();
    setHeatLevel(level);
  };

  const toggleCheck = (id) => {
    playPop(580);
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);

    const totalChecked = Object.values(updated).filter(Boolean).length;
    if (totalChecked === CHECKLIST_ITEMS.length) {
      playChime();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd166']
      });
    }
  };

  const handleSelectCraving = (craving) => {
    playPop(620);
    setSelectedCraving(craving);
    setEnjoyedTreat(false);
  };

  const handleEnjoyTreat = () => {
    playChime();
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.65 },
      colors: ['#ff85a1', '#ffd166', '#a2d2ff']
    });
    setEnjoyedTreat(true);
    setTimeout(() => setEnjoyedTreat(false), 3000);
  };

  const renderCravingIcon = (iconType, size = 20) => {
    switch (iconType) {
      case 'cookie': return <Cookie size={size} />;
      case 'utensils': return <Utensils size={size} />;
      case 'sparkles': return <Sparkles size={size} />;
      default: return <Heart size={size} />;
    }
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const isAllComplete = completedCount === CHECKLIST_ITEMS.length;

  return (
    <div className="tab-container animate-pop">
      {/* Heating Pad Section */}
      <section className="comfort-card heating-pad-card">
        <div className="card-badge-row">
          <span className="soft-pill warm-pill">
            <Flame size={13} className="flame-icon" /> Heating Pouch
          </span>
          <span className="temp-tag">{heatSettings[heatLevel].temp}</span>
        </div>

        <div className="mascot-display-wrapper">
          <div className={`mascot-glow-ring heat-glow-${heatLevel}`}>
            <img 
              src="./assets/cuddle_bear.jpg" 
              alt="Comfort Bear with warm bottle" 
              className="mascot-image"
            />
          </div>

          <div className="mascot-speech-bubble">
            <p className="bubble-text">
              {heatLevel === 0 && `Select a warmth setting below for your lower belly.`}
              {heatLevel === 1 && `Gentle warmth active. Relax and breathe softly, ${name}.`}
              {heatLevel === 2 && `Cozy 42°C heat pouch ready. Keep this right where it aches.`}
              {heatLevel === 3 && `Deep heat active to relax tension and soothe cramping.`}
            </p>
          </div>
        </div>

        {/* Heat level controls */}
        <div className="heat-control-container">
          <div className="heat-buttons-row">
            {heatSettings.map((item) => (
              <button
                key={item.level}
                onClick={() => handleHeatChange(item.level)}
                className={`heat-btn ${heatLevel === item.level ? 'active' : ''} heat-btn-${item.level}`}
              >
                <Flame size={14} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <p className="heat-desc">{heatSettings[heatLevel].desc}</p>
        </div>
      </section>

      {/* Routine Checklist */}
      <section className="comfort-card checklist-card">
        <div className="card-header-simple">
          <div>
            <h2 className="card-title">Rest Routine</h2>
            <p className="card-subtitle">Gentle steps to help you feel comfortable.</p>
          </div>
          <div className="progress-counter">
            {completedCount}/{CHECKLIST_ITEMS.length}
          </div>
        </div>

        <div className="checklist-progress-bar">
          <div 
            className="checklist-progress-fill" 
            style={{ width: `${(completedCount / CHECKLIST_ITEMS.length) * 100}%` }}
          />
        </div>

        {isAllComplete && (
          <div className="all-complete-banner animate-pop">
            <Crown size={16} />
            <span>You completed all routine steps. Rest up peacefully.</span>
          </div>
        )}

        <div className="checklist-items-list">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div 
                key={item.id} 
                className={`check-item ${isChecked ? 'checked' : ''}`}
                onClick={() => toggleCheck(item.id)}
              >
                <div className="check-icon">
                  {isChecked ? (
                    <CheckCircle2 size={20} className="checked-circle" />
                  ) : (
                    <Circle size={20} className="empty-circle" />
                  )}
                </div>
                <div className="check-text-col">
                  <span className="check-label">{item.text}</span>
                  <span className="check-tip">{item.tip}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comfort Snacks */}
      <section className="comfort-card cravings-card">
        <div className="card-header-simple">
          <div>
            <h2 className="card-title">Comfort Treats</h2>
            <p className="card-subtitle">Nourishing staples that support your body.</p>
          </div>
        </div>

        <div className="cravings-grid">
          {CRAVINGS.map((craving) => (
            <button
              key={craving.id}
              className={`craving-item-btn ${selectedCraving?.id === craving.id ? 'selected' : ''}`}
              onClick={() => handleSelectCraving(craving)}
            >
              <div className="craving-icon-wrap">
                {renderCravingIcon(craving.iconType, 22)}
              </div>
              <span className="craving-name">{craving.name}</span>
            </button>
          ))}
        </div>

        {selectedCraving && (
          <div className="craving-detail-modal animate-pop">
            <div className="craving-modal-header">
              <div className="detail-icon-circle">
                {renderCravingIcon(selectedCraving.iconType, 20)}
              </div>
              <div>
                <h4 className="detail-title">{selectedCraving.name}</h4>
                <p className="detail-desc">{selectedCraving.desc}</p>
              </div>
            </div>
            
            <div className="craving-tip-box">
              <Info size={14} />
              <span>{selectedCraving.tip}</span>
            </div>

            <button 
              className="order-from-him-btn"
              onClick={handleEnjoyTreat}
            >
              <Sparkles size={15} />
              <span>{enjoyedTreat ? 'Virtual Treat Enjoyed' : `Enjoy Virtual ${selectedCraving.name}`}</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
