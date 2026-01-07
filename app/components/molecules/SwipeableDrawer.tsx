import React, { useState, useRef, ReactNode } from 'react';

import { color } from '@/app/css/color';
import { useSwipe } from '@/app/hooks/useSwipe';
import { DrawerHeader } from '../atoms/DrawerHeader';
import { NavigationTitle } from '../atoms/NavigationTitle';
import { DrawerFooter } from '../atoms/DrawerFooter';
import { NeiBackdrop } from '../atoms/NeiBackdrop';
import { DrawerContainer } from './DrawerContainer';

type Props = {
  /** ドロワーに表示する画像のパス */
  imagePath: string;
  /** ドロワー内に表示するコンテンツ */
  children: ReactNode;
};

export const SwipeableDrawer = ({ imagePath, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const handleClose = () => setIsOpen(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  // useSwipe フックを使用
  const {
    onTouchStart: swipeOnTouchStart,
    onTouchMove: swipeOnTouchMove,
    onTouchEnd: swipeOnTouchEnd,
    onMouseDown: swipeOnMouseDown,
  } = useSwipe({
    onClose: handleClose,
    threshold: 100,
    axis: 'y',
    containerRef: drawerRef,
  });

  // バックドロップクリックで閉じる
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) setIsOpen(false);
  };

  return (
    <>
      <NavigationTitle
        onClick={toggleDrawer}
        titleText={'Neichizu'}
        textColor={color.EcruWhite}
        titleImagePath={'/img/logo.svg'}
        altText={'Logo Icon'}
      />
      <NeiBackdrop isOpen={isOpen} onClick={handleBackdropClick} />
      <DrawerContainer
        isOpen={isOpen}
        drawerRef={drawerRef}
        onTouchStart={swipeOnTouchStart}
        onTouchMove={swipeOnTouchMove}
        onTouchEnd={swipeOnTouchEnd}
        onMouseDown={swipeOnMouseDown}
      >
        <DrawerHeader imagePath={imagePath} onClose={handleClose} />
        {children}
        <DrawerFooter>
          <NavigationTitle
            titleText={'Neichizu'}
            textColor={color.DarkGreen}
            titleImagePath={'/img/logo.svg'}
            altText={'Logo Icon'}
          />
        </DrawerFooter>
      </DrawerContainer>
    </>
  );
};
