import { useEffect, useState } from 'react';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Map } from 'ol';
import { addGeoparkFeature } from '../utils/addFeature';

// 既存のジオパークレイヤーを取得する関数
const findGeoparkLayer = (map: Map) =>
  map
    .getLayers()
    .getArray()
    .find((layer) => layer.get('type') === 'geopark') as
    | VectorLayer<VectorSource>
    | undefined;

// 新しいジオパークレイヤーを作成して追加する関数
const addGeoparkLayer = (map: Map) => {
  const vectorSource = new VectorSource();
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    properties: { type: 'geopark' },
  });
  addGeoparkFeature(map, vectorSource);
  map.addLayer(vectorLayer);
};

export const useGeoparkLayerVisibility = (map: Map | null) => {
  const [isGeoparkVisible, setIsGeoparkVisible] = useState(false);
  
  useEffect(() => {
    if (!map) return;

    const existingGeoparkLayer = findGeoparkLayer(map);

    if (isGeoparkVisible && !existingGeoparkLayer) {
      addGeoparkLayer(map);
    } else if (!isGeoparkVisible && existingGeoparkLayer) {
      map.removeLayer(existingGeoparkLayer);
    }
  }, [isGeoparkVisible, map]);

  return { isGeoparkVisible, setIsGeoparkVisible };
};
