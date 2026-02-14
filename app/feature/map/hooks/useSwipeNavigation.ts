import { useRef, useCallback, useEffect } from 'react';

type SwipeDirection = 'left' | 'right' | 'down';

type Props = {
  /** 下スワイプ時のコールバック（閉じる） */
  onSwipeDown?: () => void;
  /** 左スワイプ時のコールバック（次へ） */
  onSwipeLeft?: () => void;
  /** 右スワイプ時のコールバック（前へ） */
  onSwipeRight?: () => void;
  /** スワイプ検出の閾値（デフォルト: 50px） */
  threshold?: number;
  /** スワイプ操作を監視するコンテナ要素の ref */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** 下スワイプを無効化 */
  disableDownSwipe?: boolean;
  /** 左スワイプを無効化 */
  disableLeftSwipe?: boolean;
  /** 右スワイプを無効化 */
  disableRightSwipe?: boolean;
};

type UseSwipeNavigationReturn = {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
};

/**
 * 左右・下方向のスワイプナビゲーションを提供するフック
 *
 * 全てのタッチ/マウスイベントを React イベントハンドラーとして返す。
 * addEventListener + useEffect の方式だと、AnimatePresence 内の要素の
 * マウント/アンマウントタイミングでリスナーが登録されない問題を回避。
 */
export const useSwipeNavigation = ({
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  containerRef,
  disableDownSwipe = false,
  disableLeftSwipe = false,
  disableRightSwipe = false,
}: Props): UseSwipeNavigationReturn => {
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const startScrollTopRef = useRef<number>(0);

  // 最新のコールバックを refs に保持
  const onSwipeDownRef = useRef(onSwipeDown);
  const onSwipeLeftRef = useRef(onSwipeLeft);
  const onSwipeRightRef = useRef(onSwipeRight);

  useEffect(() => {
    onSwipeDownRef.current = onSwipeDown;
  }, [onSwipeDown]);

  useEffect(() => {
    onSwipeLeftRef.current = onSwipeLeft;
  }, [onSwipeLeft]);

  useEffect(() => {
    onSwipeRightRef.current = onSwipeRight;
  }, [onSwipeRight]);

  /**
   * スワイプ方向を判定
   */
  const determineSwipeDirection = useCallback(
    (deltaX: number, deltaY: number): SwipeDirection | null => {
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (absDeltaY > absDeltaX) {
        if (deltaY > threshold && !disableDownSwipe) {
          return 'down';
        }
      } else {
        if (deltaX < -threshold && !disableLeftSwipe) {
          return 'left';
        }
        if (deltaX > threshold && !disableRightSwipe) {
          return 'right';
        }
      }

      return null;
    },
    [threshold, disableDownSwipe, disableLeftSwipe, disableRightSwipe]
  );

  /**
   * スワイプ終了時の共通処理
   */
  const processSwipeEnd = useCallback(() => {
    if (!isDraggingRef.current) return;

    const deltaX = currentXRef.current - startXRef.current;
    const deltaY = currentYRef.current - startYRef.current;

    // 下方向スワイプの場合、開始時のスクロール位置をチェック
    if (deltaY > 0 && startScrollTopRef.current > 20) {
      // スクロール途中からの下スワイプは無視
    } else {
      const direction = determineSwipeDirection(deltaX, deltaY);

      switch (direction) {
        case 'down':
          onSwipeDownRef.current?.();
          break;
        case 'left':
          onSwipeLeftRef.current?.();
          break;
        case 'right':
          onSwipeRightRef.current?.();
          break;
      }
    }

    isDraggingRef.current = false;
    startXRef.current = 0;
    startYRef.current = 0;
    currentXRef.current = 0;
    currentYRef.current = 0;
  }, [determineSwipeDirection]);

  // ===== 全て React Event Handlers (JSX props として直接アタッチ) =====

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      startXRef.current = touch.clientX;
      startYRef.current = touch.clientY;
      currentXRef.current = touch.clientX;
      currentYRef.current = touch.clientY;
      isDraggingRef.current = true;
      const el = containerRef?.current;
      startScrollTopRef.current = el ? el.scrollTop : 0;
    },
    [containerRef]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDraggingRef.current) return;
      const touch = e.touches[0];
      currentXRef.current = touch.clientX;
      currentYRef.current = touch.clientY;

      const deltaY = currentYRef.current - startYRef.current;
      const el = containerRef?.current;

      // スクロール最上部で下スワイプ時、プルトゥリフレッシュを防止
      if (el && el.scrollTop <= 1 && deltaY > 0) {
        e.preventDefault();
      }
    },
    [containerRef]
  );

  const onTouchEnd = useCallback(() => {
    processSwipeEnd();
  }, [processSwipeEnd]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;
      currentXRef.current = e.clientX;
      currentYRef.current = e.clientY;
      isDraggingRef.current = true;
      const el = containerRef?.current;
      startScrollTopRef.current = el ? el.scrollTop : 0;
    },
    [containerRef]
  );

  // mousemove / mouseup: マウス操作のグローバルリスナー
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    currentXRef.current = e.clientX;
    currentYRef.current = e.clientY;
  }, []);

  const onMouseUp = useCallback(() => {
    processSwipeEnd();
  }, [processSwipeEnd]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
  };
};
