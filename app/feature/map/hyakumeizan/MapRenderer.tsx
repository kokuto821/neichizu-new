// app/feature/map/hyakumeizan/MapRenderer.tsx
"use client";

import { useEffect, useRef } from "react";
import initializeMap from "./initializeMap";
import { Map as LeafletMap } from "leaflet";

const MapRenderer = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // ref の現在の値を変数に保存
    const mapElement = mapRef.current;
    let map: LeafletMap | undefined;
    
    if (mapElement) {
      map = initializeMap(mapElement);
    }

    // クリーンアップ関数
    return () => {
      if (map) {
        map.remove();
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