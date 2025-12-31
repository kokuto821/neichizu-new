export type Axis = 'x' | 'y';

export const getPointerPosition = (
  event: TouchEvent | MouseEvent | React.TouchEvent | React.MouseEvent,
  axis: Axis
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
};

/**
 * pull-to-refresh を抑止するユーティリティ関数
 * @param touchEvent イベント中の pull-to-refresh を抑止するユーティリティ
 * @param start スワイプ開始位置（`startPositionRef.current`）
 * @param containerEl 監視対象コンテナの HTMLElement（`containerRef?.current`）
 */
export const preventPullToRefresh = (
  touchEvent: React.TouchEvent,
  start: number | undefined,
  containerEl?: HTMLElement | null
): void => {
  try {
    const startPos = start ?? 0;
    const current = touchEvent.touches?.[0]?.clientY ?? 0;
    const delta = current - startPos;
    if (delta > 0 && containerEl && containerEl.scrollTop === 0) {
      touchEvent.preventDefault();
    }
  } catch {
    // 安全のためエラーは無視（既存コードと同様）
  }
};
