import React, { useState, useEffect, type FC } from 'react';

interface SystemStats {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  processes: number;
  uptime: string;
}

const SystemInfo: FC = () => {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 45,
    memory: 62,
    storage: 78,
    network: 85,
    processes: 127,
    uptime: '12d 5h 23m'
  });

  useEffect(() => {
    // محاكاة تحديث الإحصائيات
    const interval = setInterval(() => {
      setStats(prev => ({
        cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.min(100, Math.max(0, prev.memory + (Math.random() - 0.5) * 5)),
        storage: prev.storage,
        network: Math.min(100, Math.max(0, prev.network + (Math.random() - 0.5) * 15)),
        processes: Math.max(50, prev.processes + Math.floor(Math.random() * 10 - 5)),
        uptime: prev.uptime
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number) => {
    if (value < 50) return 'var(--color-accent)';
    if (value < 75) return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  const StatBar: FC<{ label: string; value: number; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-[var(--color-primary)]">{icon}</div>
          <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
        </div>
        <span className="text-sm font-mono text-[var(--color-text-secondary)]">{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-[var(--color-surface)] rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-1000 rounded-full"
          style={{ 
            width: `${value}%`,
            backgroundColor: getStatusColor(value),
            boxShadow: `0 0 10px ${getStatusColor(value)}`
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-orbitron gradient-text">System Monitor</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
          <span className="text-xs text-[var(--color-text-tertiary)]">Live</span>
        </div>
      </div>

      {/* إحصائيات الأداء */}
      <div className="space-y-4">
        <StatBar 
          label="CPU Usage" 
          value={stats.cpu}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          }
        />
        
        <StatBar 
          label="Memory" 
          value={stats.memory}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        
        <StatBar 
          label="Storage" 
          value={stats.storage}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          }
        />
        
        <StatBar 
          label="Network" 
          value={stats.network}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
          }
        />
      </div>

      {/* معلومات إضافية */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--color-primary)]/20">
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-[var(--color-primary)]">
            {stats.processes}
          </div>
          <div className="text-xs text-[var(--color-text-tertiary)]">Active Processes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-[var(--color-accent)]">
            {stats.uptime}
          </div>
          <div className="text-xs text-[var(--color-text-tertiary)]">System Uptime</div>
        </div>
      </div>

      {/* زر الإجراءات */}
      <div className="flex gap-2">
        <button className="btn btn-glass btn-sm flex-1">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
        <button className="btn btn-outline btn-sm flex-1">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </button>
      </div>
    </div>
  );
};

export default SystemInfo;