import { color } from '@/app/css/color';
import React, { useState, useEffect, useRef, FC, ReactNode } from 'react';
import Image from 'next/image';

export const SwipeableDrawerWithCloseButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const drawerRef = useRef(null);

  const NavigationTitle: FC<{ children: ReactNode }> = ({ children }) => {
    const imageSize = 25;
    return (
      <>
        <button
          onClick={toggleDrawer}
          className="inline-flex items-center gap-2"
        >
          <div
            className={`flex items-center justify-center min-w-[${imageSize}px] min-h-[${imageSize}px]`}
            style={{ minWidth: imageSize, minHeight: imageSize }}
          >
            <Image
              src="/img/logo.png"
              width={imageSize}
              height={imageSize}
              alt="Logo Icon"
            />
          </div>
          <span className="font-bold" style={{ color: color.EcruWhite }}>
            {children}
          </span>
        </button>
      </>
    );
  };
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // スワイプ処理（下方向）
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
    // 下にスワイプして一定距離以上移動した場合は閉じる
    if (diffY > 100) {
      setIsOpen(false);
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // ESCキーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // バックドロップクリックで閉じる
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    { text: 'ホーム', icon: '🏠' },
    { text: 'プロフィール', icon: '👤' },
    { text: '設定', icon: '⚙️' },
    { text: 'ヘルプ', icon: 'ℹ️' },
  ];

  return (
    <>
      <NavigationTitle>Neichizu</NavigationTitle>
      {/* バックドロップ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={handleBackdropClick}
        />
      )}

      {/* ドロワー（下から表示） */}
      <div
        ref={drawerRef}
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50 transform transition-transform duration-300 rounded-t-2xl max-h-[80vh] overflow-y-auto ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* ハンドルバー */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* ヘッダー（×ボタン付き） */}
        <div className="flex items-center justify-between px-4 pb-4">
          <h2 className="text-xl font-semibold text-gray-800">メニュー</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
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

        {/* メニューリスト */}
        <div className="px-4 pb-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={handleClose}
              className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-100 transition-colors text-left rounded-lg mb-2"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-gray-700 text-lg">{item.text}</span>
            </button>
          ))}
        </div>

        <div className="px-4 pb-6 pt-2 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            SwipeableDrawer (Bottom Sheet)
          </p>
        </div>
      </div>
    </>
  );
};
