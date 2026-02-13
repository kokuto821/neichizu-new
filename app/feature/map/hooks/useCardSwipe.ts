import { useRef, useCallback } from 'react';

type UseCardSwipeProps = {
  onExpand: () => void;
  onDeselect: () => void;
};

export const useCardSwipe = ({ onExpand, onDeselect }: UseCardSwipeProps) => {
  // 上下スワイプ検出用
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    const swipeThreshold = 50;
    const verticalThresholdFactor = 1.2;

    // 縦方向の判定（横方向よりも明らかに縦移動が大きい場合のみ）
    if (Math.abs(dy) > Math.abs(dx) * verticalThresholdFactor) {
      if (dy < -swipeThreshold) {
        onExpand(); // 上へスワイプで展開
      } else if (dy > swipeThreshold) {
        onDeselect(); // 下へスワイプで閉じる
      }
    }
  }, [onExpand, onDeselect]);

  return {
    handleTouchStart,
    handleTouchEnd,
  };
};
