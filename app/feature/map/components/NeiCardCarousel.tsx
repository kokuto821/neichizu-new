import { FC } from 'react';
import { GeoparkFeatureContent } from './GeoparkFeatureContent';
import { MountainFeatureContent } from './MountainFeatureContent';
import { motion } from 'framer-motion';
import { FeatureType, isHyakumeizan, isWGeopark } from '@/app/feature/map/utils/featureUtils';
import { useCardCarouselScroll } from '@/app/feature/map/hooks/useCardCarouselScroll';
import { useSwipe } from '@/app/hooks/useSwipe';

import { NeiCustomScrollbar } from './NeiCustomScrollbar';
import { NeiCompactCard } from './NeiCompactCard';

type Props = {
  features: FeatureType[];
  selectedFeature: FeatureType | null;
  onExpand: () => void;
  onFeatureChange: (feature: FeatureType) => void;
  onDeselect: () => void;
};

const style = {
  container: [
    'flex overflow-x-auto gap-3 w-full',
    'snap-x snap-mandatory',
    'scroll-smooth',
    // モバイル: 1枚中央表示 (カード幅75vw、左右12.5vw)
    'pl-[12.5vw] pr-[12.5vw]',
    // PC: 3枚表示 (カード幅28vw、左右36vw)
    'md:pl-[36vw] md:pr-[36vw]',
    'hidden-scrollbar',
    '[-webkit-overflow-scrolling:touch]',
  ].join(' '),
  cardWrapper: [
    'flex-shrink-0',
    'w-[75vw]',       // モバイル: 画面幅の75%
    'md:w-[28vw]',    // PC: 画面幅の28% (3枚表示用)
    'snap-center',
    'px-1 py-8',
  ].join(' '),
  cardOuter: 'rounded-xl transition-all duration-300',
  cardSelected: 'ring-4 ring-accentOrange z-10',
};

/**
 * ループ式カードカルーセル
 * - scroll-snap でスナップスクロール
 * - クローン要素による無限ループ
 * - 選択フィーチャーを中央に表示
 * - スクロール停止時に中央カードのフィーチャーを親に通知
 */
export const NeiCardCarousel: FC<Props> = ({
  features,
  selectedFeature,
  onExpand,
  onFeatureChange,
  onDeselect,
}) => {
  const count = features.length;

  const { scrollRef, handleScroll, handleWheel, extendedFeatures } = useCardCarouselScroll({
    features,
    selectedFeature,
    onFeatureChange,
  });

  const { onTouchStart, onTouchMove, onTouchEnd, dragDeltaY } = useSwipe({
    onSwipeUp: onExpand,
    onSwipeDown: onDeselect,
    disableLeftSwipe: true,
    disableRightSwipe: true,
  });

  if (count === 0) return null;

  const renderCard = (feature: FeatureType, isSelected: boolean) => (
    <motion.div
      className={`${style.cardOuter} ${isSelected ? style.cardSelected : ''}`}
      animate={{
        scale: isSelected ? 1.05 : 0.95,
        opacity: isSelected ? 1 : 0.8,
        y: isSelected ? dragDeltaY : 0,
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      transition={
        isSelected && dragDeltaY !== 0
          ? { type: 'tween' as const, duration: 0, scale: { type: 'spring' as const, stiffness: 300, damping: 30 }, opacity: { type: 'spring' as const, stiffness: 300, damping: 30 } }
          : { type: 'spring' as const, stiffness: 300, damping: 30 }
      }
    >
      <NeiCompactCard
        feature={feature}
        isSelected={isSelected}
        onExpand={onExpand}
        onClick={isSelected ? onExpand : () => onFeatureChange(feature)}
      />
    </motion.div>
  );

  return (
    <div className="flex flex-col w-full">
      <div
        ref={scrollRef}
        className={`${style.container} translate-y-5`}
        onScroll={handleScroll}
        onWheel={handleWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {
          extendedFeatures.map((feature, index) => (
            <div
              key={`carousel-${index}-${feature.id}`}
              className={style.cardWrapper}
            >
              {renderCard(feature, feature.id === selectedFeature?.id)}
            </div>
          ))
        }
      </div>
      <NeiCustomScrollbar containerRef={scrollRef} />
    </div >
  );
};
