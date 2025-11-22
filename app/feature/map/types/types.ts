import { FeatureProperties } from '../hyakumeizan/types/types';

// 百名山とジオパークの両方に対応する型
export type CombinedFeatureProperties = FeatureProperties & {
  category?: string;
  comment?: string;
  website?: string;
};
