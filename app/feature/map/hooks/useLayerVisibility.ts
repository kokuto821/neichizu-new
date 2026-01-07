import { useEffect, useState } from 'react';
import VectorSource from 'ol/source/Vector';
import { Map } from 'ol';
import { addLayer, findLayer } from '../shared/addFeatureUtils';

type UseLayerVisibilityProps = {
  map: Map | null;
  layerType: string;
  addFeatures: (vectorSource: VectorSource) => Promise<void>;
  initialVisible?: boolean;
};

export const useLayerVisibility = ({
  map,
  layerType,
  addFeatures,
  initialVisible = false,
}: UseLayerVisibilityProps) => {
  const [isVisible, setIsVisible] = useState(initialVisible);

  useEffect(() => {
    if (!map) return;
    const existingLayer = findLayer(map, layerType);
    if (isVisible && !existingLayer) {
      addLayer(map, layerType, addFeatures);
    } else if (!isVisible && existingLayer) {
      map.removeLayer(existingLayer);
    }
    // addFeaturesは依存配列から除外（外部関数なので変更されない）
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, map, layerType]);

  return { isVisible, setIsVisible };
};
