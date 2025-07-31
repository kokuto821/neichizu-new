import { useEffect, useState, useRef, useCallback } from 'react';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import { gsi, layers, osm, osmTopo, photo, relief } from '../utils/layers';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { addFeature } from '../utils/addFeature';

type BaseLayerConfig = {
  name: string;
  layer: TileLayer;
};

export const useInitializeMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [baseLayers, setBaseLayers] = useState<BaseLayerConfig[]>([]);
  const [activeLayer, setActiveLayer] = useState('gsi');
  const [isVectorVisible, setIsVectorVisible] = useState(true);
  // マップ初期化
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    const center = [139, 35]; // 初期中心座標

    const initializedMap = new Map({
      target: mapRef.current,
      layers: layers,
      view: new View({
        center: fromLonLat(center),
        zoom: 5.5,
      }),
      controls: defaultControls({ zoom: false }),
    });

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

  // ベクターレイヤーの表示・非表示制御
  useEffect(() => {
    if (!map) return;

    const existingVectorLayer = map
      .getLayers()
      .getArray()
      .find((layer) => layer.get('type') === 'vector') as
      | VectorLayer<VectorSource>
      | undefined;

    if (isVectorVisible) {
      if (!existingVectorLayer) {
        const vectorSource = new VectorSource();
        const vectorLayer = new VectorLayer({
          source: vectorSource,
          properties: { type: 'vector' },
        });
        addFeature(map, vectorSource);
        map.addLayer(vectorLayer);
      }
    } else {
      if (existingVectorLayer) {
        map.removeLayer(existingVectorLayer);
      }
    }
  }, [isVectorVisible, map]);

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
    isVectorVisible,
    setIsVectorVisible,
  };
};
