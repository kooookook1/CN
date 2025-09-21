import React, { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationSystem: FC<NotificationSystemProps> = ({ notifications, onRemove }) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'var(--color-accent)';
      case 'error': return 'var(--color-danger)';
      case 'warning': return 'var(--color-warning)';
      case 'info': return 'var(--color-primary)';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[300] space-y-4 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={onRemove}
            icon={getIcon(notification.type)}
            color={getColor(notification.type)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
  icon: React.ReactNode;
  color: string;
}

const NotificationItem: FC<NotificationItemProps> = ({ notification, onRemove, icon, color }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, [notification, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className="glass-panel p-4 min-w-[320px] max-w-[420px] pointer-events-auto"
      style={{
        borderLeft: `4px solid ${color}`,
        boxShadow: `0 0 20px ${color}40`
      }}
    >
      <div className="flex items-start gap-3">
        <div 
          className="flex-shrink-0 p-2 rounded-lg"
          style={{ 
            backgroundColor: `${color}20`,
            color: color
          }}
        >
          {icon}
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-[var(--color-text)] mb-1">
            {notification.title}
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {notification.message}
          </p>
        </div>

        <button
          onClick={() => onRemove(notification.id)}
          className="flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] transition-colors"
        >
          <svg className="w-4 h-4 text-[var(--color-text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* شريط التقدم */}
      <motion.div
        className="absolute bottom-0 left-0 h-1"
        style={{ backgroundColor: color }}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ 
          duration: (notification.duration || 5000) / 1000,
          ease: 'linear'
        }}
      />
    </motion.div>
  );
};

export default NotificationSystem;