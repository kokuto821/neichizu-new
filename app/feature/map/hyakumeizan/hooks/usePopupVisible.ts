import { useState, useEffect, use, useCallback } from 'react';
import { FeatureProperties } from '../types/types';

export const usePopupVisible = (selectedFeature: FeatureProperties | null) => {
  const [isVisible, setIsVisible] = useState(false); // 表示状態を管理するステート

  const handleVisible = useCallback(() => {
    if (selectedFeature) {
      // 0.5秒後に表示状態をtrueにする
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);

      // クリーンアップ関数でタイマーをクリア
      return () => {
        clearTimeout(timer);
        setIsVisible(false); // 表示状態をリセット
      };
    } else {
      setIsVisible(false); // selectedFeatureがnullの場合は非表示
    }
  }, [selectedFeature]); // クリックイベントのハンドラ

  useEffect(() => {
    const cleanup = handleVisible();
    return cleanup;
  }, [selectedFeature]);

  return { isVisible }; // isVisibleを返す
};
