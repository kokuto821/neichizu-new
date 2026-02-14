import { FC } from 'react';
import { GeoparkFeatureContent } from './GeoparkFeatureContent';
import { MountainFeatureContent } from './MountainFeatureContent';
import { motion } from 'framer-motion';
import { FeatureType, isHyakumeizan, isWGeopark } from '@/app/feature/map/utils/featureUtils';
import { useCardCarouselScroll } from '@/app/feature/map/hooks/useCardCarouselScroll';
import { useCardSwipe } from '@/app/feature/map/hooks/useCardSwipe';

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
    'pb-2',
  ].join(' '),
  cardWrapper: [
    'flex-shrink-0',
    'w-[85%]',
    'snap-center',
    'p-3', // ring用の余白
  ].join(' '),
  cardOuter: 'rounded-xl', // ringはこの外側ラッパーに付与
  card: 'flex items-center bg-ecruWhite rounded-xl shadow-md overflow-hidden cursor-pointer',
  cardImage: 'aspect-square h-[12.5vh] flex-shrink-0 rounded-l-xl object-cover block',
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

  const { scrollRef, handleScroll, extendedFeatures } = useCardCarouselScroll({
    features,
    selectedFeature,
    onFeatureChange,
  });

  const { handleTouchStart, handleTouchEnd } = useCardSwipe({
    onExpand,
    onDeselect,
  });

  if (count === 0) return null;

  const renderCard = (feature: FeatureType, isSelected: boolean) => (
    <motion.div
      className={`${style.cardOuter} ${isSelected ? 'ring-4 ring-accentOrange' : ''}`}
      animate={{ scale: isSelected ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={style.card}
        onClick={isSelected ? onExpand : () => onFeatureChange(feature)}
      >
        {feature.image && (
          <img
            className={style.cardImage}
            src={feature.image}
            alt={feature.name}
          />
        )}
        <div className="flex flex-1 flex-col pt-[2px] pr-0 pb-[2px] pl-[10px] min-w-0">
          {isWGeopark(feature) ? (
            <GeoparkFeatureContent
              name={feature.name}
              area={feature.area}
            />
          ) : isHyakumeizan(feature) ? (
            <MountainFeatureContent
              name={feature.name}
              area={feature.area}
              height={feature.height}
            />
          ) : null}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div
      ref={scrollRef}
      className={style.container}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        scrollPaddingLeft: '7.5%',
        scrollPaddingRight: '7.5%',
        paddingLeft: '7.5%',
        paddingRight: '7.5%',
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {extendedFeatures.map((feature, index) => (
        <div
          key={`carousel-${index}-${feature.id}`}
          className={style.cardWrapper}
        >
          {renderCard(feature, feature.id === selectedFeature?.id)}
        </div>
      ))}
    </div>
  );
};
