// app/feature/map/hyakumeizan/MapComponent.tsx
"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";


const Map = dynamic(
  () => import("./MapRenderer"), 
  { 
    ssr: false,
    loading: () => <div>Loading map...</div>
  }
);

const MapComponent = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Map />
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
        #map {
          height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default MapComponent;