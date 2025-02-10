import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { FeatureProperties } from "../types/types";
import { Map, MapBrowserEvent } from 'ol';

export const useMapClick = (map: Map | null, setSelectedFeature: Dispatch<SetStateAction<FeatureProperties | null>>) => {
    const handleMapClick = useCallback((event: MapBrowserEvent<UIEvent>) => {
        if (!map) return;
        const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
  
        if (feature) {
          const properties = feature.getProperties();
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
      },[map, setSelectedFeature]);

    useEffect(() => {
      if (!map) return;
      map.on('click', handleMapClick);
      return () => {
        map.un('click', handleMapClick);
        map.setTarget(undefined);
      };
    }, [map, handleMapClick]);

    return null;
}