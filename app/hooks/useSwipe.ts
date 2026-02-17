import { useRef, useCallback, useEffect, useState } from 'react';
import {
  determineSwipeDirection,
  shouldIgnoreDownSwipe,
} from '@/app/feature/map/utils/swipeUtils';

type Props = {
  /** 上スワイプ時のコールバック（展開） */
  onSwipeUp?: () => void;
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
  /** 上スワイプを無効化 */
  disableUpSwipe?: boolean;
  /** 下スワイプを無効化 */
  disableDownSwipe?: boolean;
  /** 左スワイプを無効化 */
  disableLeftSwipe?: boolean;
  /** 右スワイプを無効化 */
  disableRightSwipe?: boolean;
};

type UseSwipeReturn = {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  /** スワイプ中のY方向移動量（ビジュアルフィードバック用） */
  dragDeltaY: number;
};

/**
 * 上下左右のスワイプナビゲーションを提供するフック
 *
 * 全てのタッチ/マウスイベントを React イベントハンドラーとして返す。
 * addEventListener + useEffect の方式だと、AnimatePresence 内の要素の
 * マウント/アンマウントタイミングでリスナーが登録されない問題を回避。
 */
export const useSwipe = ({
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  containerRef,
  disableUpSwipe = false,
  disableDownSwipe = false,
  disableLeftSwipe = false,
  disableRightSwipe = false,
}: Props): UseSwipeReturn => {
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const startScrollTopRef = useRef<number>(0);
  const [dragDeltaY, setDragDeltaY] = useState(0);

  // 最新のコールバックを refs に保持
  const onSwipeUpRef = useRef(onSwipeUp);
  const onSwipeDownRef = useRef(onSwipeDown);
  const onSwipeLeftRef = useRef(onSwipeLeft);
  const onSwipeRightRef = useRef(onSwipeRight);

  useEffect(() => {
    onSwipeUpRef.current = onSwipeUp;
  }, [onSwipeUp]);

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
   * スワイプ終了時の共通処理
   */
  const processSwipeEnd = useCallback(() => {
    if (!isDraggingRef.current) return;

    const deltaX = currentXRef.current - startXRef.current;
    const deltaY = currentYRef.current - startYRef.current;

    if (!shouldIgnoreDownSwipe(deltaY, startScrollTopRef.current)) {
      const direction = determineSwipeDirection({
        deltaX,
        deltaY,
        threshold,
        disableUpSwipe,
        disableDownSwipe,
        disableLeftSwipe,
        disableRightSwipe,
      });

      switch (direction) {
        case 'up':
          onSwipeUpRef.current?.();
          break;
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
    setDragDeltaY(0);
  }, [
    threshold,
    disableUpSwipe,
    disableDownSwipe,
    disableLeftSwipe,
    disableRightSwipe,
  ]);

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

      // Y方向の移動量を更新（±20pxに制限）
      const clampedDeltaY = Math.max(-20, Math.min(20, deltaY));
      setDragDeltaY(clampedDeltaY);

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
    dragDeltaY,
  };
};
