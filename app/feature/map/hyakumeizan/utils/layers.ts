import TileLayer from "ol/layer/Tile";
import { OSM, XYZ } from "ol/source";

export const gsi = new TileLayer({
  source: new XYZ({
    url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
  }),
  zIndex: 0,
});
export const osm = new TileLayer({
  source: new OSM({
    url: "http://tile.openstreetmap.jp/{z}/{x}/{y}.png",
  }),
  zIndex: 1,
});

export const layers = [gsi, osm];
