import { useState, useEffect } from 'react';
import { FeatureProperties } from '../types/types';

export const usePopupVisible = (selectedFeature: FeatureProperties | null) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // まず非表示にする（フィーチャ切り替え時の対応）
    setIsVisible(false);

    if (selectedFeature) {
      // 0.5秒後に表示
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [selectedFeature]);

  return { isVisible };
};
