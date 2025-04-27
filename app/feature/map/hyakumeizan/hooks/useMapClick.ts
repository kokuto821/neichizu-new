import { useCallback, useEffect, useState } from 'react';
import { FeatureProperties } from '../types/types';
import { Map, MapBrowserEvent } from 'ol';
import Point from 'ol/geom/Point';
import Feature, { FeatureLike } from 'ol/Feature';

// 型ガード関数
const isFeature = (feature: FeatureLike): feature is Feature => {
  return feature instanceof Feature;
};

export const useMapClick = (map: Map | null) => {
  const [selectedFeature, setSelectedFeature] =
    useState<FeatureProperties | null>(null);
  const [isFeatureClick, setIsFeatureClick] = useState<boolean>(false);
  const handleMapClick = useCallback(
    (event: MapBrowserEvent<UIEvent>) => {
      if (!map) return;

      // 地図上で選択されたフィーチャー情報を定義
      const clickedFeature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );

      if (!clickedFeature) {
        setIsFeatureClick(true);
        setSelectedFeature(null);
        return;
      }

      if (isFeature(clickedFeature)) {
        const properties = clickedFeature.getProperties();
        setSelectedFeature({
          geometry: properties.geometry,
          name: properties.name,
          height: properties.height,
          googlemaplink: properties.googlemaplink,
          YAMAP: properties.YAMAP,
          image: properties.image,
          area: properties.area,
        });

        // フィーチャーの中心座標に地図を移動
        const geometry = properties.geometry;
        if (!(geometry instanceof Point)) return;
        const coordinate = geometry.getCoordinates();
        map.getView().animate({ center: coordinate, duration: 500 });
        setIsFeatureClick(true);
      }
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
