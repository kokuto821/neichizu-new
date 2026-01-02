import Papa from 'papaparse';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { HyakumeizanFromDB } from '../types/types';

export const fetchCSVData = async (url: string) => {
  try {
    const response = await fetch(url);
    const csvString = await response.text();

    const { data } = Papa.parse<HyakumeizanFromDB>(csvString, {
      header: true,
      dynamicTyping: false,
    });

    // 全てのフィーチャーを地図上に表示する
    return data.map((row) => ({
      name: row.name,
      height: row.height,
      googlemaplink: row.googlemaplink,
      YAMAP: row.YAMAP,
      image: row.image,
      area: row.area,
      geometry: new Point(
        fromLonLat([parseFloat(row.longitude), parseFloat(row.latitude)])
      ),
    }));
  } catch (error) {
    console.error('Error loading CSV:', error);
    return [];
  }
};
