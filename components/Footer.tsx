'use client';

import { useState, useEffect } from 'react';

const Footer = () => {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer
      className="relative bg-slate-600 text-white min-h-12 w-full overflow-hidden flex items-center justify-center"
      style={
        {
          '--glow-color': `hsl(${hue}, 100%, 60%)`,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 blur-md opacity-50"
        style={{
          background: `radial-gradient(circle, var(--glow-color) 0%, transparent 70%)`,
        }}
      />
      <p
        className="animate-marquee whitespace-nowrap py-2 text-lg font-bold tracking-wider"
        style={{
          textShadow:
            '0 0 5px var(--glow-color), 0 0 10px var(--glow-color), 0 0 15px var(--glow-color)',
        }}
      >
        {`©KKN UIN SUNAN GUNUNG DJATI ${year} `}
        <span role="img" aria-label="love" className="animate-pulse">
          ❤️
        </span>
        {` Made with love and passion `}
        <span role="img" aria-label="love" className="animate-pulse">
          ❤️
        </span>
        {` ©KKN UIN SUNAN GUNUNG DJATI ${year} `}
        <span role="img" aria-label="love" className="animate-pulse">
          ❤️
        </span>
        {` Made with love and passion `}
        <span role="img" aria-label="love" className="animate-pulse">
          ❤️
        </span>
      </p>
    </footer>
  );
};

export default Footer;
