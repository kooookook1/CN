import React, { type FC, Suspense, lazy } from 'react';
// FIX: Replaced deprecated `dragHandle` with `useDragControls` for framer-motion v2+ compatibility.
import { motion, useDragControls } from 'framer-motion';
import { type View, type Translations, type Simulation } from '../types';

const AiSiteBuilder = lazy(() => import('/components/AiSiteBuilder.tsx'));
const Chat = lazy(() => import('/components/Chat.tsx'));
const Dashboard = lazy(() => import('/components/Dashboard.tsx'));

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
      // FIX: Replaced `dragHandle` with `dragControls` to fix the error.
      dragControls={controls}
      onMouseDown={() => onFocus(id)}
      style={{ 
        zIndex,
        width,
        height,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="absolute top-1/4 left-1/4 bg-[var(--color-surface)]/80 backdrop-blur-md border border-[var(--color-primary)]/30 rounded-lg shadow-2xl flex flex-col neon-border"
    >
      {/* FIX: Added `onPointerDown` to the header to initiate dragging via drag controls. */}
      <header onPointerDown={(e) => controls.start(e)} className="drag-handle p-2 border-b border-[var(--color-primary)]/30 flex justify-between items-center cursor-move text-[var(--color-secondary)] h-10 flex-shrink-0">
        <h2 className="font-orbitron text-sm select-none">{title}</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => onClose(id)} className="w-5 h-5 bg-red-500/80 rounded-full hover:bg-red-500"></button>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <Suspense fallback={<div className="text-center p-8">Loading Application...</div>}>
            <WindowContent 
              view={view} 
              t={t} 
              onLaunchSimulation={onLaunchSimulation}
              onAskNexus={onAskNexus}
            />
        </Suspense>
      </div>
    </motion.div>
  );
};

export default Window;