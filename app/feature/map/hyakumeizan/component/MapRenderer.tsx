import { useRef, useEffect, useState, useCallback } from "react";
import "ol/ol.css";
import { FeatureProperties } from "../types/types";
import { Pixel } from "ol/pixel";
import Map from "ol/Map";
import { initializeMap } from "../utils/InitializeMap";

interface MapRendererProps {
  setSelectedFeature: React.Dispatch<React.SetStateAction<FeatureProperties | null>>;
}

export const MapRenderer: React.FC<MapRendererProps> = ({ setSelectedFeature }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [center] = useState<[number, number]>([139, 35]); // 初期中心座標

  // マップの初期化
  useEffect(() => {
    if (!mapRef.current) return; // マップが既に存在する場合は初期化しない

    const initializedMap = initializeMap(mapRef.current, center);
    setMap(initializedMap);

    // クリーンアップ関数
    return () => {
      if (initializedMap) {
        initializedMap.setTarget(undefined); // マップのターゲットを解除
      }
    };
  }, [center]); // mapを依存配列から削除

  // handleMapClickをuseCallbackでメモ化
  const handleMapClick = useCallback((event: { pixel: Pixel }) => {
    if (!map) return;
    const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
    if (feature) {
      const properties = feature.getProperties();
      setSelectedFeature({
        geometry: properties.geometry,
        name: properties.name,
        height: properties.height,
        googlemaplink: properties.googlemaplink,
        YAMAP: properties.YAMAP,
        image: properties.image,
        area: properties.area,
      });
    } else {
      setSelectedFeature(null);
    }
  }, [map, setSelectedFeature]);

  // マップクリックイベントの設定
  useEffect(() => {
    if (!map) return;

    map.on("click", handleMapClick);
    return () => map.un("click", handleMapClick);
  }, [map, handleMapClick]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapRenderer;
