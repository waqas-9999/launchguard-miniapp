import React, { useMemo } from 'react';
import './CoinBurst.css';

// Enhanced coin burst effect with more coins and better spread
export default function CoinBurst({ count = 18 }) {
  const coins = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight * 0.35 + Math.random() * 80; // Centered higher
      const dx = (Math.random() - 0.5) * 200; // Wider spread
      const dy = -100 - Math.random() * 120; // Higher arc
      const delay = Math.random() * 150; // More stagger
      arr.push({ id: i, x, y, dx, dy, delay });
    }
    return arr;
  }, [count]);

  return (
    <div className="coin-burst">
      {coins.map(c => (
        <div
          key={c.id}
          className="coin"
          style={{
            left: 0,
            top: 0,
            '--x': `${c.x}px`,
            '--y': `${c.y}px`,
            '--dx': `${c.dx}px`,
            '--dy': `${c.dy}px`,
            animationDelay: `${c.delay}ms`
          }}
        />
      ))}
    </div>
  );
}
