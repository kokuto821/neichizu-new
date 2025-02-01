"use client";

import { useEffect, useRef, useState } from "react";
import { Map } from "ol";
import "ol/ol.css"; // OpenLayersのデフォルトスタイルをインポート
import initializeMap from "../utils/initializeMap";

export const MapRenderer = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [center] = useState<[number, number]>([139, 35]); // 初期中心座標を設定
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const mapElement = mapRef.current;

    if (mapElement && !mapInstanceRef.current) {
      initializeMap(mapElement, center).then((map) => {
        if (map) {
          mapInstanceRef.current = map;
        }
      });
    }

    // クリーンアップ関数
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [isClient, center]);

  if (!isClient) {
    return null; // クライアント側でのみ表示するコンテンツ
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default MapRenderer;
