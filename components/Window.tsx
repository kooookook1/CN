import React, { type FC, Suspense, lazy } from 'react';
// FIX: Replaced deprecated `dragHandle` with `useDragControls` for framer-motion v2+ compatibility.
import { motion, useDragControls } from 'framer-motion';
import { type View, type Translations, type Simulation } from '../types';

const AiSiteBuilder = lazy(() => import('/components/AiSiteBuilder.tsx'));
const Chat = lazy(() => import('/components/Chat.tsx'));
const Dashboard = lazy(() => import('/components/Dashboard.tsx'));
const Settings = lazy(() => import('/components/Settings.tsx'));

interface WindowProps {
  id: number;
  view: View;
  zIndex: number;
  onClose: (id: number) => void;
  onFocus: (id: number) => void;
  onLaunchSimulation: (simulation: Simulation) => void;
  onAskNexus: (prompt: string) => void;
  t: Translations;
}

const WindowContent: FC<{ 
  view: View, 
  t: Translations, 
  onLaunchSimulation: (simulation: Simulation) => void,
  onAskNexus: (prompt: string) => void 
}> = ({ view, t, onLaunchSimulation, onAskNexus }) => {
  switch (view) {
    case 'dashboard': return <Dashboard onLaunchSimulation={onLaunchSimulation} onAskNexus={onAskNexus} />;
    case 'builder': return <AiSiteBuilder t={t} />;
    case 'chat': return <Chat t={t} />;
    case 'settings': return <Settings />;
    default: return null;
  }
};

const Window: FC<WindowProps> = ({ id, view, zIndex, onClose, onFocus, t, onLaunchSimulation, onAskNexus }) => {
  const title = t.window[`${view}_title`] || 'Window';
  // FIX: Initialize drag controls to manage dragging from the header.
  const controls = useDragControls();

  const windowDimensions = {
    dashboard: { width: 'min(1200px, 90vw)', height: 'min(800px, 85vh)' },
    builder: { width: 'min(1000px, 80vw)', height: 'min(700px, 80vh)' },
    chat: { width: 'min(700px, 70vw)', height: 'min(600px, 75vh)' },
    tools: { width: 'min(900px, 80vw)', height: 'min(650px, 80vh)' }
  };

  const { width, height } = windowDimensions[view] || windowDimensions.chat;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragControls={controls}
      onMouseDown={() => onFocus(id)}
      style={{ 
        zIndex,
        width,
        height,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className="absolute top-1/4 left-1/4 glass-panel flex flex-col overflow-hidden"
      whileHover={{ boxShadow: '0 0 40px rgba(0, 217, 255, 0.3)' }}
    >
      {/* Window Header - محسن */}
      <header 
        onPointerDown={(e) => controls.start(e)} 
        className="
          p-3 flex justify-between items-center cursor-move 
          bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-surface-hover)]
          border-b border-[var(--color-primary)]/20
          h-12 flex-shrink-0
        "
      >
        <div className="flex items-center gap-3">
          {/* Window Icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-1.5 shadow-neon">
            {view === 'dashboard' && (
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
            )}
            {view === 'builder' && (
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
              </svg>
            )}
            {view === 'chat' && (
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
            )}
          </div>
          <h2 className="font-orbitron text-base font-semibold gradient-text select-none">
            {title}
          </h2>
        </div>
        
        {/* Window Controls */}
        <div className="flex items-center gap-2">
          <button 
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
            title="Minimize"
          />
          <button 
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
            title="Maximize"
          />
          <button 
            onClick={() => onClose(id)} 
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
            title="Close"
          />
        </div>
      </header>
      
      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-[var(--color-bg)]/50 custom-scrollbar">
        <div className="p-6">
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-rotate mb-4">
                <svg className="w-16 h-16 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              </div>
              <p className="text-[var(--color-text-secondary)] font-mono">Loading Application...</p>
            </div>
          }>
            <WindowContent 
              view={view} 
              t={t} 
              onLaunchSimulation={onLaunchSimulation}
              onAskNexus={onAskNexus}
            />
          </Suspense>
        </div>
      </div>
      
      {/* Window Resize Handle */}
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize">
        <svg className="w-full h-full text-[var(--color-primary)]/30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z"/>
        </svg>
      </div>
    </motion.div>
  );
};

export default Window;