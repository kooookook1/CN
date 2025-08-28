import React, { useState, type FC } from 'react';
import { ACADEMY_MODULES, NexusIcon } from '../constants';
import { type AcademyModule, type Simulation } from '../types';
import Card from './common/Card';
import Modal from './common/Modal';

interface AcademyProps {
  onLaunchSimulation: (simulation: Simulation) => void;
  onAskNexus: (prompt: string) => void;
}

const Academy: FC<AcademyProps> = ({ onLaunchSimulation, onAskNexus }) => {
  const [selectedModule, setSelectedModule] = useState<AcademyModule | null>(null);

  const paths = [...new Set(ACADEMY_MODULES.map(module => module.path))];

  return (
    <div className="animate-fade-in">
      <h2 className="font-orbitron text-3xl text-center mb-8 text-slate-100 flicker-fast">INTERACTIVE ACADEMY</h2>
      {paths.map(path => (
        <div key={path} className="mb-12">
          <h3 className="font-orbitron text-2xl text-cyan-300 border-b-2 border-cyan-400/30 pb-2 mb-6">{path}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMY_MODULES.filter(module => module.path === path).map(module => (
              <Card
                key={module.id}
                title={module.title}
                description={module.description}
                Icon={module.icon}
                onClick={() => setSelectedModule(module)}
              />
            ))}
          </div>
        </div>
      ))}
      
      {selectedModule && (
        <Modal title={selectedModule.title} onClose={() => setSelectedModule(null)}>
          <div className="space-y-4">
            <div>
              <h4 className="font-orbitron text-lg text-cyan-300 mb-2">Mission Objectives</h4>
              <ul className="list-disc list-inside text-slate-400 space-y-1">
                {selectedModule.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
             <div>
              <h4 className="font-orbitron text-lg text-cyan-300 mb-2">Simulated Lab Briefing</h4>
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-md">
                <p className="text-slate-300">{selectedModule.labDescription}</p>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => onAskNexus(`Give me a hint for the lab in the "${selectedModule.title}" module.`)}
                className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-cyan-300 font-bold py-2 px-4 rounded transition duration-300"
              >
                <NexusIcon className="w-5 h-5" /> Ask NEXUS-AI
              </button>
              <button 
                onClick={() => {
                  onLaunchSimulation(selectedModule.simulation)
                  setSelectedModule(null)
                }}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                  Initiate Lab Environment
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Academy;
