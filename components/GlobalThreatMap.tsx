import React, { type FC } from 'react';

const GlobalThreatMap: FC = () => {
    // A simplified world map path. In a real app, this would be more detailed or loaded from a file.
    const worldPath = "M0,50 L20,40 L40,60 L60,30 L80,70 L100,20 L120,80 L140,10 L160,90 L180,0 L200,100 L220,10 L240,110 L260,20 L280,120 L300,30 L320,130 L340,40 L360,140 L380,50 L400,150 L420,60 L440,140 L460,70 L480,130 L500,80 L520,120 L540,90 L560,110 L580,100";

    const locations = [
        { x: 50, y: 50 }, { x: 150, y: 80 }, { x: 250, y: 40 }, 
        { x: 350, y: 90 }, { x: 450, y: 60 }, { x: 550, y: 100 },
        { x: 100, y: 20 }, { x: 200, y: 110 }, { x: 300, y: 30 },
        { x: 400, y: 120 }, { x: 500, y: 50 }
    ];

    const arcs = [
        { from: locations[0], to: locations[4], delay: 0 },
        { from: locations[6], to: locations[3], delay: 1 },
        { from: locations[2], to: locations[9], delay: 2 },
        { from: locations[8], to: locations[1], delay: 3 },
        { from: locations[5], to: locations[7], delay: 4 },
        { from: locations[10], to: locations[0], delay: 5 },
    ];
    
  return (
    <div className="relative w-full aspect-[2/1] max-w-4xl mx-auto p-4 bg-slate-900/50 border border-cyan-400/20 rounded-lg overflow-hidden">
        <h3 className="absolute top-4 left-4 font-orbitron text-cyan-300 z-10">LIVE THREAT FEED [SIMULATED]</h3>
        <svg viewBox="0 0 600 300" className="w-full h-full">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                 <radialGradient id="pulse-gradient">
                    <stop offset="0%" stopColor="rgba(255,0,0,1)" />
                    <stop offset="75%" stopColor="rgba(255,0,0,0.5)" />
                    <stop offset="100%" stopColor="rgba(255,0,0,0)" />
                </radialGradient>
            </defs>
            
            {/* Map silhouette */}
            <path d={worldPath} fill="none" stroke="#0e7490" strokeWidth="0.5" />
            
            {/* Locations */}
            {locations.map((loc, i) => (
                <circle key={i} cx={loc.x} cy={loc.y} r="1.5" fill="#06b6d4" filter="url(#glow)" />
            ))}

            {/* Arcs */}
            {arcs.map((arc, i) => {
                const d = `M${arc.from.x},${arc.from.y} Q${(arc.from.x + arc.to.x)/2},${(arc.from.y + arc.to.y)/2 - 50} ${arc.to.x},${arc.to.y}`;
                return (
                    <g key={i}>
                        <path d={d} stroke="#ef4444" strokeWidth="1" fill="none" strokeDasharray="4 8" strokeOpacity="0.3" />
                        <circle cx={arc.from.x} cy={arc.from.y} r="5" fill="url(#pulse-gradient)">
                            <animate attributeName="r" from="1" to="8" dur="1.5s" begin={`${arc.delay}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin={`${arc.delay}s`} repeatCount="indefinite" />
                        </circle>
                        <path d={d} stroke="#f87171" strokeWidth="1" fill="none" filter="url(#glow)">
                           <animate 
                                attributeName="stroke-dasharray" 
                                from="0, 1000" 
                                to="1000, 0" 
                                dur="2s"
                                begin={`${arc.delay}s`}
                                repeatCount="indefinite" 
                            />
                        </path>
                    </g>
                )
            })}
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
    </div>
  );
};

export default GlobalThreatMap;
