import React, { useState, useEffect, useRef, type FC, type FormEvent } from 'react';
import { startChat } from '../services/geminiService';
import { type ChatMessage, type Translations } from '../types';
import { type Chat } from '@google/genai';

interface ChatProps {
  t: Translations;
}

const ChatComponent: FC<ChatProps> = ({ t }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatInstance = startChat();
    setChat(chatInstance);
    setHistory([{ role: 'model', content: t.chat.greeting }]);
  }, [t.chat.greeting]);

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
      console.error('Error sending message:', error);
      setHistory(prev => {
        const newHistory = [...prev];
        const lastMessage = newHistory[newHistory.length - 1];
        if (lastMessage && lastMessage.role === 'model') {
          lastMessage.content = "// CONNECTION ERROR: Could not establish link to HUB AI core.";
        }
        return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="animate-fade-in max-w-4xl mx-auto">
      <div 
        className="w-full h-[75vh] bg-[var(--color-surface)]/80 border-2 border-[var(--color-primary)]/50 rounded-lg shadow-2xl flex flex-col neon-border"
      >
        <header className="p-4 border-b border-[var(--color-primary)]/30">
          <h2 className="font-orbitron text-xl text-[var(--color-secondary)] neon-text text-center">{t.chat.title}</h2>
        </header>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {history.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div dir="auto" className={`max-w-xl p-3 rounded-lg ${msg.role === 'user' ? 'bg-slate-700 text-slate-200' : 'bg-transparent text-[var(--color-secondary)]'}`}>
                  <pre className="font-sans whitespace-pre-wrap">{msg.content}{isLoading && index === history.length - 1 ? '▋' : ''}</pre>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--color-primary)]/30">
          <div className="flex items-center bg-slate-800 border border-slate-600 rounded-lg p-2 focus-within:border-[var(--color-secondary)]">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t.chat.placeholder}
              dir={document.documentElement.dir}
              disabled={isLoading}
              className="w-full bg-transparent text-slate-200 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <button type="submit" disabled={isLoading} className="ms-2 px-4 py-1 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] rounded disabled:bg-slate-600 text-black font-bold">
              {t.chat.send}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
