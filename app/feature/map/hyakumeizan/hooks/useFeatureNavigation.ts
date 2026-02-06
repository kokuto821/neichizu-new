import { useEffect, useState, useMemo, useCallback } from 'react';
import { Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import { WGeoparkFromSelected } from '@/app/feature/map/geopark/types/types';
import { HyakumeizanFromSelected } from '@/app/feature/map/hyakumeizan/types/types';
import Point from 'ol/geom/Point';
import { Geometry } from 'ol/geom';

type FeatureType = HyakumeizanFromSelected | WGeoparkFromSelected;
type LayerType = 'hyakumeizan' | 'geopark';

/**
 * OpenLayersのFeatureから型付きオブジェクトに変換
 */
const convertFeatureToTyped = (
  feature: Feature,
  category: string
): FeatureType | null => {
  const props = feature.getProperties();

  if (category === 'world_geopark') {
    return {
      geometry: props.geometry as Geometry,
      id: props.id,
      category: props.category,
      name: props.name,
      area: props.area,
      googlemaplink: props.googlemaplink,
      comment: props.comment,
      website: props.website,
      image: props.image,
    } as WGeoparkFromSelected;
  } else if (category === 'hyakumeizan') {
    return {
      geometry: props.geometry as Point,
      id: props.id,
      category: props.category,
      name: props.name,
      area: props.area,
      height: props.height,
      googlemaplink: props.googlemaplink,
      image: props.image,
      YAMAP: props.YAMAP,
    } as HyakumeizanFromSelected;
  }

  return null;
};

/**
 * カテゴリからレイヤータイプを取得
 */
const getLayerType = (category?: string): LayerType | null => {
  if (category === 'hyakumeizan') return 'hyakumeizan';
  if (category === 'world_geopark') return 'geopark';
  return null;
};

/**
 * フィーチャナビゲーション機能を提供するフック
 * - 現在選択中のフィーチャのカテゴリに基づいて全フィーチャを取得
 * - ID昇順でソート
 * - 次/前へのナビゲーション機能を提供
 */
export const useFeatureNavigation = (
  map: Map | null,
  selectedFeature: FeatureType | null
) => {
  const [allFeatures, setAllFeatures] = useState<Feature[]>([]);

  // 現在のレイヤータイプを判定
  const layerType = useMemo(
    () => getLayerType(selectedFeature?.category),
    [selectedFeature?.category]
  );

  // 該当レイヤーから全フィーチャを取得してソート
  useEffect(() => {
    if (!map || !layerType) {
      setAllFeatures([]);
      return;
    }

    console.log('🔍 [FeatureNav] Searching for layer:', layerType);
    
    // 該当レイヤーを検索
    const targetLayer = map
      .getLayers()
      .getArray()
      .find((layer) => layer.get('type') === layerType);

    if (!targetLayer || !(targetLayer instanceof VectorLayer)) {
      console.warn('⚠️ [FeatureNav] Target layer not found or not a VectorLayer:', layerType);
      // レイヤー構成デバッグ用
      map.getLayers().forEach(l => console.log('Layer:', l.get('type'), l));
      setAllFeatures([]);
      return;
    }

    // フィーチャを取得してID昇順ソート
    const source = targetLayer.getSource();
    const features = source?.getFeatures() || [];
    console.log(`✅ [FeatureNav] Found layer with ${features.length} features`);

    interface FeatureWithId extends Feature {
      get(key: 'id'): number;
    }

    const sortedFeatures: FeatureWithId[] = features
      .filter((f: Feature): f is FeatureWithId => f.get('id') !== undefined)
      .sort((a: FeatureWithId, b: FeatureWithId) => a.get('id') - b.get('id'));

    setAllFeatures(sortedFeatures);
  }, [map, layerType]);

  // 現在のインデックスを計算
  const currentIndex = useMemo(() => {
    if (!selectedFeature) return -1;
    return allFeatures.findIndex((f) => f.get('id') === selectedFeature.id);
  }, [selectedFeature, allFeatures]);

  // ナビゲーション可否
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex >= 0 && currentIndex < allFeatures.length - 1;

  // 次のフィーチャに移動
  const goToNext = useCallback((): FeatureType | null => {
    if (!canGoNext || !selectedFeature) {
      console.log('❌ [FeatureNav] Cannot go next', { canGoNext, selectedFeature });
      return null;
    }

    const nextFeature = allFeatures[currentIndex + 1];
    console.log('➡️ [FeatureNav] Going next:', nextFeature.get('name'));
    return convertFeatureToTyped(nextFeature, selectedFeature.category);
  }, [canGoNext, currentIndex, allFeatures, selectedFeature]);

  // 前のフィーチャに移動
  const goToPrev = useCallback((): FeatureType | null => {
    if (!canGoPrev || !selectedFeature) {
      console.log('❌ [FeatureNav] Cannot go prev', { canGoPrev, selectedFeature });
      return null;
    }

    const prevFeature = allFeatures[currentIndex - 1];
    console.log('⬅️ [FeatureNav] Going prev:', prevFeature.get('name'));
    return convertFeatureToTyped(prevFeature, selectedFeature.category);
  }, [canGoPrev, currentIndex, allFeatures, selectedFeature]);

  return {
    currentIndex,
    totalCount: allFeatures.length,
    canGoPrev,
    canGoNext,
    goToNext,
    goToPrev,
  };
};
