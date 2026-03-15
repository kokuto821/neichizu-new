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
  el.style.scrollBehavior = smooth ? 'smooth' : 'auto';
  el.scrollLeft = scrollLeft;
  if (!smooth) {
    el.style.scrollBehavior = '';
  }
};
