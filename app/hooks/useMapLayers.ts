import { Map } from 'ol';
import { useLayerVisibility } from '../feature/map/hooks/useLayerVisibility';
import { addHyakumeizanFeature } from '../feature/map/hyakumeizan/utils/addHyakumeizanFeature';
import { addWGeoparkFeature } from '../feature/map/geopark/utils/addWGeoparkFeature';

/**
 * 複数のレイヤー可視性を管理するカスタムフック
 * @param {Map} map - OpenLayersのマップインスタンス
 * @returns {Object} 各レイヤーの可視性状態と制御関数
 */
export const useMapLayers = (map: Map | null) => {
  // 百名山レイヤー
  const { isVisible: isVectorVisible, setIsVisible: setIsVectorVisible } =
    useLayerVisibility({
      map,
      layerType: 'hyakumeizan',
      addFeatures: addHyakumeizanFeature,
      initialVisible: true,
    });

  // 世界ジオパークレイヤー
  const { isVisible: isGeoparkVisible, setIsVisible: setIsGeoparkVisible } =
    useLayerVisibility({
      map,
      layerType: 'geopark',
      addFeatures: addWGeoparkFeature,
      initialVisible: false,
    });

  return {
    // 百名山レイヤー
    isVectorVisible,
    setIsVectorVisible,
    // 世界ジオパークレイヤー
    isGeoparkVisible,
    setIsGeoparkVisible,
  };
};
