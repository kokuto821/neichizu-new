import { Map, Feature } from 'ol';
import { Geometry } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style } from 'ol/style';

/**
 * 地図上にフィーチャーを追加するための共通ユーティリティ
 * @template T フィーチャーのプロパティの型
 * @param {Object} params パラメータオブジェクト
 * @param {Map} params.map OpenLayersのマップインスタンス
 * @param {VectorSource} params.vectorSource フィーチャーを追加するベクターソース
 * @param {() => Promise<T[]>} params.fetchData データを取得する非同期関数
 * @param {(featureData: T) => Partial<T>} params.createProperties フィーチャーのプロパティを作成する関数
 * @param {Style} params.style フィーチャーに適用するスタイル
 * @returns {Promise<void>}
 */
export const addFeatures = async <
  T extends { geometry: Geometry; id: number },
>({
  vectorSource,
  fetchData,
  createProperties,
  style,
}: {
  vectorSource: VectorSource;
  fetchData: () => Promise<T[]>;
  createProperties: (featureData: T) => Partial<T>;
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

// 既存のレイヤーを取得する関数
/**
 * 指定されたタイプのレイヤーを地図から検索する
 * @param {Map} map - OpenLayersのマップインスタンス
 * @param {string} layerType - 検索するレイヤーのタイプ
 * @returns {VectorLayer<VectorSource> | undefined} 見つかったレイヤー、存在しない場合はundefined
 */
export const findLayer = (map: Map, layerType: string) => {
  const layers = map.getLayers().getArray();
  const found = layers.find((layer) => {
    const type = layer.get('type');
    return type === layerType;
  }) as VectorLayer<VectorSource> | undefined;
  return found;
};

// 新しいレイヤーを作成して追加する関数
/**
 * 新しいベクターレイヤーを作成し、地図に追加する
 * @param {Map} map - OpenLayersのマップインスタンス
 * @param {string} layerType - レイヤーのタイプ（識別用）
 * @param {(vectorSource: VectorSource) => Promise<void>} addFeatures - フィーチャーを追加する関数
 * @returns {Promise<void>}
 */
export const addLayer = async (
  map: Map,
  layerType: string,
  addFeatures: (vectorSource: VectorSource) => Promise<void>
) => {
  const vectorSource = new VectorSource();
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    properties: { type: layerType },
  });
  await addFeatures(vectorSource);
  map.addLayer(vectorLayer);
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
  createProperties: (data: T) => Partial<T>;
};
