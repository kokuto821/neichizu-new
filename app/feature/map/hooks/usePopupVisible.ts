import { useState, useEffect, useRef, useCallback } from 'react';
import { WGeoparkFromSelected } from '../types/geoparkTypes';
import { HyakumeizanFromSelected } from '../types/hyakumeizanTypes';

export const FADE_IN_DELAY = 500;
export const FADE_OUT_DURATION = 300;

export const usePopupVisible = (
  selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null,
  options?: { fadeInDelay?: number; fadeOutDuration?: number }
) => {
  const fadeInDelay = options?.fadeInDelay ?? 0;
  const fadeOutDuration = options?.fadeOutDuration ?? 0;

  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [displayFeature, setDisplayFeature] = useState<
    HyakumeizanFromSelected | WGeoparkFromSelected | null
  >(null);
  const previousFeature = useRef<
    HyakumeizanFromSelected | WGeoparkFromSelected | null
  >(null);

  // フィーチャ選択時の処理
  const handleFeatureSelect =useCallback( (
    feature: HyakumeizanFromSelected | WGeoparkFromSelected
  ) => {
    previousFeature.current = feature;
    setDisplayFeature(feature);
    setShouldRender(true);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, fadeInDelay);

    return () => clearTimeout(timer);
  }, [fadeInDelay]);

  // フィーチャ解除時の処理
  const handleFeatureDeselect = useCallback(() => {
    const timer = setTimeout(() => {
      setShouldRender(false);
      setDisplayFeature(null);
      previousFeature.current = null;
    }, fadeOutDuration);

    return () => clearTimeout(timer);
  }, [fadeOutDuration]);

  useEffect(() => {
    setIsVisible(false);

    if (selectedFeature) {
      return handleFeatureSelect(selectedFeature);
    } else {
      return handleFeatureDeselect();
    }
  }, [handleFeatureDeselect, handleFeatureSelect, selectedFeature]);

  return { isVisible, shouldRender, displayFeature };
};
