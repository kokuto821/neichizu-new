import { useRef, useCallback, useEffect } from 'react';
import { getPointerPosition, preventPullToRefresh } from '../utils/swipeUtils';

type Props = {
  /** スワイプ完了時のコールバック */
  onClose?: () => void;
  /** スワイプ検出の閾値（デフォルト: 100px） */
  threshold?: number;
  /** スワイプ検出の軸（デフォルト: 'y'） */
  axis?: 'x' | 'y';
  /** スワイプ操作を監視するコンテナ要素の ref */
  containerRef?: React.RefObject<HTMLElement | null>;
};

type UseSwipeReturn = {
  /** タッチ／マウス開始ハンドラ */
  onTouchStart: (e: React.TouchEvent) => void;
  /** タッチ／マウス移動ハンドラ */
  onTouchMove: (e: React.TouchEvent) => void;
  /** タッチ／マウス終了ハンドラ */
  onTouchEnd: () => void;
  /** マウスダウンハンドラ */
  onMouseDown: (e: React.MouseEvent) => void;
  /** スワイプ開始位置 */
  startPositionRef: React.RefObject<number>;
};

/**
 * タッチ／マウスのスワイプ（開始／移動／終了）ハンドラを提供するフック
 * 位置やドラッグ状態は refs で管理し再レンダリングを避ける
 * グローバルなマウスイベントリスナーは一度だけ登録し、refs を参照して処理する
 */
export const useSwipe = ({
  onClose,
  threshold = 100,
  axis = 'y',
  containerRef,
}: Props): UseSwipeReturn => {
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

  /**
   * 指定した閾値（または現在の threshold）で閉じる判定を行い、true/false を返す
   * @param delta 移動量
   * @param optThreshold オプションの閾値
   * @return boolean 閾値を超えていれば true、そうでなければ false
   */
  const checkThreshold = useCallback(
    (delta: number, optThreshold?: number): boolean => {
      // optThreshold が数値で渡されていればそれを使い、そうでなければ thresholdValueRef.current（既定の閾値）を使う
      const effectiveThreshold = optThreshold ?? thresholdValueRef.current;
      // 差分が閾値を超えているか判定
      const isOverThreshold = delta > effectiveThreshold;
      return isOverThreshold;
    },
    []
  );

  const onTouchStart = useCallback(
    (touchEvent: React.TouchEvent): void => {
      // タッチ開始: 開始位置を保存しドラッグ開始フラグを立てる
      startPositionRef.current = getPointerPosition(touchEvent, axis);
      currentPositionRef.current = startPositionRef.current;
      isDraggingRef.current = true;
    },
    [axis]
  );

  const onTouchMove = useCallback(
    (touchEvent: React.TouchEvent): void => {
      if (!isDraggingRef.current) return;

      preventPullToRefresh(
        touchEvent,
        startPositionRef.current,
        containerRef?.current
      );

      currentPositionRef.current = getPointerPosition(touchEvent, axis);
    },
    [axis, containerRef]
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
    (mouseEvent: React.MouseEvent): void => {
      // マウスダウン: デスクトップ向けの開始処理
      startPositionRef.current = getPointerPosition(mouseEvent, axis);
      currentPositionRef.current = startPositionRef.current;
      isDraggingRef.current = true;
    },
    [axis]
  );

  const onMouseMove = useCallback(
    (mouseEvent: MouseEvent): void => {
      if (!isDraggingRef.current) return;
      currentPositionRef.current =
        axis === 'y' ? mouseEvent.clientY : mouseEvent.clientX;
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

  //グローバルなマウスリスナー（mousemove, mouseup）を一度だけ登録
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [axis, onMouseMove, onMouseUp]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    startPositionRef,
  };
};
