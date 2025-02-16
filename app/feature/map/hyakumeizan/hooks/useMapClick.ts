import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { FeatureProperties } from '../types/types';
import { Map, MapBrowserEvent } from 'ol';
import Point from 'ol/geom/Point';
import Feature, { FeatureLike } from 'ol/Feature';

// 型ガード関数
const isFeature = (feature: FeatureLike): feature is Feature => {
  return feature instanceof Feature;
};

export const useMapClick = (
  map: Map | null,
  setSelectedFeature: Dispatch<SetStateAction<FeatureProperties | null>>,
  setIsVisible: Dispatch<SetStateAction<boolean>>
) => {
  const handleMapClick = useCallback(
    (event: MapBrowserEvent<UIEvent>) => {
      if (!map) return;

      // 地図上で選択されたフィーチャー情報を定義
      const clickedFeature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );

      if (!clickedFeature) {
        setSelectedFeature(null);
        setIsVisible(false);
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
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    },
    [map, setSelectedFeature, setIsVisible]
  );

  useEffect(() => {
    if (!map) return;
    map.on('click', handleMapClick);
    return () => {
      map.un('click', handleMapClick);
      map.setTarget(undefined);
    };
  }, [map, handleMapClick]);

  return null;
};
