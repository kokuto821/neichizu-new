import { useState, useCallback } from 'react';

export type LayerType = 'gsi' | 'photo' | 'relief' | 'osm' | 'osmTopo';

export const useChangeVisible = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLayer, setActiveLayer] = useState<LayerType>('gsi'); // デフォルトで地理院地図をアクティブに

  const changeVisible = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const changeLayer = useCallback((layerType: LayerType) => {
    setActiveLayer(layerType);
  }, []);

  const isLayerActive = useCallback(
    (layerType: LayerType) => {
      return activeLayer === layerType;
    },
    [activeLayer]
  );

  return {
    isVisible,
    changeVisible,
    changeLayer,
    isLayerActive,
    activeLayer,
  };
};
