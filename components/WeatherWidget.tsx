import React, { useState, useEffect, type FC } from 'react';

interface WeatherData {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';
  humidity: number;
  windSpeed: number;
  location: string;
}

const WeatherWidget: FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 22,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
    location: 'Cyber City'
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // محاكاة تحديث الطقس
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWeather(prev => ({
          ...prev,
          temp: prev.temp + (Math.random() - 0.5) * 2,
          humidity: Math.min(100, Math.max(0, prev.humidity + (Math.random() - 0.5) * 5)),
          windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 3)
        }));
        setIsAnimating(false);
      }, 300);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return (
          <div className="relative">
            <svg className="w-24 h-24 text-yellow-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 12.728l-1.414-1.414M7.05 16.95l-1.414 1.414M12 7a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
            <div className="absolute inset-0 blur-xl opacity-50">
              <svg className="w-24 h-24 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            </div>
          </div>
        );
      case 'cloudy':
        return (
          <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.343 9.344a4 4 0 116.32 4.88A5 5 0 1010 19H6a4 4 0 01-.657-7.656z" />
          </svg>
        );
      case 'rainy':
        return (
          <div className="relative">
            <svg className="w-24 h-24 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.343 9.344a4 4 0 116.32 4.88A5 5 0 1010 19H6a4 4 0 01-.657-7.656z" />
            </svg>
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-2">
                <div className="w-1 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-1 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getBackgroundGradient = () => {
    switch (weather.condition) {
      case 'sunny':
        return 'from-yellow-400/20 to-orange-400/20';
      case 'cloudy':
        return 'from-gray-400/20 to-gray-600/20';
      case 'rainy':
        return 'from-blue-400/20 to-blue-600/20';
      case 'stormy':
        return 'from-purple-400/20 to-purple-600/20';
      case 'snowy':
        return 'from-cyan-400/20 to-cyan-600/20';
    }
  };

  return (
    <div className={`glass-panel p-6 rounded-2xl bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      {/* الموقع */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-orbitron gradient-text">{weather.location}</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">Weather Station</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
          <span className="text-xs text-[var(--color-text-tertiary)]">Live</span>
        </div>
      </div>

      {/* أيقونة الطقس ودرجة الحرارة */}
      <div className="flex items-center justify-between mb-6">
        <div className={`transition-all duration-300 ${isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
          {getWeatherIcon()}
        </div>
        
        <div className="text-right">
          <div className="text-5xl font-bold gradient-text">
            {Math.round(weather.temp)}°
          </div>
          <div className="text-sm text-[var(--color-text-secondary)] capitalize">
            {weather.condition}
          </div>
        </div>
      </div>

      {/* تفاصيل الطقس */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[var(--color-surface)]/50">
            <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--color-text)]">{weather.humidity}%</div>
            <div className="text-xs text-[var(--color-text-tertiary)]">Humidity</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[var(--color-surface)]/50">
            <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--color-text)]">{weather.windSpeed} km/h</div>
            <div className="text-xs text-[var(--color-text-tertiary)]">Wind</div>
          </div>
        </div>
      </div>

      {/* التوقعات */}
      <div className="mt-6 pt-4 border-t border-[var(--color-primary)]/20">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-xs text-[var(--color-text-tertiary)] mb-1">Mon</div>
            <svg className="w-6 h-6 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
            <div className="text-sm font-semibold mt-1">24°</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[var(--color-text-tertiary)] mb-1">Tue</div>
            <svg className="w-6 h-6 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.343 9.344a4 4 0 116.32 4.88A5 5 0 1010 19H6a4 4 0 01-.657-7.656z" />
            </svg>
            <div className="text-sm font-semibold mt-1">20°</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[var(--color-text-tertiary)] mb-1">Wed</div>
            <svg className="w-6 h-6 text-blue-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.343 9.344a4 4 0 116.32 4.88A5 5 0 1010 19H6a4 4 0 01-.657-7.656z" />
            </svg>
            <div className="text-sm font-semibold mt-1">18°</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[var(--color-text-tertiary)] mb-1">Thu</div>
            <svg className="w-6 h-6 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
            <div className="text-sm font-semibold mt-1">25°</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;