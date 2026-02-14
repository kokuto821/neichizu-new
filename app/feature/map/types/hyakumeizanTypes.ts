import Point from 'ol/geom/Point';

// Supabaseから取得する百名山データの型
export type HyakumeizanFromDB = {
  id: number;
  category: string;
  name: string;
  area: string;
  height: string;
  latitude: string;
  longitude: string;
  googlemaplink: string;
  image: string;
  YAMAP: string;
};

export type HyakumeizanFromSelected = {
  geometry: Point;
  id: number;
  category: string;
  name: string;
  area: string;
  height: string;
  googlemaplink: string;
  image: string;
  YAMAP: string;
};
