import { useRef, useCallback, useState, useEffect } from 'react';
import { FeatureType } from '../utils/featureUtils';

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

  // カード幅を計算するヘルパー
  const getCardWidth = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.children.length === 0) return 0;

    // scrollWidth / length はpaddingが含まれる場合に不正確になるため、
    // 実際の要素間の距離(幅 + gap)を計測する
    if (el.children.length >= 2) {
      const first = el.children[0] as HTMLElement;
      const second = el.children[1] as HTMLElement;
      return second.offsetLeft - first.offsetLeft;
    }

    // 要素が1つしかない場合(通常ありえないが念のため)
    return (el.children[0] as HTMLElement).offsetWidth;
  }, []);

  // 特定のフィーチャーインデックスにスクロール（extended配列のインデックス = 実インデックス + 1）
  const scrollToFeatureIndex = useCallback(
    (realIndex: number, smooth: boolean = false) => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = getCardWidth();
      if (cardWidth === 0) return;

      const extendedIndex = realIndex + 1; // クローン分のオフセット
      el.style.scrollBehavior = smooth ? 'smooth' : 'auto';
      el.scrollLeft = cardWidth * extendedIndex;
      if (!smooth) {
        el.style.scrollBehavior = '';
      }
    },
    [getCardWidth]
  );

  // スクロール停止時の処理：ループジャンプ & フィーチャー通知
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || count === 0 || isAdjusting) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const cardWidth = getCardWidth();
      if (cardWidth === 0) return;
      const currentExtendedIndex = Math.round(el.scrollLeft / cardWidth);

      // クローンへのループジャンプ
      if (currentExtendedIndex <= 0) {
        setIsAdjusting(true);
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = cardWidth * count;
        el.style.scrollBehavior = '';
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
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = cardWidth * 1;
        el.style.scrollBehavior = '';
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
    }, 150);
  }, [count, getCardWidth, isAdjusting, features, onFeatureChange]);

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
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (wheelCooldownRef.current) return;

      const el = scrollRef.current;
      if (!el) return;

      const cardWidth = getCardWidth();
      if (cardWidth === 0) return;

      // スクロール方向を判定（deltaYもdeltaXも対応）
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      const direction = delta > 0 ? 1 : -1;
      const targetScroll = el.scrollLeft + cardWidth * direction;

      el.scrollTo({ left: targetScroll, behavior: 'smooth' });

      // クールダウン（連続スクロール防止）
      wheelCooldownRef.current = true;
      setTimeout(() => {
        wheelCooldownRef.current = false;
      }, 400);
    },
    [getCardWidth]
  );

  return {
    scrollRef,
    handleScroll,
    handleWheel,
    extendedFeatures,
  };
};
