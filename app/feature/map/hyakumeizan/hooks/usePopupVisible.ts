import { useState, useEffect, useRef } from 'react';
import { FeatureProperties } from '../types/types';

export const usePopupVisible = (selectedFeature: FeatureProperties | null) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [displayFeature, setDisplayFeature] = useState<FeatureProperties | null>(null);
  const previousFeature = useRef<FeatureProperties | null>(null);

  useEffect(() => {
    // まず非表示にする（フィーチャ切り替え時の対応）
    setIsVisible(false);

    if (selectedFeature) {
      // 新しいフィーチャが選択された
      previousFeature.current = selectedFeature;
      setDisplayFeature(selectedFeature);
      setShouldRender(true);
      
      // 0.5秒後に表示
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    } else {
      // selectedFeatureがnullになったら、フェードアウト後にアンマウント
      // フェードアウト中は前のデータを表示し続ける
      const timer = setTimeout(() => {
        setShouldRender(false);
        setDisplayFeature(null);
        previousFeature.current = null;
      }, 300); // transition-opacity duration-300と同じ

      return () => {
        clearTimeout(timer);
      };
    }
  }, [selectedFeature]);

  return { isVisible, shouldRender, displayFeature };
};
