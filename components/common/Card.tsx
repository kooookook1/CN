import React, { type FC, type SVGProps } from 'react';

interface CardProps {
  title: string;
  description: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

const Card: FC<CardProps> = ({ title, description, Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-[var(--color-surface)]/50 p-5 rounded-lg border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/60 transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,240,0.2)] hover:-translate-y-1 group flex flex-col"
    >
      <div className="flex items-center mb-3">
        <Icon className="w-8 h-8 me-4 text-[var(--color-primary)] transition-transform group-hover:scale-110" />
        <h4 className="font-orbitron text-lg text-[var(--color-secondary)] group-hover:neon-text transition-all flex-1">{title}</h4>
      </div>
      <p className="text-slate-400 text-sm flex-grow">{description}</p>
      <button className="text-right text-[var(--color-secondary)] mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        Details &raquo;
      </button>
    </div>
  );
};

export default Card;
