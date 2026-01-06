import { Map } from 'ol';
import VectorSource from 'ol/source/Vector';
import { geoparkIcon } from './styles';
import { fetchWGeoparkData } from './fetchWGeoparkData';
import { WGeoparkFromSelected } from '../types/types';
import { addFeatures } from '../../shared/addFeatureUtils';

/**
 * ジオパークのフィーチャーを地図に追加する
 * @param {Map} map OpenLayersのマップインスタンス
 * @param {VectorSource} vectorSource フィーチャーを追加するベクターソース
 * @returns {Promise<void>}
 */
export const addWGeoparkFeature = async (
  map: Map,
  vectorSource: VectorSource
): Promise<void> => {
  await addFeatures<WGeoparkFromSelected>({
    map,
    vectorSource,
    fetchData: fetchWGeoparkData,
    style: geoparkIcon,
    createProperties: (data: WGeoparkFromSelected) => data,
  });
};
