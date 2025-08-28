import React, { type FC, Suspense, lazy } from 'react';
import { type WindowState, type View, type Translations, type Simulation } from '../types';
import { CodeIcon, MessageSquareIcon, NexusIcon } from '../constants';
import InteractiveBackground from './InteractiveBackground';

const Window = lazy(() => import('/components/Window.tsx'));

interface DesktopProps {
  windows: WindowState[];
  openWindow: (view: View) => void;
  closeWindow: (id: number) => void;
  focusWindow: (id: number) => void;
  onLaunchSimulation: (simulation: Simulation) => void;
  onAskNexus: (prompt: string) => void;
  t: Translations;
}

const DesktopIcon: FC<{ label: string; icon: React.ReactNode; onDoubleClick: () => void }> = ({ label, icon, onDoubleClick }) => (
  <button onDoubleClick={onDoubleClick} className="flex flex-col items-center gap-2 text-white p-2 rounded-md hover:bg-white/10 w-24 h-24 justify-center text-center">
    <div className="text-[var(--color-primary)]">{icon}</div>
    <span className="text-sm">{label}</span>
  </button>
);

const Desktop: FC<DesktopProps> = ({ windows, openWindow, closeWindow, focusWindow, onLaunchSimulation, onAskNexus, t }) => {
  const desktopApps = [
    { view: 'dashboard' as View, label: t.desktop.dashboard_label, icon: <NexusIcon className="w-10 h-10" /> },
    { view: 'builder' as View, label: t.desktop.builder_label, icon: <CodeIcon className="w-10 h-10" /> },
    { view: 'chat' as View, label: t.desktop.chat_label, icon: <MessageSquareIcon className="w-10 h-10" /> },
  ];

  return (
    <div className="absolute inset-0 h-full w-full">
      <InteractiveBackground />
      <div className="absolute inset-0 z-10 p-4 flex flex-col items-start gap-4">
        {desktopApps.map(app => (
          <DesktopIcon 
            key={app.view} 
            label={app.label} 
            icon={app.icon} 
            onDoubleClick={() => openWindow(app.view)} 
          />
        ))}
      </div>
      
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            view={win.view}
            zIndex={win.zIndex}
            onClose={closeWindow}
            onFocus={focusWindow}
            onLaunchSimulation={onLaunchSimulation}
            onAskNexus={onAskNexus}
            t={t}
          />
        ))}
      </Suspense>
    </div>
  );
};

export default Desktop;