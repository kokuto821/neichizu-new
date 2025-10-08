import React, { useState, useEffect, useRef, FC, ReactNode } from 'react';
import Image from 'next/image';
import { color } from '@/app/css/color';

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
  <div className="p-4 pt-8">
    Neichizu(ねいちず)は日本百名山やジオパークなど日本の自然スポットにまつわる地点をまとめた地図です。
  </div>
);

export const SwipeableDrawerWithCloseButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const drawerRef = useRef(null);

  const toggleDrawer = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  // スワイプ処理
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientY);
    setCurrentX(e.touches[0].clientY);
    setIsDragging(true);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientY);
  };
  const handleTouchEnd = () => {
    if (!isDragging) return;
    const diffY = currentX - startX;
    if (diffY > 100) setIsOpen(false);
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // ESCキーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // バックドロップクリックで閉じる
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  return (
    <>
      <NavigationTitle onClick={toggleDrawer}>Neichizu</NavigationTitle>
      <Backdrop isOpen={isOpen} onClick={handleBackdropClick} />
      <div
        ref={drawerRef}
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50 transform transition-transform duration-300 rounded-t-2xl h-[98vh] overflow-y-auto ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col h-full">
          <DrawerHeader onClose={handleClose} />
          <DrawerBody />
          <DrawerFooter />
        </div>
      </div>
    </>
  );
};
