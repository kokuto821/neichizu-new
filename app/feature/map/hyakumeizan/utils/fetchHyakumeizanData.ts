import Papa from "papaparse";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

export type MountainData = {
  緯度: string;
  経度: string;
  画像: string;
  name: string;
  エリア: string;
  height: string;
  googlemaplink: string;
  YAMAP: string;
};

export const fetchHyakumeizanData = async (url: string) => {
  try {
    const response = await fetch(url);
    const csvString = await response.text();

    const { data } = Papa.parse<MountainData>(csvString, {
      header: true,
      dynamicTyping: false,
    });

    return data.map((row) => ({
      row,
      geometry: new Point(
        fromLonLat([parseFloat(row.経度), parseFloat(row.緯度)])
      ),
    }));
  } catch (error) {
    console.error("Error loading CSV:", error);
    return [];
  }
};
