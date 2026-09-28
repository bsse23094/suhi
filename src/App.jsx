import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import WarmthTab from './components/WarmthTab';
import LoveShowerTab from './components/LoveShowerTab';
import CozyCafeTab from './components/CozyCafeTab';
import CouponsTab from './components/CouponsTab';
import DistractTab from './components/DistractTab';
import './App.css';

export default function App() {
  const [name, setName] = useState(() => {
    return localStorage.getItem('cozy_girl_name') || 'Suhi';
  });

  const [activeTab, setActiveTab] = useState('warmth');

  useEffect(() => {
    localStorage.setItem('cozy_girl_name', name);
  }, [name]);

  return (
    <div className="app-root-shell">
      {/* Ambient background floating elements */}
      <div className="ambient-background">
        <span className="floating-blob blob-1" />
        <span className="floating-blob blob-2" />
        <span className="floating-blob blob-3" />
      </div>

      {/* Main Mobile App Frame */}
      <div className="mobile-app-wrapper">
        <Header name={name} setName={setName} />

        <main className="tab-viewport">
          {activeTab === 'warmth' && <WarmthTab name={name} />}
          {activeTab === 'love' && <LoveShowerTab name={name} />}
          {activeTab === 'cafe' && <CozyCafeTab name={name} />}
          {activeTab === 'coupons' && <CouponsTab name={name} />}
          {activeTab === 'distract' && <DistractTab name={name} />}
        </main>

        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
