import React, { useState, type FC } from 'react';
import { TOOLS, NexusIcon } from '../constants';
import { type Tool } from '../types';
import Card from './common/Card';
import Modal from './common/Modal';

interface UniversalArsenalProps {
  onAskNexus: (prompt: string) => void;
}

const UniversalArsenal: FC<UniversalArsenalProps> = ({ onAskNexus }) => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const categories = [...new Set(TOOLS.map(tool => tool.category))];

  return (
    <div className="animate-fade-in">
      <h2 className="font-orbitron text-3xl text-center mb-8 text-slate-100 flicker-fast">UNIVERSAL ARSENAL</h2>
      {categories.map(category => (
        <div key={category} className="mb-12">
          <h3 className="font-orbitron text-2xl text-cyan-300 border-b-2 border-cyan-400/30 pb-2 mb-6">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TOOLS.filter(tool => tool.category === category).map(tool => (
              <Card
                key={tool.id}
                title={tool.name}
                description={tool.description}
                Icon={tool.icon}
                onClick={() => setSelectedTool(tool)}
              />
            ))}
          </div>
        </div>
      ))}

      {selectedTool && (
        <Modal title={selectedTool.name} onClose={() => setSelectedTool(null)}>
          <div className="space-y-4">
            <div>
              <h4 className="font-orbitron text-lg text-cyan-300 mb-2">Primary Use</h4>
              {/* Fix for line 41: Changed property 'usage' to 'purpose' to match the Tool type. */}
              <p className="text-slate-400">{selectedTool.details.purpose}</p>
            </div>
            <div>
              <h4 className="font-orbitron text-lg text-cyan-300 mb-2">Example Command</h4>
              <div className="bg-black p-4 rounded-md font-mono text-sm text-green-400">
                {/* Fix for line 46: This property is now available after updating the Tool type and data. */}
                <p><span className="text-cyan-400 mr-2">#</span>{selectedTool.details.example}</p>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => onAskNexus(`Provide more examples for the ${selectedTool.name} tool.`)}
                className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-cyan-300 font-bold py-2 px-4 rounded transition duration-300"
              >
                <NexusIcon className="w-5 h-5" /> Ask NEXUS-AI
              </button>
              <a 
                href={selectedTool.details.sourceLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Official Source
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UniversalArsenal;