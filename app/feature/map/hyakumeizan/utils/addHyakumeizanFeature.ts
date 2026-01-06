import { Map } from 'ol';
import VectorSource from 'ol/source/Vector';
import { mountainIcon } from './styles';
import { HyakumeizanFromSelected } from '../types/types';
import { fetchHyakumeizanData } from './fetchHyakumeizanData';
import { addFeatures } from '../../shared/addFeatureUtils';

/**
 * 百名山のフィーチャーを地図に追加する
 * @param {Map} map OpenLayersのマップインスタンス
 * @param {VectorSource} vectorSource フィーチャーを追加するベクターソース
 * @returns {Promise<void>}
 */
export const addHyakumeizanFeature = async (
  map: Map,
  vectorSource: VectorSource
): Promise<void> => {
  await addFeatures<HyakumeizanFromSelected>({
    map,
    vectorSource,
    fetchData: fetchHyakumeizanData,
    style: mountainIcon,
    createProperties: (data: HyakumeizanFromSelected) => data,
  });
};
