import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { FeatureProperties } from "../types/types";
import { Map, MapBrowserEvent } from "ol";

export const useMapClick = (
  map: Map | null,
  setSelectedFeature: Dispatch<SetStateAction<FeatureProperties | null>>
) => {
  const handleMapClick = useCallback(
    (event: MapBrowserEvent<UIEvent>) => {
      if (!map) return;

      // 地図上で選択されたフィーチャー情報を定義
      const clickedFeature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );

      if (clickedFeature) {
        const properties = clickedFeature.getProperties();
        setSelectedFeature({
          geometry: properties.geometry,
          name: properties.name,
          height: properties.height,
          googlemaplink: properties.googlemaplink,
          YAMAP: properties.YAMAP,
          image: properties.image,
          area: properties.area,
        });
      } else {
        setSelectedFeature(null);
      }
    },
    [map, setSelectedFeature]
  );

  useEffect(() => {
    if (!map) return;
    map.on("click", handleMapClick);
    return () => {
      map.un("click", handleMapClick);
      map.setTarget(undefined);
    };
  }, [map, handleMapClick]);

  return null;
};
