import VectorSource from 'ol/source/Vector';
import { geoparkIcon } from './geoparkStyles';
import { fetchWGeoparkData } from './fetchWGeoparkData';
import { WGeoparkFromSelected } from '../types/geoparkTypes';
import { addFeatures } from '../shared/addFeatureUtils';

/**
 * ジオパークのフィーチャーを地図に追加する
 * @param {VectorSource} vectorSource フィーチャーを追加するベクターソース
 * @returns {Promise<void>}
 */
export const addWGeoparkFeature = async (
  vectorSource: VectorSource
): Promise<void> => {
  await addFeatures<WGeoparkFromSelected>({
    vectorSource,
    fetchData: fetchWGeoparkData,
    style: geoparkIcon,
    createProperties: (data: WGeoparkFromSelected) => data,
  });
};
