// initializeMap.ts
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Papa from "papaparse";

import { createMountainStyle, createMountainFeature } from "./mapUtils";
import { MapConfig, MountainData } from "./type/type";
import { fromLonLat } from "ol/proj";

const DEFAULT_CONFIG: MapConfig = {
  initialCenter: [139, 35],
  initialZoom: 5.5,
  mountainIconPath: "/img/mountain.png",
  mountainIconScale: 0.5,
};

export const initializeMap = async (
  mapElement: HTMLDivElement,
  config: Partial<MapConfig> = {}
): Promise<Map | null> => {
  if (typeof window === "undefined") return null;

  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Create base layers
  const baseLayers = [
    new TileLayer({
      source: new XYZ({
        url: "http://tile.openstreetmap.jp/{z}/{x}/{y}.png",
        attributions:
          '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      }),
      zIndex: 0,
    }),
    new TileLayer({
      source: new XYZ({
        url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
        attributions:
          '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>',
      }),
      zIndex: 0,
    }),
  ];

  // Initialize map
  const map = new Map({
    target: mapElement,
    layers: baseLayers,
    view: new View({
      center: fromLonLat(finalConfig.initialCenter),
      zoom: finalConfig.initialZoom,
    }),
  });

  // Create vector layer for mountains
  const vectorSource = new VectorSource();
  const vectorLayer = new VectorLayer({ source: vectorSource, zIndex: 1 });
  map.addLayer(vectorLayer);

  // Create mountain style
  const mountainStyle = createMountainStyle(
    finalConfig.mountainIconPath,
    finalConfig.mountainIconScale
  );

  const csvFilePath = "app/csv/hyakumeizan.csv";

  try {
    const response = await fetch(csvFilePath);
    const csvString = await response.text();
    const { data } = Papa.parse<MountainData>(csvString, {
      header: true,
      dynamicTyping: false,
    });

    // Create features and popups
    const mountainFeatures = data.map((mountainData) =>
      createMountainFeature(mountainData, mountainStyle)
    );

    // Add features and popups to map
    mountainFeatures.forEach(({ feature, popup }) => {
      vectorSource.addFeature(feature);
      map.addOverlay(popup);
    });

    // Add click handler
    map.on("click", (evt) => {
      const clickedFeature = map.forEachFeatureAtPixel(
        evt.pixel,
        (feature) => feature
      );

      // Hide all popups
      map.getOverlays().forEach((overlay) => overlay.setPosition(undefined));

      // Show clicked feature's popup
      if (clickedFeature) {
        const popup = clickedFeature.get("popup");
        popup.setPosition(evt.coordinate);
      }
    });
  } catch (error) {
    console.error("Error loading CSV:", error);
    return null;
  }

  return map;
};
