import React from 'react';
import { Flame, Heart, Coffee, Ticket, Sparkles } from 'lucide-react';
import { playPop } from '../utils/audio';

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'warmth', label: 'Comfort', icon: Flame },
    { id: 'love', label: 'Reminders', icon: Heart },
    { id: 'cafe', label: 'Warm Drinks', icon: Coffee },
    { id: 'coupons', label: 'Passes', icon: Ticket },
    { id: 'distract', label: 'Distract', icon: Sparkles },
  ];

  const handleTabClick = (tabId) => {
    playPop(620);
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="mobile-nav-bar" aria-label="Bottom Navigation">
      <div className="nav-items-container">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className={`nav-tab-button ${isActive ? 'nav-active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
              aria-selected={isActive}
            >
              <div className="nav-icon-wrapper">
                <Icon size={19} className="nav-icon" />
              </div>
              <span className="nav-label">{tab.label}</span>
              {isActive && <div className="active-dot" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
