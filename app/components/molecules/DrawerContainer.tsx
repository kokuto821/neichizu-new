import React, { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  isOpen: boolean;
  drawerRef: React.RefObject<HTMLDivElement | null>;
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: () => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children?: ReactNode;
};

export const DrawerContainer: FC<Props> = ({
  isOpen,
  drawerRef,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onMouseDown,
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const base = [
    'fixed',
    'bg-ecruWhite',
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

  const drawerContainer = [...base, ...mobile, ...desktop].join(' ');

  const style = {
    drawerContainer: drawerContainer,
    content: 'flex flex-col h-full',
  };

  if (!mounted) return null;

  return createPortal(
    <div
      ref={drawerRef}
      className={style.drawerContainer}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
    >
      <div className={style.content}>{children}</div>
    </div>,
    document.body
  );
};
