export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

type DetermineSwipeDirectionParams = {
  deltaX: number;
  deltaY: number;
  threshold: number;
  disableUpSwipe: boolean;
  disableDownSwipe: boolean;
  disableLeftSwipe: boolean;
  disableRightSwipe: boolean;
};

/**
 * スワイプ方向を判定する純粋関数
 *
 * deltaX / deltaY と閾値、各方向の無効フラグから方向を返す。
 * 閾値を超えていない場合や無効化されている方向の場合は null を返す。
 */
export const determineSwipeDirection = ({
  deltaX,
  deltaY,
  threshold,
  disableUpSwipe,
  disableDownSwipe,
  disableLeftSwipe,
  disableRightSwipe,
}: DetermineSwipeDirectionParams): SwipeDirection | null => {
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);
  const isVerticalSwipe = absDeltaY > absDeltaX;

  const isSwipeUp = isVerticalSwipe && deltaY < -threshold && !disableUpSwipe;
  const isSwipeDown =
    isVerticalSwipe && deltaY > threshold && !disableDownSwipe;
  const isSwipeLeft =
    !isVerticalSwipe && deltaX < -threshold && !disableLeftSwipe;
  const isSwipeRight =
    !isVerticalSwipe && deltaX > threshold && !disableRightSwipe;

  if (isSwipeUp) return 'up';
  if (isSwipeDown) return 'down';
  if (isSwipeLeft) return 'left';
  if (isSwipeRight) return 'right';

  return null;
};

/**
 * 下方向スワイプをスクロール位置に基づいて無視すべきか判定する純粋関数
 * 縦に20px以上スクロール → 下にスワイプ → 無視される
 *
 * コンテナがスクロール途中（scrollTop > 閾値）から始まった下スワイプは無視する。
 */
export const shouldIgnoreDownSwipe = (
  deltaY: number,
  startScrollTop: number,
  scrollThreshold = 20
): boolean => {
  //指が下方向に動いたことを意味（Y座標は下に行くほど大きくなるため）
  const isDownward = deltaY > 0;
  //スワイプ開始時にコンテナがすでにスクロールされていた（上部から離れていた）
  const wasScrolled = startScrollTop > scrollThreshold;
  //指が下方向に動き、かつコンテナがすでにスクロールされていた場合、下方向スワイプを無視する
  return isDownward && wasScrolled;
};
