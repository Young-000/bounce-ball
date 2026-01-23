import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'dark' | 'transparent';
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const variantStyles = {
  default: 'bg-[var(--bg-panel)]/90 border-2 border-white/20',
  dark: 'bg-[var(--bg-main)]/95 border-2 border-white/10',
  transparent: 'bg-black/50 border border-white/10',
};

export function Panel({
  children,
  className = '',
  padding = 'md',
  variant = 'default',
}: PanelProps): React.ReactElement {
  return (
    <div
      className={`
        rounded-sm
        backdrop-blur-sm
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${className}
      `}
      style={{
        boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.3)',
      }}
    >
      {children}
    </div>
  );
}

export default Panel;
