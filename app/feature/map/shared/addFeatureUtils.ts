import { Map, Feature } from 'ol';
import { Geometry } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import { Style } from 'ol/style';

/**
 * 地図上にフィーチャーを追加するための共通ユーティリティ
 * @template T フィーチャーのプロパティの型
 * @param {Object} params パラメータオブジェクト
 * @param {Map} params.map OpenLayersのマップインスタンス
 * @param {VectorSource} params.vectorSource フィーチャーを追加するベクターソース
 * @param {() => Promise<T[]>} params.fetchData データを取得する非同期関数
 * @param {(featureData: T) => Record<string, any>} params.createProperties フィーチャーのプロパティを作成する関数
 * @param {Style} params.style フィーチャーに適用するスタイル
 * @returns {Promise<void>}
 */
export const addFeatures = async <
  T extends { geometry: Geometry; id: number },
>({
  map,
  vectorSource,
  fetchData,
  createProperties,
  style,
}: {
  map: Map;
  vectorSource: VectorSource;
  fetchData: () => Promise<T[]>;
  createProperties: (featureData: T) => Record<string, any>;
  style: Style;
}): Promise<void> => {
  const data = await fetchData();

  data.forEach((featureData) => {
    const feature = new Feature({
      ...createProperties(featureData),
      zIndex: Infinity,
    });

    feature.setStyle(style);
    vectorSource.addFeature(feature);
  });
};

/**
 * フィーチャー追加のためのベース設定
 */
export type AddFeatureConfig<T> = {
  /** データ取得関数 */
  fetchData: () => Promise<T[]>;
  /** スタイル */
  style: Style;
  /** フィーチャープロパティ生成関数 */
  createProperties: (data: T) => Record<string, any>;
};
