import { useCallback, useEffect, useState } from 'react';
import { Map, MapBrowserEvent } from 'ol';
import Point from 'ol/geom/Point';
import Feature, { FeatureLike } from 'ol/Feature';
import { WGeoparkFromSelected } from '../types/geoparkTypes';
import { HyakumeizanFromSelected } from '../types/hyakumeizanTypes';

// 型ガード関数
const isFeature = (feature: FeatureLike): feature is Feature => {
  return feature instanceof Feature;
};

type Props = {
  map: Map | null;
  onClickLoading?: (loading: boolean) => void;
};

export const useMapClick = ({ map, onClickLoading }: Props) => {
  const [selectedFeature, setSelectedFeature] = useState<
    HyakumeizanFromSelected | WGeoparkFromSelected | null
  >(null);

  const handleMapClick = useCallback(
    (event: MapBrowserEvent) => {
      if (!map) return;

      // ピクセル位置からフィーチャーを取得
      const clickedFeature = map.forEachFeatureAtPixel(event.pixel, (f) => f);

      // フィーチャーがなければ状態リセット
      if (!clickedFeature || !isFeature(clickedFeature)) {
        onClickLoading?.(true);
        setSelectedFeature(null);
        return;
      }

      // プロパティ取得
      const properties = clickedFeature.getProperties();

      const worldGeoparkSelectedFeature: WGeoparkFromSelected = {
        geometry: properties.geometry,
        id: properties.id,
        category: properties.category,
        name: properties.name,
        area: properties.area,
        googlemaplink: properties.googlemaplink,
        comment: properties.comment,
        website: properties.website,
        image: properties.image,
      };

      const hyakumeizanSelectedFeature: HyakumeizanFromSelected = {
        geometry: properties.geometry,
        id: properties.id,
        category: properties.category,
        name: properties.name,
        area: properties.area,
        height: properties.height,
        googlemaplink: properties.googlemaplink,
        image: properties.image,
        YAMAP: properties.YAMAP,
      };

      const category = properties.category;
      if (category === 'world_geopark') {
        setSelectedFeature(worldGeoparkSelectedFeature);
        console.log('Geopark feature clicked:', properties.geometry);
      } else if (category === 'hyakumeizan') {
        setSelectedFeature(hyakumeizanSelectedFeature);
      } else {
        return;
      }

      // geometryがPoint型なら地図を移動
      if (properties.geometry instanceof Point) {
        const coordinate = properties.geometry.getCoordinates();
        map.getView().animate({ center: coordinate, duration: 500 });
      }

      onClickLoading?.(true);
    },
    [map, setSelectedFeature, onClickLoading]
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
  };
};
