import { useEffect, useState, useRef, useCallback } from 'react';
import { Map } from 'ol';
import { gsi, osm, osmTopo, photo, relief } from '../utils/layers';
import TileLayer from 'ol/layer/Tile';
import { useVectorLayerVisibility } from './useVectorLayerVisibility';
import { useServiceWorker } from './useServiceWorker';
import { initializeMap } from '../utils/initializeMap';

type BaseLayerConfig = {
  name: string;
  layer: TileLayer;
};

type MapHookReturn = {
  map: Map | null;
  mapRef: React.RefObject<HTMLDivElement | null>;
  setMap: (map: Map | null) => void;
  setActiveLayer: (layer: string) => void;
  activeLayer: string;
  switchBaseLayer: (layerName: string) => void;
  baseLayers: BaseLayerConfig[];
};

export const useInitializeMap = (): MapHookReturn => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [baseLayers, setBaseLayers] = useState<BaseLayerConfig[]>([]);
  const [activeLayer, setActiveLayer] = useState('gsi');

  useServiceWorker()

  // マップ初期化
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    const initializedMap = initializeMap(mapRef.current);

    setMap(initializedMap);

    setBaseLayers([
      { name: 'gsi', layer: gsi },
      { name: 'photo', layer: photo },
      { name: 'relief', layer: relief },
      { name: 'osm', layer: osm },
      { name: 'osmTopo', layer: osmTopo },
    ]);

    return () => {
      initializedMap.setTarget(undefined);
    };
  }, []);

  useVectorLayerVisibility(map);

  // ベースレイヤー切り替え
  const switchBaseLayer = useCallback(
    (layerName: string) => {
      if (!map) return;
      map.getLayers().forEach((layer) => {
        if (layer instanceof TileLayer && layer.get('name')) {
          layer.setVisible(layer.get('name') === layerName);
        }
      });
      setActiveLayer(layerName);
    },
    [map]
  );

  return {
    map,
    mapRef,
    setMap,
    setActiveLayer,
    activeLayer,
    switchBaseLayer,
    baseLayers,
  };
};
