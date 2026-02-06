import { useRef, useCallback, useEffect } from 'react';

type SwipeDirection = 'left' | 'right' | 'down';

type Props = {
  /** 下スワイプ時のコールバック（閉じる） */
  onSwipeDown?: () => void;
  /** 左スワイプ時のコールバック（次へ） */
  onSwipeLeft?: () => void;
  /** 右スワイプ時のコールバック（前へ） */
  onSwipeRight?: () => void;
  /** スワイプ検出の閾値（デフォルト: 100px） */
  threshold?: number;
  /** スワイプ操作を監視するコンテナ要素の ref */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** 下スワイプを無効化 */
  disableDownSwipe?: boolean;
  /** 左スワイプを無効化 */
  disableLeftSwipe?: boolean;
  /** 右スワイプを無効化 */
  disableRightSwipe?: boolean;
  /** 要素の再マウントを検知するためのID (keyなど) */
  itemId?: string | number;
};

type UseSwipeNavigationReturn = {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
};

/**
 * 左右・下方向のスワイプナビゲーションを提供するフック
 * - 左スワイプ: 次のアイテムへ
 * - 右スワイプ: 前のアイテムへ
 * - 下スワイプ: 閉じる
 */
export const useSwipeNavigation = ({
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  threshold = 100,
  containerRef,
  disableDownSwipe = false,
  disableLeftSwipe = false,
  disableRightSwipe = false,
  itemId,
}: Props): UseSwipeNavigationReturn => {
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);
  const isDraggingRef = useRef(false);

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

      // 縦方向のスワイプが優勢
      if (absDeltaY > absDeltaX) {
        // 下方向（閉じる）
        if (deltaY > threshold && !disableDownSwipe) {
          console.log('[SwipeNav] DOWN swipe detected', { deltaY, threshold });
          return 'down';
        }
      }
      // 横方向のスワイプが優勢
      else {
        // 左スワイプ（次へ）
        if (deltaX < -threshold && !disableLeftSwipe) {
          console.log('[SwipeNav] LEFT swipe detected', { deltaX, threshold });
          return 'left';
        }
        // 右スワイプ（前へ）
        if (deltaX > threshold && !disableRightSwipe) {
          console.log('[SwipeNav] RIGHT swipe detected', { deltaX, threshold });
          return 'right';
        }
      }

      console.log('[SwipeNav] No valid swipe detected', { deltaX, deltaY, threshold });
      return null;
    },
    [threshold, disableDownSwipe, disableLeftSwipe, disableRightSwipe]
  );

  // Touch handlers attached to the element directly to support non-passive events
  useEffect(() => {
    const element = containerRef?.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startXRef.current = touch.clientX;
      startYRef.current = touch.clientY;
      currentXRef.current = touch.clientX;
      currentYRef.current = touch.clientY;
      isDraggingRef.current = true;
      console.log('[SwipeNav] touchstart', { startY: touch.clientY, scrollTop: element.scrollTop, cancelable: e.cancelable });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;

      const touch = e.touches[0];
      currentXRef.current = touch.clientX;
      currentYRef.current = touch.clientY;
      const deltaY = currentYRef.current - startYRef.current;

      // プルトゥリフレッシュ防止ロジック
      // コンテナが最上部にあり、かつ下にスワイプしようとしている場合
      if (
        element.scrollTop <= 1 && // 1pxの遊びを持たせる
        deltaY > 0
      ) {
         console.log('[SwipeNav] touchmove check', { deltaY, scrollTop: element.scrollTop, cancelable: e.cancelable });
         // passive: false でリスナー登録されているため preventDefault が効く
        if (e.cancelable) {
            console.log('[SwipeNav] Preventing default scroll/pull-to-refresh');
            e.preventDefault();
        } else {
            console.warn('[SwipeNav] Cannot prevent default (not cancelable)');
        }
      }
    };

    const handleTouchEnd = () => {
      if (!isDraggingRef.current) return;

      const deltaX = currentXRef.current - startXRef.current;
      const deltaY = currentYRef.current - startYRef.current;

      // 下方向スワイプ（閉じる or リフレッシュ）の場合、
      // 要素がスクロール可能な状態であれば、トップにいるか確認する
      // ※ deltaY > 0 は下方向
      if (deltaY > 0 && element.scrollTop > 1) { // 1pxの遊びを持たせる
         // スクロール中なのでスワイプ判定しない
         console.log('[SwipeNav] Ignored down swipe because scrollTop > 1', { scrollTop: element.scrollTop });
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
    };

    // non-passive listener を登録
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef, determineSwipeDirection, itemId]);


  const onMouseDown = useCallback((e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    currentXRef.current = e.clientX;
    currentYRef.current = e.clientY;
    isDraggingRef.current = true;
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    currentXRef.current = e.clientX;
    currentYRef.current = e.clientY;
  }, []);

  const onMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;

    const deltaX = currentXRef.current - startXRef.current;
    const deltaY = currentYRef.current - startYRef.current;

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

    isDraggingRef.current = false;
    startXRef.current = 0;
    startYRef.current = 0;
    currentXRef.current = 0;
    currentYRef.current = 0;
  }, [determineSwipeDirection]);

  // グローバルなマウスリスナー登録
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return {
    // コンポーネント側でアタッチする必要がなくなったため空関数を返す
    // （既存コードの変更を最小限にするための互換性維持）
    onTouchStart: () => {},
    onTouchMove: () => {},
    onTouchEnd: () => {},
    onMouseDown,
  };
};
