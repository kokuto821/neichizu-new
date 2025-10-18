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
const findLayer = (map: Map, layerType: string) =>
  map
    .getLayers()
    .getArray()
    .find((layer) => layer.get('type') === layerType) as
    | VectorLayer<VectorSource>
    | undefined;

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
  }, [isVisible, map, layerType, addFeatures]);

  return { isVisible, setIsVisible };
};
