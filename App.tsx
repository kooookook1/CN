import React, { useState, useCallback, FC, useEffect } from 'react';
import { type View, type Language, type Theme, type WindowState, type Simulation } from './types';
import { translations } from './constants';
import SplashScreen from './components/SplashScreen';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import CommandPalette from './components/CommandPalette';
import NexusAiChat from './components/NexusAiChat';
import TerminalView from './components/TerminalView';
import AnimatedBackground from './components/AnimatedBackground';
import NotificationSystem, { type Notification } from './components/NotificationSystem';
import { audioService } from './services/audioService';

const App: FC = () => {
  const [splashVisible, setSplashVisible] = useState(true);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [nextId, setNextId] = useState(0);

  // New state for integrated components
  const [activeSimulation, setActiveSimulation] = useState<Simulation | null>(null);
  const [nexusChatOpen, setNexusChatOpen] = useState(false);
  const [nexusInitialPrompt, setNexusInitialPrompt] = useState<string | undefined>(undefined);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.className = theme;
  }, [language, theme]);
  
  useEffect(() => {
    audioService.loadSounds();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
        audioService.playSound('open');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const focusWindow = (id: number) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0);
      const windowToFocus = prev.find(w => w.id === id);
      if (windowToFocus && windowToFocus.zIndex > maxZ) return prev; // Already focused
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
    });
  };

  const openWindow = (view: View) => {
    const existingWindow = windows.find(w => w.view === view);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }
    
    audioService.playSound('open');
    const newWindow: WindowState = {
      id: nextId,
      view,
      zIndex: Math.max(...windows.map(w => w.zIndex), 0) + 1,
    };
    setNextId(prev => prev + 1);
    setWindows(prev => [...prev, newWindow]);
  };

  const closeWindow = (id: number) => {
    audioService.playSound('close');
    setWindows(prev => prev.filter(w => w.id !== id));
  };
  
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleStart = () => {
    audioService.playSound('start');
    setSplashVisible(false);
    openWindow('dashboard');
    // إضافة إشعار ترحيبي
    addNotification({
      title: 'Welcome to ZERO HUB',
      message: 'System initialized successfully. All modules are online.',
      type: 'success',
      duration: 6000
    });
  };

  const handleLaunchSimulation = (simulation: Simulation) => {
    audioService.playSound('open');
    setActiveSimulation(simulation);
  };

  const handleAskNexus = (prompt: string) => {
    audioService.playSound('open');
    setNexusInitialPrompt(prompt);
    setNexusChatOpen(true);
  };

  const handleCloseNexus = () => {
    audioService.playSound('close');
    setNexusChatOpen(false);
    setNexusInitialPrompt(undefined);
  };

  if (splashVisible) {
    return <SplashScreen onStart={handleStart} />;
  }

  return (
    <div className="h-screen w-screen bg-[var(--color-bg)] text-[var(--color-text)] relative overflow-hidden">
      <AnimatedBackground />
      <Desktop 
        windows={windows} 
        openWindow={openWindow}
        closeWindow={closeWindow}
        focusWindow={focusWindow}
        onLaunchSimulation={handleLaunchSimulation}
        onAskNexus={handleAskNexus}
        t={t} 
      />
      <Taskbar 
        openWindows={windows} 
        openWindow={openWindow} 
        focusWindow={focusWindow}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      <NotificationSystem 
        notifications={notifications}
        onRemove={removeNotification}
      />
      {commandPaletteOpen && (
        <CommandPalette 
          onClose={() => setCommandPaletteOpen(false)}
          openWindow={openWindow}
          t={t}
        />
      )}
      {nexusChatOpen && (
        <NexusAiChat 
          onClose={handleCloseNexus}
          initialPrompt={nexusInitialPrompt}
        />
      )}
      {activeSimulation && (
        <TerminalView 
          simulation={activeSimulation}
          onClose={() => {
            audioService.playSound('close');
            setActiveSimulation(null);
          }}
        />
      )}
    </div>
  );
};

export default App;