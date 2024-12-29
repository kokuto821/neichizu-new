// app/feature/map/hyakumeizan/MapComponent.tsx
"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import useMap from "./useMap"; // カスタムフックをインポート

// Declare global types for jQuery and PapaParse
declare global {
  interface Window {
    L: unknown; // Leafletの型
    $: (selector: string) => unknown; // jQueryの型
    Papa: {
      parse: <T>(csvString: string, options?: unknown) => { data: T[] }; // PapaParseの型
    };
  }
}

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (typeof window.L === 'function' && typeof window.$ === 'function' && typeof window.Papa === 'object' && mapRef.current) {
        useMap(mapRef.current);
      }
    };

    // スクリプトの読み込みが完了したかチェック
    if (
      typeof window !== "undefined" &&
      window.L &&
      typeof window.$ === 'function' &&
      window.Papa
    ) {
      initMap();
    } else {
      // スクリプトの読み込みが完了していない場合は、イベントリスナーを設定
      window.addEventListener("load", initMap);
    }

    // クリーンアップ関数
    return () => {
      window.removeEventListener("load", initMap);
    };
  }, []);

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

