import { useEffect, useState } from 'react';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Map } from 'ol';
import { addHyakumeizanFeature } from '../utils/addHyakumeizanFeature';

// 既存のベクターレイヤーを取得する関数
const findVectorLayer = (map: Map) =>
  map
    .getLayers()
    .getArray()
    .find((layer) => layer.get('type') === 'vector') as
    | VectorLayer<VectorSource>
    | undefined;

// 新しいベクターレイヤーを作成して追加する関数
const addVectorLayer = (map: Map) => {
  const vectorSource = new VectorSource();
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    properties: { type: 'vector' },
  });
  addHyakumeizanFeature(map, vectorSource);
  map.addLayer(vectorLayer);
};

export const useVectorLayerVisibility = (map: Map | null) => {
  const [isVectorVisible, setIsVectorVisible] = useState(true);
  useEffect(() => {
    if (!map) return;

    const existingVectorLayer = findVectorLayer(map);

    if (isVectorVisible && !existingVectorLayer) {
      addVectorLayer(map);
    } else if (!isVectorVisible && existingVectorLayer) {
      map.removeLayer(existingVectorLayer);
    }
  }, [isVectorVisible, map]);

  return { isVectorVisible, setIsVectorVisible };
};
