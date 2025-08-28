import React, { type FC, type ReactNode } from 'react';

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  widthClass?: string;
}

const Modal: FC<ModalProps> = ({ title, children, onClose, widthClass = 'max-w-2xl' }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
      <div 
        className={`w-full ${widthClass} bg-[var(--color-bg)] border-2 border-[var(--color-primary)]/50 rounded-lg shadow-2xl flex flex-col max-h-[90vh] neon-border`}
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-[var(--color-primary)]/30 flex justify-between items-center flex-shrink-0">
          <h2 className="font-orbitron text-xl text-[var(--color-secondary)] neon-text">{title}</h2>
          <button onClick={onClose} className="text-3xl text-slate-400 hover:text-[var(--color-secondary)] leading-none">&times;</button>
        </header>
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
