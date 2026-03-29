import { useRef, useCallback, useState, useEffect } from 'react';
import { FeatureType } from '../utils/featureUtils';
import { calculateCardWidth, applyScroll } from '../utils/carouselUtils';
import { SCROLL_DEBOUNCE_MS, WHEEL_COOLDOWN_MS, SNAP_THRESHOLD_RATIO } from '../constants/carouselConstants';

type UseCardCarouselScrollProps = {
  features: FeatureType[];
  selectedFeature: FeatureType | null;
  onFeatureChange: (feature: FeatureType) => void;
};

export const useCardCarouselScroll = ({
  features,
  selectedFeature,
  onFeatureChange,
}: UseCardCarouselScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 前回スクロール停止時の中央カードIDを記録（ユーザー手動スクロールを検出するため）
  const prevCenteredFeatureIdRef = useRef<number | null>(null);

  const count = features.length;

  // クローンを含む配列: [最後の要素, ...元の配列, 最初の要素]
  const extendedFeatures: FeatureType[] =
    count > 0 ? [features[count - 1], ...features, features[0]] : [];

  // 特定のフィーチャーインデックスにスクロール（extended配列のインデックス = 実インデックス + 1）
  const scrollToFeatureIndex = useCallback(
    (realIndex: number, smooth: boolean = false) => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = calculateCardWidth(el);
      if (cardWidth === 0) return;

      const extendedIndex = realIndex + 1; // クローン分のオフセット
      applyScroll(el, cardWidth * extendedIndex, smooth);
    },
    []
  );

  // スクロール停止時の処理：ループジャンプ & フィーチャー通知
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || count === 0 || isAdjusting) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const cardWidth = calculateCardWidth(el);
      if (cardWidth === 0) return;
      const currentExtendedIndex = Math.round(el.scrollLeft / cardWidth);

      // スナップ位置に十分近くない場合はまだスクロール中とみなして処理しない
      const offset = Math.abs(el.scrollLeft - cardWidth * currentExtendedIndex);
      if (offset > cardWidth * SNAP_THRESHOLD_RATIO) return;

      // クローンへのループジャンプ
      if (currentExtendedIndex <= 0) {
        setIsAdjusting(true);
        applyScroll(el, cardWidth * count, false);
        requestAnimationFrame(() => setIsAdjusting(false));
        // ジャンプ後のフィーチャー通知
        const featureId = features[count - 1].id;
        if (prevCenteredFeatureIdRef.current !== featureId) {
          prevCenteredFeatureIdRef.current = featureId;
          onFeatureChange(features[count - 1]);
        }
        return;
      }
      if (currentExtendedIndex >= count + 1) {
        setIsAdjusting(true);
        applyScroll(el, cardWidth * 1, false);
        requestAnimationFrame(() => setIsAdjusting(false));
        const featureId = features[0].id;
        if (prevCenteredFeatureIdRef.current !== featureId) {
          prevCenteredFeatureIdRef.current = featureId;
          onFeatureChange(features[0]);
        }
        return;
      }

      // 通常スクロール時のフィーチャー通知
      const realIndex = currentExtendedIndex - 1;
      if (realIndex >= 0 && realIndex < count) {
        const centeredFeature = features[realIndex];
        // 前回の中央カードから変わった場合のみ通知
        if (prevCenteredFeatureIdRef.current !== centeredFeature.id) {
          prevCenteredFeatureIdRef.current = centeredFeature.id;
          onFeatureChange(centeredFeature);
        }
      }
    }, SCROLL_DEBOUNCE_MS);
  }, [count, isAdjusting, features, onFeatureChange]);

  // selectedFeature が変更されたら、そのカードを中央にスクロール & refを更新
  useEffect(() => {
    if (!selectedFeature || count === 0) return;
    const realIndex = features.findIndex((f) => f.id === selectedFeature.id);
    if (realIndex === -1) return;

    // refを更新（次回のhandleScrollで重複通知を防ぐ）
    prevCenteredFeatureIdRef.current = selectedFeature.id;

    // 初回レンダリング時は即座に、それ以降はスムーズにスクロール
    requestAnimationFrame(() => {
      scrollToFeatureIndex(realIndex, false);
    });
  }, [selectedFeature?.id, count, features, scrollToFeatureIndex]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // ホイールスクロール: 1回のスクロールで1カード分だけ移動
  const wheelCooldownRef = useRef(false);
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (wheelCooldownRef.current) return;

    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = calculateCardWidth(el);
    if (cardWidth === 0) return;

    // スクロール方向を判定（deltaYもdeltaXも対応）
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta === 0) return;

    const direction = delta > 0 ? 1 : -1;
    const targetScroll = el.scrollLeft + cardWidth * direction;

    el.scrollTo({ left: targetScroll, behavior: 'smooth' });

    // クールダウン（連続スクロール防止）
    wheelCooldownRef.current = true;
    setTimeout(() => {
      wheelCooldownRef.current = false;
    }, WHEEL_COOLDOWN_MS);
  }, []);

  return {
    scrollRef,
    handleScroll,
    handleWheel,
    extendedFeatures,
  };
};
