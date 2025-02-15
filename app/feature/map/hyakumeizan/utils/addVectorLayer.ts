import { Map } from "ol";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { addFeature } from "./addFeature";

type Props = {
  map: Map;
};

export const addVectorLayer = async ({ map }: Props) => {
  // レイヤーとデータの読み込み
  const vectorSource = new VectorSource();
  const vectorIconLayer = new VectorLayer({ source: vectorSource });
  addFeature(map, vectorSource);
  map.addLayer(vectorIconLayer);
};
