import React, { FC, ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  drawerRef: React.RefObject<HTMLDivElement | null>;
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: () => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children?: ReactNode;
};

const DrawerContainer: FC<Props> = ({
  isOpen,
  drawerRef,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onMouseDown,
  children,
}) => {
  const base = [
    'fixed',
    'bg-white',
    'dark:bg-white',
    'shadow-xl',
    'z-50',
    'transform',
    'transition-transform',
    'duration-300',
    'overflow-y-auto',
    'overscroll-contain',
    'touch-none',
  ];

  const mobile = [
    'bottom-0',
    'left-0',
    'right-0',
    'rounded-t-2xl',
    'h-[95%]',
    isOpen ? 'translate-y-0' : 'translate-y-full',
  ];

  const desktop = [
    'md:top-0',
    'md:bottom-0',
    'md:left-0',
    'md:right-auto',
    'md:rounded-none',
    'md:w-[400px]',
    'md:h-full',
    isOpen ? 'md:translate-x-0' : 'md:-translate-x-full',
    'md:translate-y-0',
  ];

  const className = [...base, ...mobile, ...desktop].join(' ');

  return (
    <div
      ref={drawerRef}
      className={className}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
    >
      <div className="flex flex-col h-full">{children}</div>
    </div>
  );
};

export default DrawerContainer;
