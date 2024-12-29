// app/feature/map/hyakumeizan/MapComponent.tsx
"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import initializeMap from "./initializeMap"; // 新しい関数名をインポート

// Declare global types for jQuery and PapaParse
declare global {
  interface Window {
    L: typeof import("leaflet"); // Leafletの型
    $: (selector: string) => JQuery; // jQueryの型
    Papa: {
      parse: <T>(csvString: string, options?: { header?: boolean; dynamicTyping?: boolean }) => { data: T[] }; // PapaParseの型
    };
  }
}

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      initializeMap(mapRef.current); // マップ要素を渡す
    }
  }, [mapRef]);

  return (
    <div>
      <div
        ref={mapRef}
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
