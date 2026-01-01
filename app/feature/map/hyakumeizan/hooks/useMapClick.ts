import { useCallback, useEffect, useState } from 'react';
import { Map, MapBrowserEvent } from 'ol';
import Point from 'ol/geom/Point';
import Feature, { FeatureLike } from 'ol/Feature';
import { CombinedFeatureProperties } from '../../types/types';

// 型ガード関数
const isFeature = (feature: FeatureLike): feature is Feature => {
  return feature instanceof Feature;
};

export const useMapClick = (map: Map | null) => {
  const [selectedFeature, setSelectedFeature] =
    useState<CombinedFeatureProperties | null>(null);
  const [isFeatureClick, setIsFeatureClick] = useState<boolean>(false);
  const handleMapClick = useCallback(
    (event: MapBrowserEvent) => {
      if (!map) return;

      // ピクセル位置からフィーチャーを取得
      const clickedFeature = map.forEachFeatureAtPixel(event.pixel, (f) => f);

      // フィーチャーがなければ状態リセット
      if (!clickedFeature || !isFeature(clickedFeature)) {
        setIsFeatureClick(true);
        setSelectedFeature(null);
        return;
      }

      // プロパティ取得
      const properties = clickedFeature.getProperties();
      setSelectedFeature({
        geometry: properties.geometry,
        name: properties.name,
        height: properties.height,
        googlemaplink: properties.googlemaplink,
        YAMAP: properties.YAMAP,
        image: properties.image,
        area: properties.area,
        // ジオパーク用のプロパティ
        category: properties.category,
        comment: properties.comment,
        website: properties.website,
      });

      // geometryがPoint型なら地図を移動
      if (properties.geometry instanceof Point) {
        const coordinate = properties.geometry.getCoordinates();
        map.getView().animate({ center: coordinate, duration: 500 });
      }

      setIsFeatureClick(true);
    },
    [map, setSelectedFeature, setIsFeatureClick]
  );

  useEffect(() => {
    if (!map) return;
    map.on('click', handleMapClick);
    return () => {
      map.un('click', handleMapClick);
      map.setTarget(undefined);
    };
  }, [map, handleMapClick]);

  return {
    selectedFeature,
    setSelectedFeature,
    isFeatureClick,
    setIsFeatureClick,
  };
};
