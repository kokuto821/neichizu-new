import { useEffect, useState, useRef, RefObject } from "react";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import { gsi, layers, osm } from "../utils/layers";
import TileLayer from "ol/layer/Tile";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { addFeature } from "../utils/addFeature";

type BaseLayerConfig = {
  name: string;
  layer: TileLayer;
};

export const useInitializeMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>(new Map());
  const [baseLayers, setBaseLayers] = useState<BaseLayerConfig[]>([]);
  const [activeLayer, setActiveLayer] = useState("gsi");
  const [center] = useState<[number, number]>([139, 35]); // 初期中心座標

  useEffect(() => {
    if (!mapRef.current) return;

    // vectorレイヤーの追加
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      properties: { type: "vector" },
    });
    addFeature(map, vectorSource);

    // Map インスタンスの生成
    const initializedMap = new Map({
      target: mapRef.current,
      layers: [gsi, osm, vectorLayer],
      view: new View({
        center: fromLonLat(center),
        zoom: 5.5,
      }),
      controls: defaultControls({ zoom: false }),
    });

    setMap(initializedMap);

    setBaseLayers([
      { name: "gsi", layer: gsi },
      { name: "osm", layer: osm },
    ]);

    // クリーンアップ: マップのターゲットを解除
    return () => {
      initializedMap.setTarget(undefined);
    };
  }, []);

  // レイヤー切り替え処理
  const switchBaseLayer = (layerName: string) => {
    if (!map) return;

    map.getLayers().forEach((layer) => {
      if (layer instanceof TileLayer && layer.get("name")) {
        const isVisible = layer.get("name") === layerName;
        layer.setVisible(isVisible);
      }
    });

    setActiveLayer(layerName);
  };

  return {
    map,
    mapRef,
    setMap,
    setActiveLayer,
    activeLayer,
    switchBaseLayer,
    baseLayers,
  };
};
