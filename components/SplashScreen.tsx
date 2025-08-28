import React, { useState, useEffect, type FC } from 'react';

interface SplashScreenProps {
  onStart: () => void;
}

const SplashScreen: FC<SplashScreenProps> = ({ onStart }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-[#0B1020] flex flex-col items-center justify-center transition-opacity duration-1000">
      <div className={`transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
        <div className="text-center">
          <h1 className="font-orbitron text-8xl font-bold text-[var(--color-secondary)] mb-8 animate-pulse" style={{ textShadow: '0 0 15px var(--color-primary)' }}>
            ZERO
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={onStart}
              className="px-8 py-3 bg-[var(--color-primary)] text-black font-bold rounded-md hover:bg-[var(--color-secondary)] transition-all duration-300 shadow-[0_0_20px_var(--color-primary)]"
            >
              START
            </button>
            <a
              href="https://t.me/c4ccz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] font-bold rounded-md hover:bg-[var(--color-secondary)] hover:text-black transition-all duration-300"
            >
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
