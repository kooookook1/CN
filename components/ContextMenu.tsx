import React, { useEffect, useRef, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  action?: () => void;
  divider?: boolean;
  submenu?: MenuItem[];
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: MenuItem[];
  onClose: () => void;
}

const ContextMenu: FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleItemClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
      onClose();
    }
  };

  // Adjust position to keep menu within viewport
  const adjustedPosition = () => {
    if (!menuRef.current) return { x, y };
    
    const menuRect = menuRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let adjustedX = x;
    let adjustedY = y;
    
    if (x + menuRect.width > viewportWidth) {
      adjustedX = viewportWidth - menuRect.width - 10;
    }
    
    if (y + menuRect.height > viewportHeight) {
      adjustedY = viewportHeight - menuRect.height - 10;
    }
    
    return { x: adjustedX, y: adjustedY };
  };

  const position = adjustedPosition();

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.15 }}
        className="fixed z-[200] glass-panel rounded-lg shadow-2xl py-2 min-w-[200px]"
        style={{ left: position.x, top: position.y }}
      >
        {items.map((item, index) => (
          <div key={index}>
            {item.divider ? (
              <div className="h-px bg-[var(--color-primary)]/20 my-2 mx-3" />
            ) : (
              <button
                onClick={() => handleItemClick(item)}
                className="
                  w-full px-4 py-2.5 text-left
                  flex items-center gap-3
                  text-[var(--color-text-secondary)]
                  hover:bg-[var(--color-surface)]
                  hover:text-[var(--color-text)]
                  transition-all duration-200
                  group relative
                "
              >
                {item.icon && (
                  <span className="text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {item.icon}
                  </span>
                )}
                <span className="flex-1">{item.label}</span>
                {item.submenu && (
                  <svg className="w-4 h-4 text-[var(--color-text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                
                {/* Hover effect */}
                <div className="
                  absolute inset-0 
                  bg-gradient-to-r from-[var(--color-primary)]/0 via-[var(--color-primary)]/5 to-[var(--color-primary)]/0
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  pointer-events-none
                " />
              </button>
            )}
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default ContextMenu;