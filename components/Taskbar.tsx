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
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/30 backdrop-blur-lg border-t border-[var(--color-primary)]/20 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
         <h1 className="font-orbitron text-xl font-bold text-[var(--color-secondary)] flicker-slow pe-2 me-2 border-e border-slate-700">
          ZERO
        </h1>
        {appConfig.map(({ view, icon: Icon }) => {
            const isOpen = openWindows.some(w => w.view === view);
            return (
                <button 
                    key={view} 
                    onClick={() => handleAppClick(view)} 
                    className={`relative w-9 h-9 flex items-center justify-center rounded-md transition-colors ${isOpen ? 'bg-[var(--color-primary)]/20' : 'hover:bg-white/10'}`}
                >
                    <Icon className={`w-5 h-5 ${isOpen ? 'text-[var(--color-primary)]' : 'text-slate-300'}`} />
                    {isOpen && <div className="absolute bottom-0 h-1 w-4 bg-[var(--color-primary)] rounded-full"></div>}
                </button>
            )
        })}
      </div>
      <div className="flex items-center gap-4">
        <button onClick={toggleLanguage} className="text-slate-400 hover:text-[var(--color-secondary)] transition-colors">
            <GlobeIcon className="w-6 h-6" />
        </button>
         <a href="https://github.com/c4c7/zero-hub" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[var(--color-secondary)] transition-colors">
            <GithubIcon className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default Taskbar;