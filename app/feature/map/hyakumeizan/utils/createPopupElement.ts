import { Map, MapBrowserEvent, Overlay } from "ol";
import { MountainData } from "./fetchHyakumeizanData";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import { FeatureLike } from "ol/Feature";
import { Dispatch, SetStateAction } from "react";

// Type guard function
const isOverlay = (value: unknown): value is Overlay => {
  return value instanceof Overlay;
};

// 型ガード関数
const isCoordinate = (value: any): value is [number, number] => {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    value.every((v) => typeof v === "number")
  );
};

export const createPopupElement = (row: MountainData): HTMLDivElement => {
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
  (map: Map, setCenter: Dispatch<SetStateAction<[number, number]>>) =>
  (event: MapBrowserEvent<UIEvent>) => {
    const feature = map.forEachFeatureAtPixel(
      event.pixel,
      (feature: FeatureLike) => feature
    );

    map.getOverlays().forEach((overlay) => overlay.setPosition(undefined));

    if (!feature || !(feature instanceof Feature)) return;

    const geometry = feature.getGeometry();
    if (!(geometry instanceof Point)) return;

    const coordinate = geometry.getCoordinates();
    const existingPopup = feature.get("popup");

    // Use the type guard to check if existingPopup is an Overlay
    if (isOverlay(existingPopup)) {
      existingPopup.setPosition(coordinate);
      if (isCoordinate(coordinate)) {
        setCenter(coordinate as [number, number]);
        map.getView().animate({ center: coordinate, duration: 500 });
        return;
      }
    }

    // Create a new popup if it doesn't exist
    const row = feature.get("data") as MountainData;
    const popupElement = createPopupElement(row);

    const newPopup = new Overlay({
      element: popupElement,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -50],
    });

    feature.set("popup", newPopup);
    map.addOverlay(newPopup);
    newPopup.setPosition(coordinate);
    map.getView().animate({ center: coordinate, duration: 500 });
  };
