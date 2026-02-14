import TileLayer from 'ol/layer/Tile';
import { OSM, XYZ } from 'ol/source';

export const gsi = new TileLayer({
  source: new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
  }),
  properties: { name: 'gsi' },
  visible: true,
});

export const photo = new TileLayer({
  source: new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
  }),
  properties: { name: 'photo' },
  visible: false,
});

export const relief = new TileLayer({
  source: new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png',
  }),
  properties: { name: 'relief' },
  visible: false,
});

export const osm = new TileLayer({
  source: new OSM({
    url: 'http://tile.openstreetmap.jp/{z}/{x}/{y}.png',
  }),
  properties: { name: 'osm' },
  visible: false,
});

export const osmTopo = new TileLayer({
  source: new XYZ({
    url: 'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
  }),
  properties: { name: 'osmTopo' },
  visible: false,
});

export const layers = [gsi, photo, relief, osm, osmTopo];
