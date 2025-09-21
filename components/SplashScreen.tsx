import React, { useState, useEffect, type FC } from 'react';

interface SplashScreenProps {
  onStart: () => void;
}

const SplashScreen: FC<SplashScreenProps> = ({ onStart }) => {
  const [showContent, setShowContent] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    
    // محاكاة شريط التحميل
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-[var(--color-bg)] flex flex-col items-center justify-center transition-opacity duration-1000 overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)]" />
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className={`relative z-10 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
        <div className="text-center">
          {/* الشعار المحسن */}
          <div className="relative mb-12">
            <h1 className="font-orbitron text-9xl font-black gradient-text mb-2 animate-pulse relative">
              ZERO
            </h1>
            <div className="absolute inset-0 blur-3xl opacity-50">
              <h1 className="font-orbitron text-9xl font-black text-[var(--color-primary)]">
                ZERO
              </h1>
            </div>
            <p className="font-mono text-xl text-[var(--color-text-secondary)] tracking-[0.3em] mt-4">
              ULTIMATE CYBER HUB
            </p>
          </div>

          {/* شريط التحميل */}
          <div className="w-80 mx-auto mb-8">
            <div className="h-1 bg-[var(--color-surface)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] transition-all duration-300 rounded-full"
                style={{ 
                  width: `${loadingProgress}%`,
                  boxShadow: '0 0 20px var(--color-primary)'
                }}
              />
            </div>
            <p className="text-sm text-[var(--color-text-tertiary)] mt-2 font-mono">
              Loading... {loadingProgress}%
            </p>
          </div>

          {/* الأزرار المحسنة */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <button
              onClick={onStart}
              className="btn btn-primary btn-lg group relative overflow-hidden"
              disabled={loadingProgress < 100}
              style={{
                opacity: loadingProgress < 100 ? 0.5 : 1,
                cursor: loadingProgress < 100 ? 'not-allowed' : 'pointer'
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                START SYSTEM
              </span>
            </button>
            
            <a
              href="https://t.me/c4ccz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                CONTACT US
              </span>
            </a>
          </div>

          {/* معلومات إضافية */}
          <div className="mt-12 flex gap-8 justify-center text-sm text-[var(--color-text-tertiary)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
              <span>Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--color-secondary)] rounded-full animate-pulse" />
              <span>Powerful</span>
            </div>
          </div>
        </div>
      </div>

      {/* تأثير الوهج السفلي */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-primary)] to-transparent opacity-10 blur-3xl" />
    </div>
  );
};

export default SplashScreen;
