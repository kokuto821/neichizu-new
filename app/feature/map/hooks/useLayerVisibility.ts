import { useEffect, useState } from 'react';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Map } from 'ol';

type UseLayerVisibilityProps = {
  map: Map | null;
  layerType: string;
  addFeatures: (map: Map, vectorSource: VectorSource) => Promise<void>;
  initialVisible?: boolean;
};

// 既存のレイヤーを取得する関数
const findLayer = (map: Map, layerType: string) => {
  const layers = map.getLayers().getArray();
  const found = layers.find((layer) => {
    const type = layer.get('type');
    return type === layerType;
  }) as VectorLayer<VectorSource> | undefined;
  return found;
};

// 新しいレイヤーを作成して追加する関数
const addLayer = async (
  map: Map,
  layerType: string,
  addFeatures: (map: Map, vectorSource: VectorSource) => Promise<void>
) => {
  const vectorSource = new VectorSource();
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    properties: { type: layerType },
  });
  await addFeatures(map, vectorSource);
  map.addLayer(vectorLayer);
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
