import React, { useState, useEffect, type FC } from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

const InteractiveChart: FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [data, setData] = useState<DataPoint[]>([
    { label: 'Security', value: 85, color: 'var(--color-primary)' },
    { label: 'Performance', value: 92, color: 'var(--color-accent)' },
    { label: 'Network', value: 78, color: 'var(--color-secondary)' },
    { label: 'Storage', value: 65, color: 'var(--color-warning)' },
    { label: 'Memory', value: 88, color: 'var(--color-danger)' }
  ]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => 
        prevData.map(item => ({
          ...item,
          value: Math.min(100, Math.max(0, item.value + (Math.random() - 0.5) * 10))
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...data.map(d => d.value));

  const renderBarChart = () => (
    <div className="flex items-end justify-between h-48 gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex-1 flex flex-col items-center gap-2"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            className="w-full relative rounded-t-lg cursor-pointer transition-all duration-300"
            style={{ 
              backgroundColor: item.color,
              boxShadow: hoveredIndex === index ? `0 0 20px ${item.color}` : 'none'
            }}
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / maxValue) * 100}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {hoveredIndex === index && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[var(--color-surface)] px-2 py-1 rounded text-xs whitespace-nowrap">
                {item.value.toFixed(1)}%
              </div>
            )}
          </motion.div>
          <span className="text-xs text-[var(--color-text-tertiary)]">{item.label}</span>
        </div>
      ))}
    </div>
  );

  const renderLineChart = () => {
    const width = 400;
    const height = 200;
    const padding = 20;
    
    const points = data.map((item, index) => ({
      x: (index / (data.length - 1)) * (width - 2 * padding) + padding,
      y: height - (item.value / maxValue) * (height - 2 * padding) - padding
    }));

    const pathData = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');

    return (
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((value, index) => (
          <line
            key={index}
            x1={padding}
            y1={height - (value / 100) * (height - 2 * padding) - padding}
            x2={width - padding}
            y2={height - (value / 100) * (height - 2 * padding) - padding}
            stroke="var(--color-primary)"
            strokeOpacity="0.1"
            strokeDasharray="5,5"
          />
        ))}
        
        {/* Area under line */}
        <path
          d={`${pathData} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
          fill="url(#lineGradient)"
          opacity="0.5"
        />
        
        {/* Line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill={data[index].color}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            {hoveredIndex === index && (
              <text
                x={point.x}
                y={point.y - 15}
                textAnchor="middle"
                fill="var(--color-text)"
                fontSize="12"
              >
                {data[index].value.toFixed(1)}%
              </text>
            )}
          </g>
        ))}
      </svg>
    );
  };

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;

    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg width="100%" height="100%" viewBox="0 0 200 200">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');
            
            currentAngle = endAngle;
            
            return (
              <motion.path
                key={index}
                d={pathData}
                fill={item.color}
                stroke="var(--color-bg)"
                strokeWidth="2"
                className="cursor-pointer"
                initial={{ scale: 0 }}
                animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">
              {hoveredIndex !== null ? `${data[hoveredIndex].value.toFixed(0)}%` : 'Total'}
            </div>
            <div className="text-xs text-[var(--color-text-tertiary)]">
              {hoveredIndex !== null ? data[hoveredIndex].label : 'Analytics'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-orbitron gradient-text">Analytics Dashboard</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded-lg transition-all ${
              chartType === 'bar' 
                ? 'bg-[var(--color-primary)] text-white' 
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
            }`}
          >
            Bar
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded-lg transition-all ${
              chartType === 'line' 
                ? 'bg-[var(--color-primary)] text-white' 
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`px-3 py-1 rounded-lg transition-all ${
              chartType === 'pie' 
                ? 'bg-[var(--color-primary)] text-white' 
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
            }`}
          >
            Pie
          </button>
        </div>
      </div>

      <div className="mb-6">
        {chartType === 'bar' && renderBarChart()}
        {chartType === 'line' && renderLineChart()}
        {chartType === 'pie' && renderPieChart()}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-[var(--color-text-secondary)]">
              {item.label}: {item.value.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveChart;