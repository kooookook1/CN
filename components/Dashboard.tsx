import React, { useState, useEffect, type FC } from 'react';
import { type Simulation } from '../types';

// Import all the dashboard modules
import GlobalThreatMap from './GlobalThreatMap';
import OsPantheon from './OsPantheon';
import UniversalArsenal from './UniversalArsenal';
import Academy from './Academy';
import VulnerabilityLab from './VulnerabilityLab';
import DigitalClock from './DigitalClock';
import SystemInfo from './SystemInfo';
import WeatherWidget from './WeatherWidget';

interface DashboardProps {
  onLaunchSimulation: (simulation: Simulation) => void;
  onAskNexus: (prompt: string) => void;
}

type Tab = 'overview' | 'pantheon' | 'arsenal' | 'academy' | 'lab';

const TABS: { id: Tab; label: string; icon: string; color: string }[] = [
  { id: 'overview', label: 'Overview', icon: '🌐', color: 'var(--color-primary)' },
  { id: 'pantheon', label: 'OS Pantheon', icon: '💻', color: 'var(--color-secondary)' },
  { id: 'arsenal', label: 'Universal Arsenal', icon: '🛡️', color: 'var(--color-accent)' },
  { id: 'academy', label: 'Interactive Academy', icon: '🎓', color: 'var(--color-warning)' },
  { id: 'lab', label: 'Vulnerability Lab', icon: '🔬', color: 'var(--color-danger)' },
];

const Dashboard: FC<DashboardProps> = ({ onLaunchSimulation, onAskNexus }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [stats, setStats] = useState({
    totalTools: 150,
    activeUsers: 1337,
    vulnerabilities: 42,
    uptime: 99.9
  });

  useEffect(() => {
    // محاكاة تحديث الإحصائيات
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        vulnerabilities: prev.vulnerabilities + Math.floor(Math.random() * 3 - 1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderOverview = () => (
    <div className="animate-fadeIn space-y-6">
      {/* إحصائيات رئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card card-neon p-6 text-center">
          <div className="text-4xl font-bold gradient-text mb-2">{stats.totalTools}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">Total Tools</div>
          <div className="mt-2 text-xs text-[var(--color-accent)]">+12 this month</div>
        </div>
        <div className="card card-neon p-6 text-center">
          <div className="text-4xl font-bold gradient-text mb-2">{stats.activeUsers}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">Active Users</div>
          <div className="mt-2 text-xs text-[var(--color-primary)]">Live</div>
        </div>
        <div className="card card-neon p-6 text-center">
          <div className="text-4xl font-bold gradient-text mb-2">{stats.vulnerabilities}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">Vulnerabilities</div>
          <div className="mt-2 text-xs text-[var(--color-danger)]">Critical: 5</div>
        </div>
        <div className="card card-neon p-6 text-center">
          <div className="text-4xl font-bold gradient-text mb-2">{stats.uptime}%</div>
          <div className="text-sm text-[var(--color-text-secondary)]">Uptime</div>
          <div className="mt-2 text-xs text-[var(--color-accent)]">Excellent</div>
        </div>
      </div>

      {/* ميزات سريعة */}
      <div className="card glass-panel">
        <h3 className="text-2xl font-orbitron mb-4 gradient-text">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => onLaunchSimulation('terminal')}
            className="btn btn-glass flex items-center gap-3 justify-center py-4"
          >
            <span className="text-2xl">🖥️</span>
            <span>Launch Terminal</span>
          </button>
          <button 
            onClick={() => onAskNexus('Help me get started')}
            className="btn btn-glass flex items-center gap-3 justify-center py-4"
          >
            <span className="text-2xl">🤖</span>
            <span>AI Assistant</span>
          </button>
          <button 
            onClick={() => setActiveTab('academy')}
            className="btn btn-glass flex items-center gap-3 justify-center py-4"
          >
            <span className="text-2xl">📚</span>
            <span>Start Learning</span>
          </button>
        </div>
      </div>

      {/* آخر التحديثات */}
      <div className="card glass-panel">
        <h3 className="text-2xl font-orbitron mb-4 gradient-text">Latest Updates</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors">
            <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="font-semibold">New Vulnerability Scanner v2.0</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Enhanced detection capabilities</div>
            </div>
            <div className="text-xs text-[var(--color-text-tertiary)]">2 hours ago</div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors">
            <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="font-semibold">Academy Course: Advanced Pentesting</div>
              <div className="text-sm text-[var(--color-text-secondary)]">New module available</div>
            </div>
            <div className="text-xs text-[var(--color-text-tertiary)]">5 hours ago</div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors">
            <div className="w-2 h-2 bg-[var(--color-secondary)] rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="font-semibold">OS Pantheon Update</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Added 5 new OS templates</div>
            </div>
            <div className="text-xs text-[var(--color-text-tertiary)]">1 day ago</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
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
    <div className="animate-fadeIn flex flex-col h-full space-y-4">
      <GlobalThreatMap />
      
      <div className="flex-shrink-0">
        <nav className="flex flex-wrap gap-2 p-2 glass-panel rounded-lg">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                font-orbitron text-sm py-3 px-6 rounded-lg
                transition-all duration-300 flex items-center gap-2
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-[var(--color-text-inverse)] shadow-neon'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]'
                }
              `}
              style={{
                boxShadow: activeTab === tab.id ? `0 0 20px ${tab.color}` : 'none'
              }}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
