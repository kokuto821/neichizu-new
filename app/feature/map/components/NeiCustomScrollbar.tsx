import { FC, useEffect, useState, useRef, useCallback } from 'react';
import { INNER_WIDTH_CLASS } from '@/app/styles/layoutConstants';

type Props = {
  containerRef: React.RefObject<HTMLDivElement | null>;
};

const style = {
  track: `relative ${INNER_WIDTH_CLASS} mx-auto h-1 mt-1 bg-transparent rounded-full transition-opacity duration-300`,
  thumb: 'absolute top-0 bottom-0 h-full rounded-full cursor-pointer hover:opacity-80 transition-opacity bg-semiDarkGreen',
};

export const NeiCustomScrollbar: FC<Props> = ({ containerRef }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const [thumbWidthRatio, setThumbWidthRatio] = useState(20); // %
  // isVisibleをrefで管理し、handleScrollの依存配列から除外
  const isVisibleRef = useRef(false);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        setIsVisible(false);
      }
      return;
    }
    if (!isVisibleRef.current) {
      isVisibleRef.current = true;
      setIsVisible(true);
    }

    const currentProgress = el.scrollLeft / maxScroll;
    const clampedProgress = Math.min(1, Math.max(0, currentProgress));
    setProgress(clampedProgress);

    // Thumb幅の動的計算（表示領域 / 全体の幅）
    const ratio = (el.clientWidth / el.scrollWidth) * 100;
    setThumbWidthRatio(Math.max(10, Math.min(50, ratio))); // 最小10%, 最大50%に制限
  }, [containerRef]);


  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [containerRef, handleScroll]);

  // ドラッグ操作
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // テキスト選択防止など
    isDraggingRef.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    startXRef.current = clientX;

    if (containerRef.current) {
      startScrollLeftRef.current = containerRef.current.scrollLeft;
    }

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd);
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDraggingRef.current || !trackRef.current || !containerRef.current) return;

    const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const deltaX = clientX - startXRef.current;
    const trackWidth = trackRef.current.clientWidth;
    const el = containerRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;

    // トラック上の可動域に対する進捗率の変化量
    // 可動域 = トラック幅 - つまみ幅
    // ただしCSSで%幅にしているため、移動量(px) / トラック幅(px) * (100 / (100-thumbWidth)) が係数になるがややこしい
    // 簡易的に「トラック幅全体に対する移動割合」をスクロール量に反映

    const moveRatio = deltaX / trackWidth;
    // moveRatio * maxScroll だと、つまみの移動距離 < スクロール移動距離 になる（逆パララックス）
    // 正確には deltaX / (trackWidth * (1 - thumbWidthRatio/100)) * maxScroll

    const scrollDelta = (deltaX / (trackWidth * (1 - thumbWidthRatio / 100))) * maxScroll;

    el.scrollLeft = startScrollLeftRef.current + scrollDelta;

    if (e.cancelable && e.type === 'touchmove') e.preventDefault();
  }, [thumbWidthRatio]);

  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('touchend', handleDragEnd);
  }, [handleDragMove]);

  // スクロールバー上でのホイール操作
  const wheelCooldownRef = useRef(false);
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (wheelCooldownRef.current) return;

    const el = containerRef.current;
    if (!el || el.children.length < 2) return;

    // カード幅を計算
    const first = el.children[0] as HTMLElement;
    const second = el.children[1] as HTMLElement;
    const cardWidth = second.offsetLeft - first.offsetLeft;
    if (cardWidth === 0) return;

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta === 0) return;

    const direction = delta > 0 ? 1 : -1;
    el.scrollTo({ left: el.scrollLeft + cardWidth * direction, behavior: 'smooth' });

    wheelCooldownRef.current = true;
    setTimeout(() => { wheelCooldownRef.current = false; }, 0);
  }, [containerRef]);

  return (
    <div
      ref={trackRef}
      className={`${style.track} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onWheel={handleWheel}
    >
      <div
        className={style.thumb}
        style={{
          width: `${thumbWidthRatio}%`,
          left: `${progress * (100 - thumbWidthRatio)}%`,
          backgroundColor: 'var(--semiDarkGreen)'
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      />
    </div>
  );
};
