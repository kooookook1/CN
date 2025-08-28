import React, { useState, useEffect, useRef, type FC, type FormEvent } from 'react';
import { startChat } from '../services/geminiService';
import { type ChatMessage } from '../types';
import { type Chat } from '@google/genai';

interface NexusAiChatProps {
  onClose: () => void;
  initialPrompt?: string;
}

const NexusAiChat: FC<NexusAiChatProps> = ({ onClose, initialPrompt }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const chatInstance = startChat();
    setChat(chatInstance);
    setHistory([{ role: 'model', content: "NEXUS-AI online. State your directive, Operative." }]);
  }, []);

  useEffect(() => {
    if (initialPrompt && !isLoading) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [history]);

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !chat || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setHistory(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    
    setHistory(prev => [...prev, { role: 'model', content: '' }]);

    try {
      const result = await chat.sendMessageStream({ message: currentInput });
      let text = '';
      for await (const chunk of result) {
        text += chunk.text;
        setHistory(prev => {
          const newHistory = [...prev];
          const lastMessage = newHistory[newHistory.length - 1];
          if (lastMessage && lastMessage.role === 'model') {
            lastMessage.content = text;
          }
          return newHistory;
        });
      }
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      setHistory(prev => {
        const newHistory = [...prev];
        const lastMessage = newHistory[newHistory.length - 1];
        if (lastMessage && lastMessage.role === 'model') {
          lastMessage.content = "// CONNECTION ERROR: Could not establish link to NEXUS core. Check console for details.";
        }
        return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-2xl h-[80vh] bg-slate-900/80 border-2 border-cyan-400/50 rounded-lg shadow-2xl flex flex-col neon-border-cyan"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-cyan-400/30 flex justify-between items-center">
          <h2 className="font-orbitron text-xl text-cyan-300 neon-text-cyan">NEXUS-AI INTERFACE</h2>
          <button onClick={onClose} className="text-3xl font-bold leading-none p-2 -m-2">&times;</button>
        </header>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {history.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-slate-700 text-slate-200' : 'bg-transparent text-cyan-300'}`}>
                  {msg.role === 'user' && <p className="font-mono whitespace-pre-wrap">{msg.content}</p>}
                  {msg.role === 'model' && <pre className="font-mono whitespace-pre-wrap">{msg.content}{isLoading && index === history.length - 1 ? '▋' : ''}</pre>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="p-4 border-t border-cyan-400/30">
          <div className="flex items-center bg-slate-800 border border-slate-600 rounded-lg p-2 focus-within:border-cyan-400">
            <span className="font-mono text-cyan-400 mr-2">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter directive..."
              disabled={isLoading}
              className="w-full bg-transparent text-slate-200 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <button type="submit" disabled={isLoading} className="ml-2 px-4 py-1 bg-cyan-600 hover:bg-cyan-500 rounded disabled:bg-slate-600 text-white font-bold">SEND</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NexusAiChat;
