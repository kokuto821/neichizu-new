// app/feature/map/hyakumeizan/initializeMap.ts
import Papa from "papaparse";
import $ from "jquery"; // jQueryを使用するためにインポート
import L from "leaflet";

const initializeMap = (mapElement: HTMLDivElement) => {
  const map = L.map(mapElement, {
    center: [35, 139], // 初期位置（緯度、経度）
    zoom: 5.5, // ズームレベル
    scrollWheelZoom: true,
    zoomControl: false,
  });

  const osm = L.tileLayer("http://tile.openstreetmap.jp/{z}/{x}/{y}.png", {
    attribution:
      "&copy; <a href='http://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a>",
  });

  const gsi = L.tileLayer(
    "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
    {
      attribution:
        "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
    }
  );

  osm.addTo(map);
  gsi.addTo(map);

  const MountainIcon = L.icon({
    iconUrl: "/img/mountain.png",
    iconSize: [50, 50],
    iconAnchor: [26, 50],
    popupAnchor: [0, -50],
  });

  $.get("/csv/hyakumeizan.csv", function (csvString) {
    const data = Papa.parse<{
      緯度: number;
      経度: number;
      画像: string;
      name: string;
      エリア: string;
      height: string;
      googlemaplink: string;
      YAMAP: string;
    }>(csvString, { header: true, dynamicTyping: false }).data;

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

  return map; // 地図インスタンスを返す
};

export default initializeMap;
