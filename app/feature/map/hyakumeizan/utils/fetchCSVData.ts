import Papa from "papaparse";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { fetchMountainData } from "../types/types";

export const fetchCSVData = async (url: string) => {
  try {
    const response = await fetch(url);
    const csvString = await response.text();

    const { data } = Papa.parse<fetchMountainData>(csvString, {
      header: true,
      dynamicTyping: false,
    });

    // 全てのフィーチャーを地図上に表示する
    return data.map((row) => ({
      name: row.name,
      height: row.height,
      googlemaplink: row.googlemaplink,
      YAMAP: row.YAMAP,
      image: row.画像,
      area: row.エリア,
      geometry: new Point(
        fromLonLat([parseFloat(row.経度), parseFloat(row.緯度)])
      ),
    }));
  } catch (error) {
    console.error("Error loading CSV:", error);
    return [];
  }
};
