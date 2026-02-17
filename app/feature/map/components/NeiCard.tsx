import { FC, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeiCardCarousel } from './NeiCardCarousel';
import { NeiExpandedCard } from './NeiExpandedCard';
import { WGeoparkFromSelected } from '@/app/feature/map/types/geoparkTypes';
import { HyakumeizanFromSelected } from '@/app/feature/map/types/hyakumeizanTypes';
import { Map } from 'ol';
import { useFeatureNavigation } from '@/app/feature/map/hooks/useFeatureNavigation';
import { useMapCenter } from '@/app/feature/map/hooks/useMapCenter';

type FeatureType = HyakumeizanFromSelected | WGeoparkFromSelected;

type Props = {
  selectedFeature: FeatureType | null;
  map: Map | null;
  onFeatureChange: (feature: FeatureType | null) => void;
  onSwipeLoadingChange?: (loading: boolean) => void;
};

// カルーセル表示/非表示アニメーション
const carouselVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  exit: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

export const NeiCard: FC<Props> = ({ selectedFeature, map, onFeatureChange, onSwipeLoadingChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // フィーチャナビゲーション（全フィーチャーリスト取得用）
  const { canGoPrev, canGoNext, goToNext, goToPrev, typedFeatures } = useFeatureNavigation(
    map,
    selectedFeature
  );

  // 地図の自動追従
  useMapCenter(map, selectedFeature);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  // カルーセルのスクロールでフィーチャーが変わった時
  const handleCarouselFeatureChange = useCallback((feature: FeatureType) => {
    onFeatureChange(feature);
  }, [onFeatureChange]);

  // 次のフィーチャへ移動（NeiExpandedCard用）
  const handleGoNext = useCallback(() => {
    const nextFeature = goToNext();
    if (nextFeature) {
      onSwipeLoadingChange?.(true);
      setSwipeDirection('left');
      setTimeout(() => {
        onFeatureChange(nextFeature);
        setSwipeDirection(null);
      }, 300);
    }
  }, [goToNext, onFeatureChange, onSwipeLoadingChange]);

  // 前のフィーチャへ移動（NeiExpandedCard用）
  const handleGoPrev = useCallback(() => {
    const prevFeature = goToPrev();
    if (prevFeature) {
      onSwipeLoadingChange?.(true);
      setSwipeDirection('right');
      setTimeout(() => {
        onFeatureChange(prevFeature);
        setSwipeDirection(null);
      }, 300);
    }
  }, [goToPrev, onFeatureChange, onSwipeLoadingChange]);

  const handleDeselect = useCallback(() => {
    onFeatureChange(null);
  }, [onFeatureChange]);

  const showCarousel = !isExpanded && typedFeatures.length > 0 && !!selectedFeature;

  return (
    <>
      <AnimatePresence>
        {showCarousel && (
          <motion.div
            key="carousel"
            className="w-full"
            variants={carouselVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <NeiCardCarousel
              features={typedFeatures}
              selectedFeature={selectedFeature}
              onExpand={handleExpand}
              onFeatureChange={handleCarouselFeatureChange}
              onDeselect={handleDeselect}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <NeiExpandedCard
        selectedFeature={selectedFeature}
        isExpanded={isExpanded}
        onClose={handleClose}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        onGoNext={handleGoNext}
        onGoPrev={handleGoPrev}
        swipeDirection={swipeDirection}
      />
    </>
  );
};