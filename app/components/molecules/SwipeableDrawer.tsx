import React, { useState, useRef, FC, ReactNode } from 'react';
import Image from 'next/image';
import { color } from '@/app/css/color';
import { useSwipe } from '@/app/hooks/useSwipe';
import DrawerContainer from './DrawerContainer';

// タイトルボタン
const NavigationTitle: FC<{
  children: ReactNode;
  textColor?: string;
  onClick?: () => void;
}> = ({ children, textColor = color.EcruWhite, onClick }) => {
  const imageSize = 25;
  return (
    <button onClick={onClick} className="inline-flex items-center gap-2">
      <div
        className="flex items-center justify-center"
        style={{ minWidth: imageSize, minHeight: imageSize }}
      >
        <Image
          src="/img/logo.png"
          width={imageSize}
          height={imageSize}
          alt="Logo Icon"
        />
      </div>
      <span className="font-bold" style={{ color: textColor }}>
        {children}
      </span>
    </button>
  );
};

// バックドロップ
const Backdrop: FC<{
  isOpen: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ isOpen, onClick }) =>
  isOpen ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
      onClick={onClick}
    />
  ) : null;

// ドロワーヘッダー
const DrawerHeader: FC<{ onClose: () => void }> = ({ onClose }) => (
  <div
    className="flex items-center justify-center relative w-full h-auto"
    style={{ backgroundColor: color.LightGreen }}
  >
    <Image
      src="/img/hyakumeizan-eyecatch.png"
      alt="Logo Icon"
      height={300}
      width={300}
      style={{ objectFit: 'contain' }}
    />
    <button
      onClick={onClose}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors absolute top-4 right-4 bg-white opacity-80"
      aria-label="閉じる"
    >
      <svg
        className="w-6 h-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);

// ドロワーフッター
const DrawerFooter: FC = () => (
  <div className="p-4 border-t border-gray-200 flex items-center justify-center mt-auto">
    <p className="text-center">
      <NavigationTitle textColor={color.DarkGreen}>Neichizu</NavigationTitle>
    </p>
  </div>
);

// ドロワー本文
const DrawerBody: FC = () => (
  <div className="p-4 pt-8 text-gray-800 dark:text-gray-800">
    Neichizu(ねいちず)は日本百名山やジオパークなど日本の自然スポットにまつわる地点をまとめた地図です。
  </div>
);

export const SwipeableDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setIsOpen(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  // useSwipe フックを使用
  const { swipeHandlers, swipeRefs } = useSwipe({
    onClose: handleClose,
    threshold: 100,
    axis: 'y',
  });

  // pull-to-refresh を抑止するためのラッパー
  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    // フックの開始ハンドラを呼ぶ
    swipeHandlers.onTouchStart(event);
  };

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    // ドロワー内部で一番上にある（スクロールトップが0）かつ下方向への移動なら
    try {
      const targetElement = event.currentTarget as HTMLDivElement;
      const startPosition = swipeRefs.startRef.current ?? 0;
      const currentPosition = event.touches[0].clientY;
      const delta = currentPosition - startPosition;

      if (delta > 0 && targetElement.scrollTop === 0) {
        // iOS などで pull-to-refresh をキャンセルするため preventDefault
        event.preventDefault();
      }
    } catch {}

    swipeHandlers.onTouchMove(event);
  };

  const onTouchEnd = () => {
    swipeHandlers.onTouchEnd();
  };

  // バックドロップクリックで閉じる
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) setIsOpen(false);
  };

  return (
    <>
      <NavigationTitle onClick={toggleDrawer}>Neichizu</NavigationTitle>
      <Backdrop isOpen={isOpen} onClick={handleBackdropClick} />
      <DrawerContainer
        isOpen={isOpen}
        drawerRef={drawerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={swipeHandlers.onMouseDown}
      >
        <DrawerHeader onClose={handleClose} />
        <DrawerBody />
        <DrawerFooter />
      </DrawerContainer>
    </>
  );
};
