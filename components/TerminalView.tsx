import React, { useState, useEffect, useRef, type FC } from 'react';
import { type Simulation } from '../types';

interface TerminalViewProps {
  simulation: Simulation;
  onClose: () => void;
}

const TerminalView: FC<TerminalViewProps> = ({ simulation, onClose }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isProcessing]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    let isMounted = true;
    const typeWriter = (text: string, index = 0) => {
      if (!isMounted || index >= text.length) {
        setIsProcessing(false);
        return;
      }
      setLines(prev => {
        const newLines = [...prev];
        if (newLines.length > 0) {
            newLines[newLines.length - 1] = text.substring(0, index + 1);
        }
        return newLines;
      });
      setTimeout(() => typeWriter(text, index + 1), 20);
    };
    
    setLines([`Scenario: ${simulation.scenario}`]);
    setTimeout(() => {
        setLines(prev => [...prev, '']);
        typeWriter('Type `help` for a list of available commands.');
    }, 1000);

    return () => { isMounted = false; };
  }, [simulation.scenario]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isProcessing || !input) return;

    const command = input.trim();
    const newLines = [...lines, `> ${command}`];
    setInput('');
    setLines(newLines);
    setIsProcessing(true);

    const scriptEntry = simulation.script.find(s => {
        const commandRegex = new RegExp(`^${s.command.replace(/<[^>]+>/g, '(.+)')}$`);
        return commandRegex.test(command);
    });

    setTimeout(() => {
        if (command.toLowerCase() === 'exit') {
            setLines(prev => [...prev, 'Exiting simulation...']);
            setTimeout(onClose, 1000);
            return;
        }

        if (scriptEntry) {
            const output = Array.isArray(scriptEntry.output) ? scriptEntry.output : [scriptEntry.output];
            setLines(prev => [...prev, ...output]);
        } else {
            setLines(prev => [...prev, `Command not found: ${command}. Type 'help' for available commands.`]);
        }
        setIsProcessing(false);
    }, scriptEntry?.delay ?? 500);
  };

  return (
    <div 
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        onClick={() => inputRef.current?.focus()}
    >
      <div className="w-full h-full bg-black border-2 border-green-500/50 rounded-lg shadow-2xl flex flex-col font-mono text-green-400 text-base">
        <header className="p-2 border-b border-green-500/30 flex justify-between items-center">
          <span>SIMULATION TERMINAL :: SECURE_SHELL</span>
          <button onClick={onClose} className="px-3 py-1 bg-red-500/50 hover:bg-red-500/80 text-white rounded">EXIT</button>
        </header>
        <div className="flex-1 p-4 overflow-y-auto">
          {lines.map((line, index) => (
            <pre key={index} className="whitespace-pre-wrap">{line}</pre>
          ))}
          {!isProcessing && (
            <form onSubmit={handleFormSubmit} className="flex">
              <span className="text-cyan-400 mr-2">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                className="w-full bg-transparent focus:outline-none text-green-400"
                autoFocus
              />
            </form>
          )}
           {isProcessing && <div className="h-6 w-2 bg-green-400 animate-pulse"></div>}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};

export default TerminalView;
