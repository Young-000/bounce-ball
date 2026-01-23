import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--ui-primary)]
    hover:bg-[var(--ui-primary-hover)]
    active:bg-[var(--ui-primary-hover)]
    border-b-4 border-[#c77b3f]
    active:border-b-2 active:translate-y-[2px]
  `,
  secondary: `
    bg-[var(--ui-secondary)]
    hover:bg-[var(--ui-secondary-hover)]
    active:bg-[var(--ui-secondary-hover)]
    border-b-4 border-[#1c7ed6]
    active:border-b-2 active:translate-y-[2px]
  `,
  danger: `
    bg-[var(--ui-danger)]
    hover:bg-[#fa5252]
    active:bg-[#e03131]
    border-b-4 border-[#c92a2a]
    active:border-b-2 active:translate-y-[2px]
  `,
  ghost: `
    bg-transparent
    hover:bg-white/10
    active:bg-white/20
    border-2 border-white/30
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[10px]',
  md: 'px-6 py-3 text-[12px]',
  lg: 'px-8 py-4 text-[14px]',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
}: ButtonProps): React.ReactElement {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-['Press_Start_2P']
        text-white
        rounded-sm
        transition-all duration-100
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{
        fontFamily: "'Press Start 2P', monospace",
        textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)',
      }}
    >
      {children}
    </button>
  );
}

export default Button;
