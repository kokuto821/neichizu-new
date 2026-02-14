import { useState, useEffect, useRef } from 'react';
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
  const handleFeatureSelect = (
    feature: HyakumeizanFromSelected | WGeoparkFromSelected
  ) => {
    previousFeature.current = feature;
    setDisplayFeature(feature);
    setShouldRender(true);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, fadeInDelay);

    return () => clearTimeout(timer);
  };

  // フィーチャ解除時の処理
  const handleFeatureDeselect = () => {
    const timer = setTimeout(() => {
      setShouldRender(false);
      setDisplayFeature(null);
      previousFeature.current = null;
    }, fadeOutDuration);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    setIsVisible(false);

    if (selectedFeature) {
      return handleFeatureSelect(selectedFeature);
    } else {
      return handleFeatureDeselect();
    }
  }, [selectedFeature]);

  return { isVisible, shouldRender, displayFeature };
};
