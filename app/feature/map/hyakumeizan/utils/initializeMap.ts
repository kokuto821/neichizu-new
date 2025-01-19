import { Map, View, Overlay, Feature } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fetchHyakumeizanData } from "./fetchHyakumeizanData";
import { createPopup, handleMapClick } from "./popup";
import { mountainIcon } from "./styles";

const initializeMap = async (mapElement: HTMLDivElement) => {
  if (typeof window === "undefined") return;

  // 地図の作成
  const map = new Map({
    target: mapElement,
    layers: [
      new TileLayer({
        source: new XYZ({
          url: "http://tile.openstreetmap.jp/{z}/{x}/{y}.png",
        }),
      }),
      new TileLayer({
        source: new XYZ({
          url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
        }),
      }),
    ],
    view: new View({
      center: fromLonLat([139, 35]),
      zoom: 5.5,
    }),
  });

  // レイヤーとデータの読み込み
  const vectorSource = new VectorSource();
  const vectorLayer = new VectorLayer({ source: vectorSource });
  map.addLayer(vectorLayer);

  // 山データを追加
  const data = await fetchHyakumeizanData("/csv/hyakumeizan.csv");
  data.forEach(({ row, geometry }) => {
    const feature = new Feature({ geometry });
    feature.setStyle(mountainIcon);

    const popupElement = createPopup(row);
    const popup = new Overlay({
      element: popupElement,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -50],
    });
    map.addOverlay(popup);
    feature.set("popup", popup);

    vectorSource.addFeature(feature);
  });

  // クリックイベントの追加
  map.on("click", handleMapClick(map));

  return map;
};

export default initializeMap;
