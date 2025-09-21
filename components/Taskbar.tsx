import React, { type FC, type Dispatch, type SetStateAction } from 'react';
import { type WindowState, type View, type Language, type Translations } from '../types';
import { CodeIcon, MessageSquareIcon, GlobeIcon, GithubIcon, NexusIcon } from '../constants';
import { audioService } from '../services/audioService';

interface TaskbarProps {
  openWindows: WindowState[];
  openWindow: (view: View) => void;
  focusWindow: (id: number) => void;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  t: Translations;
}

const appConfig: { view: View; icon: FC<any> }[] = [
  { view: 'dashboard', icon: NexusIcon },
  { view: 'builder', icon: CodeIcon },
  { view: 'chat', icon: MessageSquareIcon },
];

const Taskbar: FC<TaskbarProps> = ({ openWindows, openWindow, focusWindow, language, setLanguage, t }) => {
    const toggleLanguage = () => {
        audioService.playSound('click');
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    const handleAppClick = (view: View) => {
        const existingWindow = openWindows.find(w => w.view === view);
        if (existingWindow) {
            focusWindow(existingWindow.id);
        } else {
            openWindow(view);
        }
    }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 glass-panel border-t border-[var(--color-primary)]/30 z-50 flex items-center justify-between px-6">
      {/* القسم الأيسر - الشعار والتطبيقات */}
      <div className="flex items-center gap-4">
        {/* زر البداية المحسن */}
        <div className="relative group">
          <button className="
            w-12 h-12 rounded-xl
            bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]
            flex items-center justify-center
            shadow-neon transition-all duration-300
            hover:scale-110 hover:rotate-12
          ">
            <h1 className="font-orbitron text-xl font-black text-[var(--color-text-inverse)]">
              Z
            </h1>
          </button>
          <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-[var(--color-surface)] text-xs px-2 py-1 rounded whitespace-nowrap">
              Start Menu
            </div>
          </div>
        </div>

        {/* فاصل */}
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-[var(--color-primary)]/30 to-transparent" />

        {/* التطبيقات */}
        <div className="flex items-center gap-2">
          {appConfig.map(({ view, icon: Icon }) => {
            const isOpen = openWindows.some(w => w.view === view);
            return (
              <div key={view} className="relative group">
                <button 
                  onClick={() => handleAppClick(view)} 
                  className={`
                    relative w-12 h-12 flex items-center justify-center rounded-xl
                    transition-all duration-300 transform
                    ${isOpen 
                      ? 'bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 scale-105' 
                      : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:scale-110'
                    }
                  `}
                >
                  <Icon className={`
                    w-6 h-6 transition-all duration-300
                    ${isOpen 
                      ? 'text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary)]' 
                      : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)]'
                    }
                  `} />
                  
                  {/* مؤشر التطبيق المفتوح */}
                  {isOpen && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full animate-pulse" />
                    </div>
                  )}
                </button>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-[var(--color-surface)] text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                    {t.window[`${view}_title`]}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* القسم الأوسط - معلومات النظام */}
      <div className="hidden md:flex items-center gap-6 text-sm text-[var(--color-text-secondary)]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
          <span className="font-mono">System Online</span>
        </div>
        <div className="font-mono">
          {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* القسم الأيمن - الإعدادات والروابط */}
      <div className="flex items-center gap-3">
        {/* زر تبديل اللغة */}
        <button 
          onClick={toggleLanguage} 
          className="
            w-10 h-10 rounded-lg
            bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]
            flex items-center justify-center
            transition-all duration-300 group
          "
        >
          <GlobeIcon className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors" />
        </button>
        
        {/* رابط GitHub */}
        <a 
          href="https://github.com/c4c7/zero-hub" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="
            w-10 h-10 rounded-lg
            bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]
            flex items-center justify-center
            transition-all duration-300 group
          "
        >
          <GithubIcon className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors" />
        </a>

        {/* زر الإشعارات */}
        <div className="relative">
          <button className="
            w-10 h-10 rounded-lg
            bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]
            flex items-center justify-center
            transition-all duration-300 group
          ">
            <svg className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <div className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-danger)] rounded-full animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;