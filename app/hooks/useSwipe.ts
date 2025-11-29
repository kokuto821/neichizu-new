import { useRef, useCallback, useEffect } from 'react';

export type SwipeHandlers = {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
};

export type SwipeRefs = {
  // 公開時は RefObject（current が null の可能性あり）にして外部からの書き換えを防ぐ
  // 呼び出し側は null チェックが必要になります。
  startRef: React.RefObject<number>;
  currentRef: React.RefObject<number>;
  draggingRef: React.RefObject<boolean>;
};

export type UseSwipeReturn = {
  swipeHandlers: SwipeHandlers;
  swipeRefs: SwipeRefs;
  setThreshold: (v: number) => void;
  checkThreshold: (delta: number, optThreshold?: number) => boolean;
};

type Options = {
  onClose?: () => void;
  threshold?: number;
  axis?: 'x' | 'y';
};

/**
 * useSwipe
 * - タッチ／マウスのスワイプ（開始／移動／終了）ハンドラを提供するフック
 * - 位置やドラッグ状態は refs で管理し再レンダリングを避ける
 * - グローバルなマウスイベントリスナーは一度だけ登録し、refs を参照して処理する
 */
export const useSwipe = ({
  onClose,
  threshold = 100,
  axis = 'y',
}: Options = {}): UseSwipeReturn => {
  const startPositionRef = useRef<number>(0);
  const currentPositionRef = useRef<number>(0);
  const isDraggingRef = useRef(false);

  // 最新の threshold/onClose を refs に保持して、グローバルハンドラから参照できるようにする
  const thresholdValueRef = useRef(threshold);
  const onCloseCallbackRef = useRef(onClose);
  useEffect(() => {
    thresholdValueRef.current = threshold;
  }, [threshold]);
  useEffect(() => {
    onCloseCallbackRef.current = onClose;
  }, [onClose]);

  // ランタイムで閾値を更新するヘルパー
  const setThreshold = useCallback((value: number): void => {
    thresholdValueRef.current = value;
  }, []);

  // 指定した閾値（または現在の threshold）で閉じる判定を行い、true/false を返す
  const checkThreshold = useCallback(
    (delta: number, optThreshold?: number): boolean => {
      // optThreshold が数値で渡されていればそれを使い、そうでなければ thresholdValueRef.current（既定の閾値）を使う
      const effectiveThreshold =
        typeof optThreshold === 'number'
          ? optThreshold
          : thresholdValueRef.current;
      return delta > effectiveThreshold;
    },
    []
  );

  const getPointerPosition = useCallback(
    (
      event: TouchEvent | MouseEvent | React.TouchEvent | React.MouseEvent
    ): number => {
      // タッチイベントかどうかの判定
      const hasTouches =
        'touches' in event &&
        (event as TouchEvent).touches &&
        (event as TouchEvent).touches.length > 0;
      // マウスイベントかどうかの判定
      const hasClient =
        'clientY' in event && typeof (event as MouseEvent).clientY === 'number';

      if (hasTouches) {
        const touches = (event as React.TouchEvent).touches;
        const touchPoint = touches[0];
        return axis === 'y' ? touchPoint.clientY : touchPoint.clientX;
      }

      if (hasClient) {
        const pointerEvent = event as MouseEvent;
        return axis === 'y' ? pointerEvent.clientY : pointerEvent.clientX;
      }

      return 0;
    },
    [axis]
  );

  const onTouchStart = useCallback(
    (event: React.TouchEvent): void => {
      // タッチ開始: 開始位置を保存しドラッグ開始フラグを立てる
      startPositionRef.current = getPointerPosition(event);
      currentPositionRef.current = startPositionRef.current;
      isDraggingRef.current = true;
    },
    [getPointerPosition]
  );

  const onTouchMove = useCallback(
    (event: React.TouchEvent): void => {
      if (!isDraggingRef.current) return;
      currentPositionRef.current = getPointerPosition(event);
    },
    [getPointerPosition]
  );

  const onTouchEnd = useCallback((): void => {
    // タッチ終了: 移動量を判定して onClose を呼ぶ
    if (!isDraggingRef.current) return;
    const diff = currentPositionRef.current - startPositionRef.current;
    if (checkThreshold(diff)) onCloseCallbackRef.current?.();
    isDraggingRef.current = false;
    startPositionRef.current = 0;
    currentPositionRef.current = 0;
  }, [checkThreshold]);

  const onMouseDown = useCallback(
    (event: React.MouseEvent): void => {
      // マウスダウン: デスクトップ向けの開始処理
      startPositionRef.current = getPointerPosition(event);
      currentPositionRef.current = startPositionRef.current;
      isDraggingRef.current = true;
    },
    [getPointerPosition]
  );

  const onMouseMove = useCallback(
    (event: MouseEvent): void => {
      if (!isDraggingRef.current) return;
      currentPositionRef.current = axis === 'y' ? event.clientY : event.clientX;
    },
    [axis]
  );

  const onMouseUp = useCallback((): void => {
    if (!isDraggingRef.current) return;
    const diff = currentPositionRef.current - startPositionRef.current;
    if (checkThreshold(diff)) onCloseCallbackRef.current?.();
    isDraggingRef.current = false;
    startPositionRef.current = 0;
    currentPositionRef.current = 0;
  }, [checkThreshold]);
  // グローバルなマウスリスナー（mousemove, mouseup）を一度だけ登録
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [axis, onMouseMove, onMouseUp]);

  return {
    swipeHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown,
    },
    swipeRefs: {
      startRef: startPositionRef,
      currentRef: currentPositionRef,
      draggingRef: isDraggingRef,
    },
    // 追加 API: ランタイムで閾値を変更したいときや、任意の閾値で判定したいときに使う
    setThreshold,
    checkThreshold,
  };
};
