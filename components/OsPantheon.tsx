import React, { useState, type FC } from 'react';
// FIX: Combined imports for constants. This resolves errors where members were not found.
import { OPERATING_SYSTEMS, NexusIcon } from '../constants';
import { type OperatingSystem } from '../types';
import Card from './common/Card';
import Modal from './common/Modal';

interface OsPantheonProps {
  onAskNexus: (prompt: string) => void;
}

const OsPantheon: FC<OsPantheonProps> = ({ onAskNexus }) => {
  const [selectedOs, setSelectedOs] = useState<OperatingSystem | null>(null);

  const categories = [...new Set(OPERATING_SYSTEMS.map(os => os.category))];

  return (
    <div className="animate-fade-in">
      <h2 className="font-orbitron text-3xl text-center mb-8 text-slate-100 flicker-fast">OS PANTHEON</h2>
      {categories.map(category => (
        <div key={category} className="mb-12">
          <h3 className="font-orbitron text-2xl text-cyan-300 border-b-2 border-cyan-400/30 pb-2 mb-6">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {OPERATING_SYSTEMS.filter(os => os.category === category).map(os => (
              <Card
                key={os.id}
                title={os.name}
                description={os.description}
                Icon={os.logo}
                onClick={() => setSelectedOs(os)}
              />
            ))}
          </div>
        </div>
      ))}

      {selectedOs && (
        <Modal title={selectedOs.name} onClose={() => setSelectedOs(null)}>
          <div className="space-y-4">
            <div>
              <h4 className="font-orbitron text-lg text-cyan-300 mb-2">Philosophy</h4>
              <p className="text-slate-400">{selectedOs.details.philosophy}</p>
            </div>
             <div>
              <h4 className="font-orbitron text-lg text-cyan-300 mb-2">Status</h4>
              <p className={`text-sm px-2 py-1 inline-block rounded ${selectedOs.details.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{selectedOs.details.status}</p>
            </div>
            <div>
              <h4 className="font-orbitron text-lg text-cyan-300 mb-2">Available Versions</h4>
              <ul className="space-y-2">
                {selectedOs.details.versions.map(v => (
                  <li key={v.name} className="bg-slate-800 p-2 rounded flex justify-between items-center text-sm">
                    <span>{v.name}</span>
                    <span className="font-mono text-slate-500">SHA256: {v.hash}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-orbitron text-lg text-cyan-300 mb-2">Quick Start Guide</h4>
              <div className="bg-black p-4 rounded-md font-mono text-sm text-green-400">
                {selectedOs.details.quickStart.map((line, i) => (
                  <p key={i}><span className="text-cyan-400 mr-2">$</span>{line}</p>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
               <button 
                onClick={() => onAskNexus(`Tell me more about the use cases for ${selectedOs.name}.`)}
                className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-cyan-300 font-bold py-2 px-4 rounded transition duration-300"
              >
                <NexusIcon className="w-5 h-5" /> Ask NEXUS-AI
               </button>
               <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Download Latest
               </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OsPantheon;