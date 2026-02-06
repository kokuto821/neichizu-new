import { useEffect } from 'react';
import { Map } from 'ol';
import { fromLonLat } from 'ol/proj';
import { HyakumeizanFromSelected } from '@/app/feature/map/hyakumeizan/types/types';
import { WGeoparkFromSelected } from '@/app/feature/map/geopark/types/types';
import Point from 'ol/geom/Point';
import { Geometry } from 'ol/geom';

type FeatureType = HyakumeizanFromSelected | WGeoparkFromSelected;

/**
 * 選択されたフィーチャの中心に地図を移動させるフック
 */
export const useMapCenter = (
  map: Map | null,
  selectedFeature: FeatureType | null
) => {
  useEffect(() => {
    if (!map || !selectedFeature) return;

    const geometry = selectedFeature.geometry;
    let centerCoordinates: number[] | null = null;

    if (geometry instanceof Point) {
      centerCoordinates = geometry.getCoordinates();
    } else if (geometry) {
      // Point以外（Polygonなど）の場合はExtentの中心を取得
      const extent = geometry.getExtent();
      centerCoordinates = [
        (extent[0] + extent[2]) / 2,
        (extent[1] + extent[3]) / 2,
      ];
    }

    if (centerCoordinates) {
      map.getView().animate({
        center: centerCoordinates,
        duration: 500, // アニメーション時間
      });
    }
  }, [map, selectedFeature]);
};
