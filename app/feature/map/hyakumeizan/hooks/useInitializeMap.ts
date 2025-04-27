import { useEffect, useState, useRef } from 'react';
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
  const [center] = useState<[number, number]>([139, 35]); // 初期中心座標
  const [isVectorVisible,setIsVectorVisible] = useState(true);


  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Map インスタンスの生成
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

    // クリーンアップ: マップのターゲットを解除
    return () => {
      initializedMap.setTarget(undefined);
    };
  }, [center]);

  const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

  useEffect(() => {
    if (!map) return;

    const existingVectorLayer = map.getLayers().getArray().find(
      layer => layer.get('type') === 'vector'
    ) as VectorLayer<VectorSource>;

    if (isVectorVisible) {
      if (!existingVectorLayer) {
        const vectorSource = new VectorSource();
        vectorLayerRef.current = new VectorLayer({
          source: vectorSource,
          properties: { type: 'vector' },
        });
        addFeature(map, vectorSource);
        map.addLayer(vectorLayerRef.current);
        console.log('Vector layer added');
      }
    } else {
      if (existingVectorLayer) {
        map.removeLayer(existingVectorLayer);
        vectorLayerRef.current = null;
        console.log('Vector layer removed');
      }
    }
  }, [isVectorVisible, map]);

  // レイヤー切り替え処理
  const switchBaseLayer = (layerName: string) => {
    if (!map) return;

    map.getLayers().forEach((layer) => {
      if (layer instanceof TileLayer && layer.get('name')) {
        const isVisible = layer.get('name') === layerName;
        layer.setVisible(isVisible);
      }
    });

    setActiveLayer(layerName);
  };

  return {
    map,
    mapRef,
    setMap,
    setActiveLayer,
    activeLayer,
    switchBaseLayer,
    baseLayers,
    isVectorVisible,
    setIsVectorVisible
  };
};
