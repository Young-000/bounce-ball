import React, { JSX } from 'react';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface PixelTextProps {
  children: React.ReactNode;
  size?: TextSize;
  color?: string;
  shadow?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const sizeMap: Record<TextSize, string> = {
  xs: 'text-[8px]',
  sm: 'text-[10px]',
  md: 'text-[12px]',
  lg: 'text-[16px]',
  xl: 'text-[20px]',
  '2xl': 'text-[24px]',
};

export function PixelText({
  children,
  size = 'md',
  color,
  shadow = false,
  className = '',
  as: Component = 'span',
}: PixelTextProps): React.ReactElement {
  const style: React.CSSProperties = {
    fontFamily: "'Press Start 2P', monospace",
    ...(color && { color }),
    ...(shadow && {
      textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)',
    }),
  };

  return (
    <Component
      className={`${sizeMap[size]} leading-relaxed ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
}

export default PixelText;
