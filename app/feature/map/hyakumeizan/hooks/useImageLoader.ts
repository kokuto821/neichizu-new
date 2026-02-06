import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { HyakumeizanFromSelected } from '../types/types';
import { WGeoparkFromSelected } from '../../geopark/types/types';

export const useImageLoader = (
  selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null,
  onLoadingComplete: (value: boolean) => void
) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  /**
   * 画像をロードする関数
   */
  const loadImage = useCallback(() => {
    setIsImageLoaded(false);

    // クリーンアップ
    const cleanup = () => {
      if (imgRef.current) {
        imgRef.current.onload = null;
        imgRef.current.onerror = null;
      }
    };

    if (!selectedFeature) {
      setIsImageLoaded(true);
      onLoadingComplete(false);
      return cleanup;
    }

    if (selectedFeature.image) {
      const img = new Image();
      imgRef.current = img;
      img.src = selectedFeature.image;

      img.onload = () => {
        setIsImageLoaded(true);
        setTimeout(() => {
          onLoadingComplete(false);
        }, 700);
      };

      img.onerror = () => {
        setIsImageLoaded(true);
        onLoadingComplete(false);
      };
    } else {
      setIsImageLoaded(true);
      onLoadingComplete(false);
    }

    return cleanup;
  }, [selectedFeature, onLoadingComplete]);

  /** 初回レンダリング時と selectedFeature が変更されたときに loadImage を実行 */
  useEffect(() => {
    const cleanup = loadImage();
    return cleanup;
  }, [loadImage]);

  return { isImageLoaded };
};
