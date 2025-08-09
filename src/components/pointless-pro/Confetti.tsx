'use client';

import React from 'react';
import './confetti.css';

const CONFETTI_COUNT = 150;

export function Confetti() {
  const confetti = Array.from({ length: CONFETTI_COUNT }).map((_, i) => ({
    id: i,
    style: {
      '--x-start': `${Math.random() * 100}%`,
      '--x-end': `${Math.random() * 100}%`,
      '--y-end': `${Math.random() * 300 + 700}px`,
      '--bg': `hsl(${Math.random() * 360}, 100%, 50%)`,
      '--duration': `${Math.random() * 2 + 3}s`,
      '--delay': `${Math.random() * -3}s`,
      '--rotation-start': `${Math.random() * 360}deg`,
      '--rotation-end': `${Math.random() * 1440 + 720}deg`,
    } as React.CSSProperties
  }));

  return (
    <div className="confetti-container" aria-hidden="true">
      {confetti.map(c => <div key={c.id} className="confetti" style={c.style}></div>)}
    </div>
  );
}
