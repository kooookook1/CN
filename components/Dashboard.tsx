import React, { useState, type FC } from 'react';
import { type Simulation } from '../types';

// Import all the dashboard modules
import GlobalThreatMap from './GlobalThreatMap';
import OsPantheon from './OsPantheon';
import UniversalArsenal from './UniversalArsenal';
import Academy from './Academy';
import VulnerabilityLab from './VulnerabilityLab';

interface DashboardProps {
  onLaunchSimulation: (simulation: Simulation) => void;
  onAskNexus: (prompt: string) => void;
}

type Tab = 'pantheon' | 'arsenal' | 'academy' | 'lab';

const TABS: { id: Tab; label: string }[] = [
  { id: 'pantheon', label: 'OS Pantheon' },
  { id: 'arsenal', label: 'Universal Arsenal' },
  { id: 'academy', label: 'Interactive Academy' },
  { id: 'lab', label: 'Vulnerability Lab' },
];

const Dashboard: FC<DashboardProps> = ({ onLaunchSimulation, onAskNexus }) => {
  const [activeTab, setActiveTab] = useState<Tab>('pantheon');

  const renderContent = () => {
    switch (activeTab) {
      case 'pantheon':
        return <OsPantheon onAskNexus={onAskNexus} />;
      case 'arsenal':
        return <UniversalArsenal onAskNexus={onAskNexus} />;
      case 'academy':
        return <Academy onLaunchSimulation={onLaunchSimulation} onAskNexus={onAskNexus} />;
      case 'lab':
        return <VulnerabilityLab onLaunchSimulation={onLaunchSimulation} onAskNexus={onAskNexus} />;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full space-y-4">
      <GlobalThreatMap />
      
      <div className="flex-shrink-0 border-b-2 border-cyan-400/30">
        <nav className="flex space-x-4">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-orbitron text-lg py-2 px-4 transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'text-cyan-300 border-b-2 border-cyan-300'
                  : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
