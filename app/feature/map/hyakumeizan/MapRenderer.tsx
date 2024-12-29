// app/feature/map/hyakumeizan/MapRenderer.tsx
"use client";

import { useEffect, useRef } from "react";
import initializeMap from "./initializeMap";

const MapRenderer = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      initializeMap(mapRef.current);
    }

    // クリーンアップ関数
    return () => {
      if (mapRef.current) {
        // マップの破棄処理が必要な場合はここに追加
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
    />
  );
};

export default MapRenderer;