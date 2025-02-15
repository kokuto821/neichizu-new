import { Dispatch, RefObject, SetStateAction } from "react";
import "ol/ol.css";
import { FeatureProperties } from "../types/types";
import { useMapClick } from "../hooks/useMapClick";
import { Map } from "ol";

type MapRendererProps = {
  setSelectedFeature: React.Dispatch<
    React.SetStateAction<FeatureProperties | null>
  >;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  map: Map;
  mapRef: RefObject<HTMLDivElement | null>;
  setMap: Dispatch<SetStateAction<Map>>;
};

export const MapRenderer: React.FC<MapRendererProps> = ({
  setSelectedFeature,
  setIsVisible,
  map,
  mapRef,
}) => {
  useMapClick(map, setSelectedFeature, setIsVisible);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
};

export default MapRenderer;
