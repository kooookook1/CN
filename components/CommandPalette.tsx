import React, { useState, useEffect, type FC } from 'react';
import { type View, type Translations } from '../types';
import { TOOLS, CodeIcon, LayersIcon, MessageSquareIcon, TerminalIcon, NexusIcon } from '../constants';
import { getQuickAnswer } from '../services/geminiService';
import { audioService } from '../services/audioService';

interface CommandPaletteProps {
  onClose: () => void;
  openWindow: (view: View) => void;
  t: Translations;
}

const CommandPalette: FC<CommandPaletteProps> = ({ onClose, openWindow, t }) => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const actions = [
    { name: t.command_palette.launch_dashboard, icon: NexusIcon, action: () => openWindow('dashboard') },
    { name: t.command_palette.launch_builder, icon: CodeIcon, action: () => openWindow('builder') },
    { name: t.command_palette.launch_chat, icon: MessageSquareIcon, action: () => openWindow('chat') },
  ];

  const handleAction = (action: () => void) => {
    audioService.playSound('click');
    action();
    onClose();
  };
  
  const handleAiQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.startsWith('?')) return;
    
    const aiPrompt = query.substring(1).trim();
    if (!aiPrompt) return;
    
    setIsAiLoading(true);
    setAiResponse(null);
    const response = await getQuickAnswer(aiPrompt);
    setAiResponse(response);
    setIsAiLoading(false);
  }

  const filteredActions = actions.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));
  const filteredTools = TOOLS.filter(t => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex justify-center pt-20" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-[var(--color-bg)] border border-[var(--color-primary)]/50 rounded-lg shadow-2xl flex flex-col h-max max-h-[70vh] neon-border"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleAiQuery}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t.command_palette.placeholder}
            className="w-full p-4 bg-transparent text-lg text-slate-200 focus:outline-none border-b border-[var(--color-primary)]/30"
            autoFocus
          />
        </form>
        <div className="overflow-y-auto">
          {query.startsWith('?') ? (
            <div className="p-4">
               <h3 className="px-4 pb-2 text-xs text-slate-400 font-mono uppercase">{t.command_palette.ai_title}</h3>
               {isAiLoading && <p className="text-slate-400 px-4">Querying NEXUS core...</p>}
               {aiResponse && <pre className="p-4 bg-slate-800/50 rounded-md text-sm text-[var(--color-secondary)] whitespace-pre-wrap">{aiResponse}</pre>}
               {!isAiLoading && !aiResponse && <p className="text-slate-500 px-4">Press Enter to ask: "{query.substring(1)}"</p>}
            </div>
          ) : (
            <>
              {filteredActions.length > 0 && (
                <div className="p-2">
                  <h3 className="px-2 pb-2 text-xs text-slate-400 font-mono uppercase">{t.command_palette.actions_title}</h3>
                  <ul>
                    {filteredActions.map(action => (
                      <li key={action.name} onClick={() => handleAction(action.action)} className="flex items-center gap-3 p-2 rounded-md hover:bg-[var(--color-surface)] cursor-pointer">
                        <action.icon className="w-5 h-5 text-slate-400" />
                        <span>{action.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {filteredTools.length > 0 && (
                <div className="p-2">
                  <h3 className="px-2 pt-2 pb-2 text-xs text-slate-400 font-mono uppercase border-t border-slate-700">{t.command_palette.tools_title}</h3>
                  <ul>
                    {filteredTools.map(tool => (
                      <li key={tool.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-[var(--color-surface)] cursor-pointer">
                        <tool.icon className="w-5 h-5 text-slate-400" />
                        <span>{tool.name}</span>
                        <span className="text-xs text-slate-500 flex-1 text-right">{tool.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {filteredActions.length === 0 && filteredTools.length === 0 && <p className="p-4 text-slate-500">{t.command_palette.no_results}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;