// app/feature/map/hyakumeizan/MapComponent.tsx
"use client";

import { useRef } from "react";
import Script from "next/script";
import useMap from "./useMap"; // カスタムフックをインポート

const MapComponent = () => {
  const mapId = "map"; // マップIDを定義

  useMap(mapId); // カスタムフックを呼び出す

  return (
    <div>
      <div
        id={mapId}
        style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
      ></div>

      {/* スタイルのインポート */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
        #map {
          height: 100vh;
        }
      `}</style>

      {/* Leaflet CSSのインポート */}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        strategy="beforeInteractive"
      />

      {/* Leaflet JSのインポート */}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        strategy="beforeInteractive"
      />

      {/* jQueryとPapaParseのインポート */}
      <Script
        src="https://code.jquery.com/jquery-3.5.1.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/papaparse@5.3.0/papaparse.min.js"
        strategy="beforeInteractive"
      />
    </div>
  );
};

export default MapComponent;

