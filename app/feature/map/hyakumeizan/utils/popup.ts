import { Overlay } from "ol";
import { Map } from "ol";
import { Pixel } from "ol/pixel";
import { Coordinate } from "ol/coordinate";
import { MountainData } from "./fetchHyakumeizanData";

export const createPopup = (row: MountainData): HTMLDivElement => {
  const popupElement = document.createElement("div");
  popupElement.className = "ol-popup";
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
    </a>
    <a href="${row.YAMAP}" target="_blank">
      <img class="yamap-logo" src="/img/yamap-logo.png" alt="YAMAP" />
    </a>
  `;
  return popupElement;
};
export const handleMapClick =
  (map: Map) => (evt: { pixel: Pixel; coordinate: Coordinate }) => {
    const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
    map.getOverlays().forEach((overlay) => overlay.setPosition(undefined));
    if (feature) {
      const popup = feature.get("popup") as Overlay;
      popup.setPosition(evt.coordinate);
    }
  };
