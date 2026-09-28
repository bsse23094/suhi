import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Ticket, Check, RotateCcw, Moon, BellOff, Cookie, Tv, CalendarOff, Sparkles } from 'lucide-react';
import { COUPONS } from '../data/comfortData';
import { playPop, playChime, playWarmHug } from '../utils/audio';

export default function CouponsTab({ name }) {
  const [redeemedCoupons, setRedeemedCoupons] = useState({});

  const handleRedeem = (coupon) => {
    playChime();
    setRedeemedCoupons((prev) => ({
      ...prev,
      [coupon.id]: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    }));

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ffd166', '#06d6a0']
    });
  };

  const handleUnclaim = (couponId) => {
    playPop(520);
    setRedeemedCoupons((prev) => {
      const copy = { ...prev };
      delete copy[couponId];
      return copy;
    });
  };

  const resetAll = () => {
    playPop(500);
    setRedeemedCoupons({});
  };

  const renderCouponIcon = (iconType, size = 18) => {
    switch (iconType) {
      case 'moon': return <Moon size={size} />;
      case 'bellOff': return <BellOff size={size} />;
      case 'cookie': return <Cookie size={size} />;
      case 'tv': return <Tv size={size} />;
      case 'calendarOff': return <CalendarOff size={size} />;
      default: return <Sparkles size={size} />;
    }
  };

  const redeemedCount = Object.keys(redeemedCoupons).length;

  return (
    <div className="tab-container animate-pop">
      <section className="comfort-card coupon-intro-card">
        <div className="card-badge-row">
          <span className="soft-pill coupon-pill">
            <Ticket size={13} /> Rest Passes
          </span>
          <span className="redeemed-count-tag">
            {redeemedCount}/{COUPONS.length} Used
          </span>
        </div>

        <h2 className="card-title">Self-Care Hall Passes</h2>
        <p className="card-subtitle">
          Personal reminder passes to take all the rest you need today without any guilt.
        </p>

        {redeemedCount > 0 && (
          <button className="reset-coupons-btn" onClick={resetAll}>
            <RotateCcw size={12} /> Reset Passes
          </button>
        )}
      </section>

      {/* Coupons List */}
      <div className="coupons-grid">
        {COUPONS.map((coupon) => {
          const isRedeemed = !!redeemedCoupons[coupon.id];
          const redeemedDate = redeemedCoupons[coupon.id];

          return (
            <div 
              key={coupon.id} 
              className={`coupon-ticket ${isRedeemed ? 'ticket-redeemed' : ''}`}
            >
              <div className="ticket-notch notch-left" />
              <div className="ticket-notch notch-right" />

              <div className="ticket-content">
                <div className="ticket-header-row">
                  <div className="ticket-icon-box">
                    {renderCouponIcon(coupon.iconType, 18)}
                  </div>
                  <span className="ticket-code">{coupon.code}</span>
                </div>

                <h3 className="ticket-title">{coupon.title}</h3>
                <p className="ticket-desc">{coupon.desc}</p>

                {isRedeemed ? (
                  <div className="redeemed-status-box animate-pop">
                    <div className="stamp-badge">
                      <Check size={11} className="stamp-check-icon" />
                      <span>APPROVED</span>
                      <small>{redeemedDate}</small>
                    </div>

                    <div className="claimed-note-row">
                      <span className="claimed-msg">Active for today</span>
                      <button 
                        className="unclaim-btn"
                        onClick={() => handleUnclaim(coupon.id)}
                        title="Reset pass"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    className="redeem-action-btn"
                    onClick={() => handleRedeem(coupon)}
                  >
                    <span>Claim Pass</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
