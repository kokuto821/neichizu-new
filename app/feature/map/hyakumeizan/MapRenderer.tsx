import { useEffect, useRef, useCallback } from "react";
import { Map } from "ol";
import { MapConfig } from "./type/type";

type MapInitializer = (
  element: HTMLDivElement,
  config?: Partial<MapConfig>
) => Promise<Map | null>;

type MapRendererProps = {
  initializeMap: MapInitializer;
  config?: Partial<MapConfig>;
  className?: string;
  onMapInitialized?: (map: Map) => void;
  onMapError?: (error: Error) => void;
};

const MapRenderer: React.FC<MapRendererProps> = ({
  initializeMap,
  config,
  className = "",
  onMapInitialized,
  onMapError,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  const cleanup = useCallback(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setTarget(undefined);
      mapInstanceRef.current.getOverlays().clear();
      mapInstanceRef.current = null;
    }
  }, []);

  useEffect(() => {
    const mapElement = mapRef.current;

    if (mapElement && !mapInstanceRef.current) {
      initializeMap(mapElement, config)
        .then((map) => {
          if (map) {
            mapInstanceRef.current = map;
            onMapInitialized?.(map);
          }
        })
        .catch((error) => {
          console.error("Failed to initialize map:", error);
          onMapError?.(error);
        });
    }

    return cleanup;
  }, [config, cleanup, initializeMap, onMapInitialized, onMapError]);

  return (
    <div className={`w-full h-screen ${className}`}>
      <div ref={mapRef} className="absolute inset-0" />
    </div>
  );
};

export default MapRenderer;
