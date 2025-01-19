import { MapBrowserEvent, Overlay } from "ol";
import { Map } from "ol";
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
  (map: Map) => (event: MapBrowserEvent<UIEvent>) => {
    const feature = map.forEachFeatureAtPixel(
      event.pixel,
      (feature) => feature
    );

    // 全てのポップアップを非表示
    map.getOverlays().forEach((overlay) => overlay.setPosition(undefined));

    if (feature) {
      const popup = feature.get("popup") as Overlay;
      const coordinate = event.coordinate;

      // ポップアップを表示
      popup.setPosition(coordinate);

      // ポップアップ要素にクリックイベントを追加
      const popupElement = popup.getElement();
      if (popupElement) {
        popupElement.onclick = () => {
          // 地図の中心をポップアップの座標に移動
          map.getView().animate({ center: coordinate, duration: 500 });
        };
      }
    }
  };
