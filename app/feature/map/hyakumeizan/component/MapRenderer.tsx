import { useRef, useEffect, useState } from "react";
import "ol/ol.css";
import { FeatureProperties } from "../types/types";
import Map from "ol/Map";
import { initializeMap } from "../utils/initializeMap";
import { useMapClick } from "../hooks/useMapClick";

interface MapRendererProps {
  setSelectedFeature: React.Dispatch<
    React.SetStateAction<FeatureProperties | null>
  >;
}

export const MapRenderer: React.FC<MapRendererProps> = ({
  setSelectedFeature,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [center] = useState<[number, number]>([139, 35]); // 初期中心座標

  // マップの初期化
  useEffect(() => {
    if (!mapRef.current) return; // マップが既に存在する場合は初期化しない

    const initializedMap: Map = initializeMap(mapRef.current, center);
    setMap(initializedMap);

    // クリーンアップ関数
    return () => {
      if (initializedMap) {
        initializedMap.setTarget(undefined); // マップのターゲットを解除
      }
    };
  }, [center]);

  useMapClick(map, setSelectedFeature);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
};

export default MapRenderer;
