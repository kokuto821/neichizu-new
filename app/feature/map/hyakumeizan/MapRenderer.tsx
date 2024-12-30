// app/feature/map/hyakumeizan/MapRenderer.tsx
"use client";

import { useEffect, useRef } from "react";
import initializeMap from "./initializeMap";
import { Map } from 'ol';

const MapRenderer = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  
  useEffect(() => {
    const mapElement = mapRef.current;
    
    if (mapElement && !mapInstanceRef.current) {
      initializeMap(mapElement).then(map => {
        if (map) mapInstanceRef.current = map;
      });
    }

    // クリーンアップ関数
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
    <div
      ref={mapRef}
      style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
    />
    </div>
  );
};

export default MapRenderer;
