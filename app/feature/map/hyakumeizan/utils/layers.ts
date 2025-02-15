import TileLayer from "ol/layer/Tile";
import { OSM, XYZ } from "ol/source";

export const gsi = new TileLayer({
  source: new XYZ({
    url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
  }),
  properties: { name: "gsi" },
  visible: true,
});
export const osm = new TileLayer({
  source: new OSM({
    url: "http://tile.openstreetmap.jp/{z}/{x}/{y}.png",
  }),
  properties: { name: "osm" },
  visible: false,
});

export const layers = [gsi, osm];
