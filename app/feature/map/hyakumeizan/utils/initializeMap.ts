import { Map, View, Overlay, Feature } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { handleMapClick } from "./popup";

const initializeMap = async (mapElement: HTMLDivElement) => {
  if (typeof window === "undefined") return;

  // 地図の作成
  const map = new Map({
    target: mapElement,
    layers: [
      new TileLayer({
        source: new XYZ({
          url: "http://tile.openstreetmap.jp/{z}/{x}/{y}.png",
        }),
      }),
      new TileLayer({
        source: new XYZ({
          url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
        }),
      }),
    ],
    view: new View({
      center: fromLonLat([139, 35]),
      zoom: 5.5,
    }),
  });

  // クリックイベントの追加
  map.on("click", handleMapClick(map));

  return map;
};

export default initializeMap;
