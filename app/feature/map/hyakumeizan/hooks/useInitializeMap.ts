import { useEffect, useState, useRef, RefObject } from "react";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import { gsi } from "../utils/layers";
import { addVectorLayer } from "../utils/addVectorLayer";

export const useInitializeMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>(new Map());
  const [center] = useState<[number, number]>([139, 35]); // 初期中心座標

  useEffect(() => {
    if (!mapRef.current) return;

    // Map インスタンスの生成
    const initializedMap = new Map({
      target: mapRef.current,
      layers: [gsi],
      view: new View({
        center: fromLonLat(center),
        zoom: 5.5,
      }),
      controls: defaultControls({ zoom: false }),
    });

    // レイヤーの追加
    addVectorLayer({ map: initializedMap });

    setMap(initializedMap);

    // クリーンアップ: マップのターゲットを解除
    return () => {
      initializedMap.setTarget(undefined);
    };
  }, []);

  return { map, mapRef, setMap };
};
