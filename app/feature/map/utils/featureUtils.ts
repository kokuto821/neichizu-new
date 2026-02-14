import { WGeoparkFromSelected } from '@/app/feature/map/types/geoparkTypes';
import { HyakumeizanFromSelected } from '@/app/feature/map/types/hyakumeizanTypes';

export type FeatureType = HyakumeizanFromSelected | WGeoparkFromSelected;

// 型ガード関数
export const isWGeopark = (f: FeatureType): f is WGeoparkFromSelected => {
  return (f as WGeoparkFromSelected).comment !== undefined;
};

export const isHyakumeizan = (f: FeatureType): f is HyakumeizanFromSelected => {
  return (f as HyakumeizanFromSelected).height !== undefined;
};
