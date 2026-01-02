import { useState, useEffect, useRef } from 'react';
import { WGeoparkFromSelected } from '../../geopark/types/types';
import { HyakumeizanFromSelected } from '../types/types';

const FADE_IN_DELAY = 500;
const FADE_OUT_DURATION = 300;

export const usePopupVisible = (
  selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null
) => {
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
    }, FADE_IN_DELAY);

    return () => clearTimeout(timer);
  };

  // フィーチャ解除時の処理
  const handleFeatureDeselect = () => {
    const timer = setTimeout(() => {
      setShouldRender(false);
      setDisplayFeature(null);
      previousFeature.current = null;
    }, FADE_OUT_DURATION);

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
