// mapUtils.ts
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Overlay from "ol/Overlay";
import { MountainData } from "./type/type";

export const createMountainStyle = (iconPath: string, scale: number) =>
  new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: iconPath,
      scale,
    }),
  });

export const createMountainFeature = (
  mountainData: MountainData,
  mountainStyle: Style
) => {
  const createPopup = (mountainData: MountainData): HTMLDivElement => {
    const popupElement = document.createElement("div");
    popupElement.className = "ol-popup";

    const content = `
      <div class="popup-image_wrapper">
        <img class="popup-image" src="${mountainData.画像}" alt="${mountainData.name}" />
      </div>
      <br>
      <span class="m-name_text">${mountainData.name}</span><br>
      <span class="m-content_text">${mountainData.エリア}</span><br>
      <span class="m-content_text">${mountainData.height}</span><br>
      <a href="${mountainData.googlemaplink}" target="_blank" rel="noopener noreferrer">
        <img class="g_map_logo" src="/img/g_map_logo.jpg" alt="Googlemap" />
      </a>
      <a href="${mountainData.YAMAP}" target="_blank" rel="noopener noreferrer">
        <img class="yamap-logo" src="/img/yamap-logo.png" alt="YAMAP" />
      </a>
    `;

    popupElement.innerHTML = content;
    return popupElement;
  };

  const coordinates = fromLonLat([
    parseFloat(mountainData.経度),
    parseFloat(mountainData.緯度),
  ]);

  const feature = new Feature({
    geometry: new Point(coordinates),
    properties: mountainData,
  });

  feature.setStyle(mountainStyle);

  const popupElement = createPopup(mountainData);
  const popup = new Overlay({
    element: popupElement,
    positioning: "bottom-center",
    stopEvent: false,
    offset: [0, -50],
  });

  feature.set("popup", popup);
  return { feature, popup };
};
