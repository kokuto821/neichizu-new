import { FC, useState, useCallback, useEffect } from 'react';
import { NeiCompactCard } from './NeiCompactCard';
import { NeiExpandedCard } from './NeiExpandedCard';
import { WGeoparkFromSelected } from '@/app/feature/map/geopark/types/types';
import { HyakumeizanFromSelected } from '@/app/feature/map/hyakumeizan/types/types';
import { Map } from 'ol';
import { useFeatureNavigation } from '@/app/feature/map/hyakumeizan/hooks/useFeatureNavigation';
import { useMapCenter } from '@/app/feature/map/hooks/useMapCenter';

type Props = {
  selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null;
  map: Map | null;
  onFeatureChange: (feature: HyakumeizanFromSelected | WGeoparkFromSelected | null) => void;
  onSwipeLoadingChange?: (loading: boolean) => void;
};

export const NeiCard: FC<Props> = ({ selectedFeature, map, onFeatureChange, onSwipeLoadingChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // フィーチャナビゲーション
  const { canGoPrev, canGoNext, goToNext, goToPrev } = useFeatureNavigation(
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

  const handleDeselect = () => {
    onFeatureChange(null);
  };

  // 次のフィーチャへ移動
  const handleGoNext = useCallback(() => {
    const nextFeature = goToNext();
    if (nextFeature) {
      onSwipeLoadingChange?.(true);
      setSwipeDirection('left');
      // アニメーション後にフィーチャ変更
      setTimeout(() => {
        onFeatureChange(nextFeature);
        setSwipeDirection(null);
      }, 300);
    }
  }, [goToNext, onFeatureChange, onSwipeLoadingChange]);

  // 前のフィーチャへ移動
  const handleGoPrev = useCallback(() => {
    const prevFeature = goToPrev();
    if (prevFeature) {
      onSwipeLoadingChange?.(true);
      setSwipeDirection('right');
      // アニメーション後にフィーチャ変更
      setTimeout(() => {
        onFeatureChange(prevFeature);
        setSwipeDirection(null);
      }, 300);
    }
  }, [goToPrev, onFeatureChange, onSwipeLoadingChange]);


  return (
    <>
      {!isExpanded && (
        <NeiCompactCard 
          selectedFeature={selectedFeature} 
          onExpand={handleExpand}
          onSwipeLeft={canGoNext ? handleGoNext : undefined}
          onSwipeRight={canGoPrev ? handleGoPrev : undefined}
          onDeselect={handleDeselect}
          swipeDirection={swipeDirection}
        />
      )}
      <NeiExpandedCard
        selectedFeature={selectedFeature}
        isExpanded={isExpanded}
        onClose={handleClose}
        map={map}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        onGoNext={handleGoNext}
        onGoPrev={handleGoPrev}
        swipeDirection={swipeDirection}
      />
    </>
  );
};