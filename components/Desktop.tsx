import React, { type FC, Suspense, lazy, useState } from 'react';
import { type WindowState, type View, type Translations, type Simulation } from '../types';
import { CodeIcon, MessageSquareIcon, NexusIcon } from '../constants';
import InteractiveBackground from './InteractiveBackground';
import ContextMenu from './ContextMenu';

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
  <button 
    onDoubleClick={onDoubleClick} 
    className="
      group flex flex-col items-center gap-3 
      text-white p-4 rounded-xl 
      w-28 h-28 justify-center text-center
      transition-all duration-300
      hover:bg-[var(--color-surface)]/30
      hover:backdrop-blur-md
      hover:scale-105
      active:scale-95
    "
  >
    <div className="
      p-3 rounded-xl 
      bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20
      group-hover:from-[var(--color-primary)]/30 group-hover:to-[var(--color-accent)]/30
      transition-all duration-300
      group-hover:shadow-neon
    ">
      <div className="text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
        {icon}
      </div>
    </div>
    <span className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
      {label}
    </span>
  </button>
);

const Desktop: FC<DesktopProps> = ({ windows, openWindow, closeWindow, focusWindow, onLaunchSimulation, onAskNexus, t }) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  
  const desktopApps = [
    { view: 'dashboard' as View, label: t.desktop.dashboard_label, icon: <NexusIcon className="w-10 h-10" /> },
    { view: 'builder' as View, label: t.desktop.builder_label, icon: <CodeIcon className="w-10 h-10" /> },
    { view: 'chat' as View, label: t.desktop.chat_label, icon: <MessageSquareIcon className="w-10 h-10" /> },
  ];

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const contextMenuItems = [
    {
      label: 'New Window',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      action: () => openWindow('dashboard')
    },
    {
      label: 'Refresh',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      action: () => window.location.reload()
    },
    { divider: true },
    {
      label: 'Terminal',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      action: () => onLaunchSimulation('terminal')
    },
    {
      label: 'AI Assistant',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      action: () => onAskNexus('Hello!')
    },
    { divider: true },
    {
      label: 'System Info',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      action: () => console.log('System Info')
    }
  ];

  return (
    <div className="absolute inset-0 h-full w-full" onContextMenu={handleContextMenu}>
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

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default Desktop;