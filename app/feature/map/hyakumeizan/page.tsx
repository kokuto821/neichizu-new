// app/feature/map/hyakumeizan/page.tsx
"use client";

import { useEffect } from 'react';
import Papa from 'papaparse';
import $ from 'jquery'; // jQueryを使用するためにインポート
import L from 'leaflet';

const MapComponent = () => {
  useEffect(() => {
    // Leafletの初期設定
    const map = L.map('map', {
      center: [35, 139], // 初期位置（緯度、経度）
      zoom: 5.5, // ズームレベル
      scrollWheelZoom: true,
      zoomControl: false,
    });

    // 地図のタイルレイヤー
    const osm = L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png', {
      attribution: "&copy; <a href='http://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a>",
    });

    const gsi = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
      attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
    });

    // 地図にレイヤーを追加
    osm.addTo(map);
    gsi.addTo(map);

    // 現在地アイコン
    const MountainIcon = L.icon({
      iconUrl: '/img/mountain.png',
      iconSize: [50, 50],
      iconAnchor: [26, 50],
      popupAnchor: [0, -50],
    });

    // CSVからマーカーを読み込む
    $.get('/csv/hyakumeizan.csv', function (csvString) {
      const data = Papa.parse<{ 緯度: number; 経度: number; 画像: string; name: string; エリア: string; height: string; googlemaplink: string; YAMAP: string }>(csvString, { header: true, dynamicTyping: false }).data;
      
      for (const row of data) {
        const marker = L.marker([row.緯度, row.経度], { icon: MountainIcon })
          .bindPopup(`
            <div class="popup-image_wrapper">
              <img class="popup-image" src="${row.画像}" />
            </div>
            <br>
            <span class="m-name_text">${row.name}</span><br>
            <span class="m-content_text">${row.エリア}</span><br>
            <span class="m-content_text">${row.height}</span><br>
            <a href="${row.googlemaplink}" target="_blank">
              <img class="g_map_logo" src="/img/g_map_logo.jpg" alt="Googlemap" />
            </a><br>
            <a href="${row.YAMAP}" target="_blank">
              <img class="yamap-logo" src="/img/yamap-logo.png" alt="YAMAP" />
            </a>
          `);
        marker.addTo(map);
      }
    });

    return () => {
      map.remove(); // コンポーネントがアンマウントされたときにマップをクリーンアップ
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}></div>
      
      {/* スタイルのインポート */}
      <style jsx global>{`
        body { margin: 0; padding: 0; }
        #map { height: 100vh; }
      `}</style>

      {/* Leaflet CSSのインポート */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      {/* Leaflet JSのインポート */}
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

      {/* jQueryとPapaParseのインポート */}
      <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/papaparse@5.3.0/papaparse.min.js"></script>

      {/* 他の必要なスクリプトやスタイルをここに追加 */}
    </div>
  );
}

export default MapComponent;
