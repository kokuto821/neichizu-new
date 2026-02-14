import { Geometry } from 'ol/geom';

export type WGeoparkFromDB = {
  id: number;
  name: string;
  area: string;
  latitude: string;
  longitude: string;
  category: string;
  googlemaplink: string;
  comment: string;
  website: string;
  image: string;
};

export type WGeoparkFromSelected = {
  geometry: Geometry;
  id: number;
  category: string;
  name: string;
  area: string;
  googlemaplink: string;
  comment: string;
  website: string;
  image: string;
};
