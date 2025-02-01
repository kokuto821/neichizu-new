import { Map, Feature, Overlay } from "ol";
import VectorSource from "ol/source/Vector";
import { createPopupElememt } from "./createPopupElement";
import { mountainIcon } from "./styles";
import { fetchCSVData } from "./fetchHyakumeizanData";

export const addFeature = async (map: Map, vectorSource: VectorSource) => {
  const data = await fetchCSVData("/csv/hyakumeizan.csv");

  data.forEach(({ row, geometry }) => {
    const feature = new Feature({ geometry });
    feature.setStyle(mountainIcon);

    // Popup を作成
    const popupElement = createPopupElememt(row);
    const popup = new Overlay({
      element: popupElement,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -50],
    });
    map.addOverlay(popup);

    feature.set("popup", popup);

    vectorSource.addFeature(feature);
    console.log("Feature added");
  });
};
