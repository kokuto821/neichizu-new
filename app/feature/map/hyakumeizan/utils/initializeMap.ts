import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { addLayer } from "./addLayer";

export const initializeMap = (
  mapElement: HTMLDivElement,
  center: [number, number]
): Map => {
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
      center: fromLonLat(center),
      zoom: 5.5,
    }),
  });

  // 追加レイヤーの設定
  addLayer({ map });

  return map;
};