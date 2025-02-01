import { Map } from "ol";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { addFeature } from "./addFeature";

type Props = {
  map: Map;
};

export const addLayer = async ({ map }: Props) => {
  // 山データを追加

  // レイヤーとデータの読み込み
  const vectorSource = new VectorSource();
  const vectorLayer = new VectorLayer({ source: vectorSource });
  addFeature(map, vectorSource);
  map.addLayer(vectorLayer);
};
