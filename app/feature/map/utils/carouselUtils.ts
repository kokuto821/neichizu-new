// scrollLeft と cardWidth から現在の extended index を算出
export const scrollLeftToExtendedIndex = (scrollLeft: number, cardWidth: number): number =>
  Math.round(scrollLeft / cardWidth);

// クローン位置にいる場合にジャンプ先の extended index を返す（いなければ null）
export const getCloneJumpTarget = (currentExtendedIndex: number, count: number): number | null => {
  if (currentExtendedIndex <= 0) return count;        // 先頭クローン → 末尾実要素
  if (currentExtendedIndex >= count + 1) return 1;   // 末尾クローン → 先頭実要素
  return null;
};

// extended index から real index へ変換（クローン分のオフセット除去）
export const extendedIndexToRealIndex = (extendedIndex: number): number => extendedIndex - 1;

// clone 付き拡張配列を構築: [末尾clone, ...features, 先頭clone]
export const buildExtendedFeatures = <T>(features: T[]): T[] =>
  features.length > 0 ? [features[features.length - 1], ...features, features[0]] : [];

// カード幅を計算するヘルパー
export const calculateCardWidth = (el: HTMLElement | null): number => {
  if (!el || el.children.length === 0) return 0;

  // 実際の要素間の距離(幅 + gap)を計測する
  if (el.children.length >= 2) {
    const first = el.children[0] as HTMLElement;
    const second = el.children[1] as HTMLElement;
    return second.offsetLeft - first.offsetLeft;
  }

  // 要素が1つしかない場合(通常ありえないが念のため)
  return (el.children[0] as HTMLElement).offsetWidth;
};

// スクロール適用を補助する関数
export const applyScroll = (
  el: HTMLElement,
  scrollLeft: number,
  smooth: boolean = false
) => {
  if (smooth) {
    el.style.scrollBehavior = 'smooth';
    el.scrollLeft = scrollLeft;
  } else {
    // iOS Safari では inline style の scroll-behavior が CSS クラス (scroll-smooth) に
    // 上書きされない場合があるため !important で強制上書きする
    el.style.setProperty('scroll-behavior', 'auto', 'important');
    el.scrollLeft = scrollLeft;
    el.style.removeProperty('scroll-behavior');
  }
};
