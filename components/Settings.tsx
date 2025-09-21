import React, { useState, type FC } from 'react';
import { motion } from 'framer-motion';

interface SettingsProps {
  onClose?: () => void;
}

const Settings: FC<SettingsProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'security' | 'advanced'>('general');
  
  const [settings, setSettings] = useState({
    // General
    language: 'en',
    timezone: 'UTC',
    notifications: true,
    autoSave: true,
    
    // Appearance
    theme: 'dark',
    accentColor: '#00ff88',
    fontSize: 'medium',
    animations: true,
    
    // Security
    twoFactor: false,
    sessionTimeout: 30,
    encryptData: true,
    
    // Advanced
    debugMode: false,
    experimentalFeatures: false,
    performanceMode: 'balanced'
  });

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'advanced', label: 'Advanced', icon: '🚀' }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Language
        </label>
        <select
          value={settings.language}
          onChange={(e) => setSettings({ ...settings, language: e.target.value })}
          className="w-full px-4 py-2 bg-[var(--color-surface)] rounded-lg border border-[var(--color-primary)]/30 focus:border-[var(--color-primary)] outline-none"
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Timezone
        </label>
        <select
          value={settings.timezone}
          onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
          className="w-full px-4 py-2 bg-[var(--color-surface)] rounded-lg border border-[var(--color-primary)]/30 focus:border-[var(--color-primary)] outline-none"
        >
          <option value="UTC">UTC</option>
          <option value="EST">Eastern Time</option>
          <option value="PST">Pacific Time</option>
          <option value="GMT">GMT</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium text-[var(--color-text)]">
            Enable Notifications
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
              className="sr-only"
            />
            <div className={`w-12 h-6 rounded-full transition-colors ${
              settings.notifications ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-surface)]'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                settings.notifications ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </div>
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium text-[var(--color-text)]">
            Auto-save Changes
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
              className="sr-only"
            />
            <div className={`w-12 h-6 rounded-full transition-colors ${
              settings.autoSave ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-surface)]'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                settings.autoSave ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </div>
          </div>
        </label>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Theme
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['dark', 'light', 'auto'].map((theme) => (
            <button
              key={theme}
              onClick={() => setSettings({ ...settings, theme })}
              className={`p-3 rounded-lg border-2 transition-all ${
                settings.theme === theme
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                  : 'border-[var(--color-surface)] bg-[var(--color-surface)]'
              }`}
            >
              <div className="text-2xl mb-1">
                {theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🌓'}
              </div>
              <div className="text-xs capitalize">{theme}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Accent Color
        </label>
        <div className="flex gap-3">
          {['#00ff88', '#ff0066', '#00ccff', '#ffcc00', '#cc00ff'].map((color) => (
            <button
              key={color}
              onClick={() => setSettings({ ...settings, accentColor: color })}
              className={`w-10 h-10 rounded-lg transition-all ${
                settings.accentColor === color ? 'scale-110 ring-2 ring-white' : ''
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Font Size
        </label>
        <div className="flex gap-3">
          {['small', 'medium', 'large'].map((size) => (
            <button
              key={size}
              onClick={() => setSettings({ ...settings, fontSize: size })}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                settings.fontSize === size
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm font-medium text-[var(--color-text)]">
          Enable Animations
        </span>
        <div className="relative">
          <input
            type="checkbox"
            checked={settings.animations}
            onChange={(e) => setSettings({ ...settings, animations: e.target.checked })}
            className="sr-only"
          />
          <div className={`w-12 h-6 rounded-full transition-colors ${
            settings.animations ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-surface)]'
          }`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              settings.animations ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </div>
        </div>
      </label>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="p-4 bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="font-medium text-[var(--color-warning)]">Security Notice</span>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          These settings affect the security of your account. Make changes carefully.
        </p>
      </div>

      <label className="flex items-center justify-between cursor-pointer">
        <div>
          <span className="text-sm font-medium text-[var(--color-text)]">
            Two-Factor Authentication
          </span>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            Add an extra layer of security to your account
          </p>
        </div>
        <div className="relative">
          <input
            type="checkbox"
            checked={settings.twoFactor}
            onChange={(e) => setSettings({ ...settings, twoFactor: e.target.checked })}
            className="sr-only"
          />
          <div className={`w-12 h-6 rounded-full transition-colors ${
            settings.twoFactor ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-surface)]'
          }`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              settings.twoFactor ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </div>
        </div>
      </label>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Session Timeout (minutes)
        </label>
        <input
          type="number"
          value={settings.sessionTimeout}
          onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
          className="w-full px-4 py-2 bg-[var(--color-surface)] rounded-lg border border-[var(--color-primary)]/30 focus:border-[var(--color-primary)] outline-none"
          min="5"
          max="120"
        />
      </div>

      <label className="flex items-center justify-between cursor-pointer">
        <div>
          <span className="text-sm font-medium text-[var(--color-text)]">
            Encrypt Local Data
          </span>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            Encrypt sensitive data stored locally
          </p>
        </div>
        <div className="relative">
          <input
            type="checkbox"
            checked={settings.encryptData}
            onChange={(e) => setSettings({ ...settings, encryptData: e.target.checked })}
            className="sr-only"
          />
          <div className={`w-12 h-6 rounded-full transition-colors ${
            settings.encryptData ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-surface)]'
          }`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              settings.encryptData ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </div>
        </div>
      </label>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <div className="p-4 bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-[var(--color-danger)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="font-medium text-[var(--color-danger)]">Advanced Settings</span>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          These settings are for advanced users only. Incorrect configuration may cause issues.
        </p>
      </div>

      <label className="flex items-center justify-between cursor-pointer">
        <div>
          <span className="text-sm font-medium text-[var(--color-text)]">
            Debug Mode
          </span>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            Enable detailed logging and debugging tools
          </p>
        </div>
        <div className="relative">
          <input
            type="checkbox"
            checked={settings.debugMode}
            onChange={(e) => setSettings({ ...settings, debugMode: e.target.checked })}
            className="sr-only"
          />
          <div className={`w-12 h-6 rounded-full transition-colors ${
            settings.debugMode ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-surface)]'
          }`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              settings.debugMode ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </div>
        </div>
      </label>

      <label className="flex items-center justify-between cursor-pointer">
        <div>
          <span className="text-sm font-medium text-[var(--color-text)]">
            Experimental Features
          </span>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            Enable features that are still in development
          </p>
        </div>
        <div className="relative">
          <input
            type="checkbox"
            checked={settings.experimentalFeatures}
            onChange={(e) => setSettings({ ...settings, experimentalFeatures: e.target.checked })}
            className="sr-only"
          />
          <div className={`w-12 h-6 rounded-full transition-colors ${
            settings.experimentalFeatures ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-surface)]'
          }`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              settings.experimentalFeatures ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </div>
        </div>
      </label>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Performance Mode
        </label>
        <div className="space-y-2">
          {['power-saver', 'balanced', 'high-performance'].map((mode) => (
            <label key={mode} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="performanceMode"
                value={mode}
                checked={settings.performanceMode === mode}
                onChange={(e) => setSettings({ ...settings, performanceMode: e.target.value })}
                className="w-4 h-4 text-[var(--color-primary)]"
              />
              <div>
                <span className="text-sm font-medium text-[var(--color-text)] capitalize">
                  {mode.replace('-', ' ')}
                </span>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {mode === 'power-saver' && 'Reduce resource usage'}
                  {mode === 'balanced' && 'Optimal balance of performance and efficiency'}
                  {mode === 'high-performance' && 'Maximum performance, higher resource usage'}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-[var(--color-primary)]/20">
        <h2 className="text-2xl font-orbitron gradient-text">Settings</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 p-4 border-r border-[var(--color-primary)]/20">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]'
                    : 'hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'appearance' && renderAppearanceSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
            {activeTab === 'advanced' && renderAdvancedSettings()}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-[var(--color-primary)]/20 flex justify-end gap-3">
        <button className="btn btn-outline">
          Reset to Defaults
        </button>
        <button className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;