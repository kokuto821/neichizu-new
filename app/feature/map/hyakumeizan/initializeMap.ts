import Papa from "papaparse";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import { Pixel } from "ol/pixel";

type MountainData = {
  緯度: string;
  経度: string;
  画像: string;
  name: string;
  エリア: string;
  height: string;
  googlemaplink: string;
  YAMAP: string;
}

const initializeMap = async (mapElement: HTMLDivElement) => {
  if (typeof window === "undefined") return;

  const map = new Map({
    target: mapElement,
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'http://tile.openstreetmap.jp/{z}/{x}/{y}.png',
          attributions: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
        }),
        zIndex:0,
      }),
      new TileLayer({
        source: new XYZ({
          url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
          attributions: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>'
        }),
        zIndex:0,
      })
    ],
    view: new View({
      center: fromLonLat([139, 35]),
      zoom: 5.5
    })
  });

  const vectorSource = new VectorSource();
  const vectorLayer = new VectorLayer({ source: vectorSource,zIndex:1 });
  map.addLayer(vectorLayer);

  const mountainIcon = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: '/img/mountain.png',
      scale: 0.5
    })
  });

  try {
    const response = await fetch("/csv/hyakumeizan.csv");
    const csvString = await response.text();
    const { data } = Papa.parse<MountainData>(csvString, { header: true, dynamicTyping: false });
    console.log('CSV data:', data);

    const features = data.map(row => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([parseFloat(row.経度), parseFloat(row.緯度)]))
      });
      feature.setStyle(mountainIcon);
      console.log('Created feature:', feature);
      console.log('Converted coordinates:', fromLonLat([parseFloat(row.経度), parseFloat(row.緯度)]));


      const popupElement = createPopupElement(row);
      const popup = new Overlay({
        element: popupElement,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50]
      });
      map.addOverlay(popup);
      feature.set('popup', popup);

      return feature;
    });

    vectorSource.addFeatures(features);
    console.log('Number of features added:', vectorSource.getFeatures().length);


    map.on('click', handleMapClick(map));

  } catch (error) {
    console.error('Error loading CSV:', error);
  }

  return map;
};

const createPopupElement = (row: MountainData): HTMLDivElement => {
  const popupElement = document.createElement('div');
  popupElement.className = 'ol-popup';
  popupElement.innerHTML = `
    <div class="popup-image_wrapper">
      <img class="popup-image" src="${row.画像}" />
    </div>
    <br>
    <span class="m-name_text">${row.name}</span><br>
    <span class="m-content_text">${row.エリア}</span><br>
    <span class="m-content_text">${row.height}</span><br>
    <a href="${row.googlemaplink}" target="_blank">
      <img class="g_map_logo" src="/img/g_map_logo.jpg" alt="Googlemap" />
    </a><br>
    <a href="${row.YAMAP}" target="_blank">
      <img class="yamap-logo" src="/img/yamap-logo.png" alt="YAMAP" />
    </a>
  `;
  return popupElement;
};

const handleMapClick = (map: Map) => (evt: { pixel: Pixel; coordinate: unknown; }) => {
  const feature = map.forEachFeatureAtPixel(evt.pixel, feature => feature);
  map.getOverlays().forEach(overlay => overlay.setPosition(undefined));
  if (feature) {
    const popup = feature.get('popup');
    popup.setPosition(evt.coordinate);
  }
};

export default initializeMap;
