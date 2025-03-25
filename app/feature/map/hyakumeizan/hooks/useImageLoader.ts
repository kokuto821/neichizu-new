import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { FeatureProperties } from '../types/types';

export const useImageLoader = (
  selectedFeature: FeatureProperties | null,
  setIsFeatureClick: Dispatch<SetStateAction<boolean>>
) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setIsImageLoaded(false);

    if (selectedFeature?.image) {
      const img = new Image();
      imgRef.current = img;
      img.src = selectedFeature.image;
      img.onload = () => {
        setIsImageLoaded(true);
      };
      img.onerror = () => {
        setIsImageLoaded(true); // エラー時も読み込み完了扱い
        setIsFeatureClick(false);
      };
    } else {
      setIsImageLoaded(true); // 画像がない場合は即時完了
      setIsFeatureClick(false);
    }

    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null;
        imgRef.current.onerror = null;
      }
    };
  }, [selectedFeature?.image, setIsFeatureClick]);

  return { isImageLoaded };
};
