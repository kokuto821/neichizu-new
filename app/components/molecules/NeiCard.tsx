import { FC, useState, useCallback } from 'react';
import { NeiCardCarousel } from './NeiCardCarousel';
import { NeiExpandedCard } from './NeiExpandedCard';
import { WGeoparkFromSelected } from '@/app/feature/map/geopark/types/types';
import { HyakumeizanFromSelected } from '@/app/feature/map/hyakumeizan/types/types';
import { Map } from 'ol';
import { useFeatureNavigation } from '@/app/feature/map/hyakumeizan/hooks/useFeatureNavigation';
import { useMapCenter } from '@/app/feature/map/hooks/useMapCenter';

type FeatureType = HyakumeizanFromSelected | WGeoparkFromSelected;

type Props = {
  selectedFeature: FeatureType | null;
  map: Map | null;
  onFeatureChange: (feature: FeatureType | null) => void;
  onSwipeLoadingChange?: (loading: boolean) => void;
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

  return (
    <>
      {!isExpanded && typedFeatures.length > 0 && selectedFeature && (
        <NeiCardCarousel
          features={typedFeatures}
          selectedFeature={selectedFeature}
          onExpand={handleExpand}
          onFeatureChange={handleCarouselFeatureChange}
          onDeselect={handleDeselect}
        />
      )}
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