import React, { useState, useEffect, type FC } from 'react';

const DigitalClock: FC = () => {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setShowColon(prev => !prev);
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(time);
  const dayName = time.toLocaleDateString('en-US', { weekday: 'long' });
  const date = time.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="glass-panel p-6 rounded-2xl">
      {/* الساعة الرقمية */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="relative">
          <div className="text-6xl font-mono font-bold gradient-text">
            {hours}
          </div>
          <div className="absolute inset-0 blur-xl opacity-50">
            <div className="text-6xl font-mono font-bold text-[var(--color-primary)]">
              {hours}
            </div>
          </div>
        </div>
        
        <div className={`text-6xl font-mono font-bold transition-opacity duration-300 ${showColon ? 'opacity-100' : 'opacity-20'}`}>
          <span className="gradient-text">:</span>
        </div>
        
        <div className="relative">
          <div className="text-6xl font-mono font-bold gradient-text">
            {minutes}
          </div>
          <div className="absolute inset-0 blur-xl opacity-50">
            <div className="text-6xl font-mono font-bold text-[var(--color-accent)]">
              {minutes}
            </div>
          </div>
        </div>
        
        <div className={`text-6xl font-mono font-bold transition-opacity duration-300 ${showColon ? 'opacity-100' : 'opacity-20'}`}>
          <span className="gradient-text">:</span>
        </div>
        
        <div className="relative">
          <div className="text-6xl font-mono font-bold gradient-text">
            {seconds}
          </div>
          <div className="absolute inset-0 blur-xl opacity-50">
            <div className="text-6xl font-mono font-bold text-[var(--color-secondary)]">
              {seconds}
            </div>
          </div>
        </div>
      </div>

      {/* التاريخ */}
      <div className="text-center">
        <div className="text-xl font-semibold text-[var(--color-text)] mb-1">
          {dayName}
        </div>
        <div className="text-sm text-[var(--color-text-secondary)]">
          {date}
        </div>
      </div>

      {/* مؤشرات الحالة */}
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
          <span className="text-xs text-[var(--color-text-tertiary)]">System Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
          <span className="text-xs text-[var(--color-text-tertiary)]">Connected</span>
        </div>
      </div>

      {/* خط التقدم */}
      <div className="mt-4">
        <div className="h-1 bg-[var(--color-surface)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] transition-all duration-1000"
            style={{ width: `${(time.getSeconds() / 60) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;