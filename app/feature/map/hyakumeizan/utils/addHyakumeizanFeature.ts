import VectorSource from 'ol/source/Vector';
import { mountainIcon } from './styles';
import { HyakumeizanFromSelected } from '../types/types';
import { fetchHyakumeizanData } from './fetchHyakumeizanData';
import { addFeatures } from '../../shared/addFeatureUtils';

/**
 * 百名山のフィーチャーを地図に追加する
 * @param {VectorSource} vectorSource フィーチャーを追加するベクターソース
 * @returns {Promise<void>}
 */
export const addHyakumeizanFeature = async (
  vectorSource: VectorSource
): Promise<void> => {
  await addFeatures<HyakumeizanFromSelected>({
    vectorSource,
    fetchData: fetchHyakumeizanData,
    style: mountainIcon,
    createProperties: (data: HyakumeizanFromSelected) => data,
  });
};
