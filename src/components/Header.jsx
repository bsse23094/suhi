import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Edit2, Check, CloudRain } from 'lucide-react';
import { playPop, setSoundMuted, getSoundMuted, toggleAmbientNoise } from '../utils/audio';

export default function Header({ name, setName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [muted, setMuted] = useState(getSoundMuted());
  const [ambientActive, setAmbientActive] = useState(false);

  const toggleSound = () => {
    playPop(600);
    const nextState = !muted;
    setSoundMuted(nextState);
    setMuted(nextState);
  };

  const handleToggleAmbient = () => {
    playPop(520);
    const nextState = !ambientActive;
    toggleAmbientNoise(nextState);
    setAmbientActive(nextState);
  };

  const saveName = () => {
    if (tempName.trim()) {
      setName(tempName.trim());
    }
    setIsEditing(false);
    playPop(650);
  };

  return (
    <header className="app-header">
      <div className="header-status-badge">
        <Sparkles size={12} className="sparkle-icon" />
        <span className="badge-text">Comfort &amp; Rest Sanctuary</span>
      </div>

      <div className="header-main-row">
        <div className="header-name-box">
          {isEditing ? (
            <div className="name-edit-form">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                maxLength={20}
                autoFocus
                className="name-input"
                placeholder="Name..."
                onKeyDown={(e) => e.key === 'Enter' && saveName()}
              />
              <button onClick={saveName} className="save-name-btn" title="Save">
                <Check size={14} />
              </button>
            </div>
          ) : (
            <div className="name-display" onClick={() => setIsEditing(true)}>
              <h1 className="header-title">
                For {name} <Heart className="inline-heart animate-heartbeat" size={17} fill="#ff4d6d" color="#ff4d6d" />
              </h1>
              <button className="edit-icon-btn" title="Edit nickname">
                <Edit2 size={12} />
              </button>
            </div>
          )}
          <p className="header-sub">Gentle warmth for a restful day</p>
        </div>

        <div className="header-actions">
          <button 
            className={`action-btn ${ambientActive ? 'active-ambient' : ''}`}
            onClick={handleToggleAmbient}
            title={ambientActive ? "Turn off rain sound" : "Play soothing rain sound"}
          >
            <CloudRain size={16} />
            <span className="btn-label">{ambientActive ? "Rain On" : "Rain"}</span>
          </button>

          <button 
            className="action-btn icon-only-btn"
            onClick={toggleSound}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
