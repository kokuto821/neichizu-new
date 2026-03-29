import { useRef, useCallback, useEffect } from 'react';
import { FeatureType } from '../utils/featureUtils';
import {
  calculateCardWidth,
  applyScroll,
  scrollLeftToExtendedIndex,
  getCloneJumpTarget,
  extendedIndexToRealIndex,
  buildExtendedFeatures,
} from '../utils/carouselUtils';
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
  // useState ではなく useRef で管理することで同期的に読み書きし、
  // stale closure によるガード漏れを防ぐ
  const isAdjustingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 前回スクロール停止時の中央カードIDを記録（ユーザー手動スクロールを検出するため）
  const prevCenteredFeatureIdRef = useRef<number | null>(null);

  const count = features.length;

  const extendedFeatures = buildExtendedFeatures(features);

  // 特定のフィーチャーインデックスにスクロール（extended配列のインデックス = 実インデックス + 1）
  const scrollToFeatureIndex = useCallback(
    (realIndex: number, smooth: boolean = false) => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = calculateCardWidth(el);
      if (cardWidth === 0) return;

      applyScroll(el, cardWidth * (realIndex + 1), smooth);
    },
    []
  );

  // 中央フィーチャーを通知する（重複通知防止付き）
  const notifyCenteredFeature = useCallback((feature: FeatureType) => {
    if (prevCenteredFeatureIdRef.current !== feature.id) {
      prevCenteredFeatureIdRef.current = feature.id;
      onFeatureChange(feature);
    }
  }, [onFeatureChange]);

  // クローン位置にいる場合に実要素へ瞬時ジャンプする
  // 戻り値: ジャンプ後の実フィーチャー（ジャンプしなかった場合は null）
  const jumpIfAtClone = useCallback((el: HTMLElement, cardWidth: number, currentExtendedIndex: number): FeatureType | null => {
    const jumpTarget = getCloneJumpTarget(currentExtendedIndex, count);
    if (jumpTarget === null) return null;

    isAdjustingRef.current = true;
    applyScroll(el, cardWidth * jumpTarget, false);
    requestAnimationFrame(() => { isAdjustingRef.current = false; });
    return features[extendedIndexToRealIndex(jumpTarget)];
  }, [count, features]);

  // スクロール位置を確認してループジャンプ・フィーチャー通知を行う共通処理
  const checkScrollPosition = useCallback(() => {
    const el = scrollRef.current;
    if (!el || count === 0 || isAdjustingRef.current) return;

    const cardWidth = calculateCardWidth(el);
    if (cardWidth === 0) return;
    const currentExtendedIndex = scrollLeftToExtendedIndex(el.scrollLeft, cardWidth);

    const jumpedTo = jumpIfAtClone(el, cardWidth, currentExtendedIndex);
    if (jumpedTo) {
      notifyCenteredFeature(jumpedTo);
      return;
    }

    // 通常スクロール時のフィーチャー通知
    const realIndex = extendedIndexToRealIndex(currentExtendedIndex);
    if (realIndex >= 0 && realIndex < count) {
      notifyCenteredFeature(features[realIndex]);
    }
  }, [count, features, jumpIfAtClone, notifyCenteredFeature]);

  // scroll イベント: デバウンスしてスナップ閾値チェック付きで処理
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || count === 0 || isAdjustingRef.current) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (isAdjustingRef.current) return;

      const cardWidth = calculateCardWidth(el);
      if (cardWidth === 0) return;
      const currentExtendedIndex = scrollLeftToExtendedIndex(el.scrollLeft, cardWidth);

      // スナップ位置に十分近くない場合はまだスクロール中とみなして処理しない
      const offset = Math.abs(el.scrollLeft - cardWidth * currentExtendedIndex);
      if (offset > cardWidth * SNAP_THRESHOLD_RATIO) return;

      checkScrollPosition();
    }, SCROLL_DEBOUNCE_MS);
  }, [count, checkScrollPosition]);

  const isFirstScrollRef = useRef(true);

  // selectedFeature が変更されたら、そのカードを中央にスクロール & refを更新
  useEffect(() => {
    if (!selectedFeature || count === 0) return;
    const realIndex = features.findIndex((f) => f.id === selectedFeature.id);
    if (realIndex === -1) return;

    // refを更新（次回のhandleScrollで重複通知を防ぐ）
    prevCenteredFeatureIdRef.current = selectedFeature.id;

    // 初回レンダリング時は即座に、それ以降はスムーズにスクロール
    const smooth = !isFirstScrollRef.current;
    isFirstScrollRef.current = false;

    requestAnimationFrame(() => {
      scrollToFeatureIndex(realIndex, smooth);
    });
  }, [selectedFeature, count, features, scrollToFeatureIndex]);

  // iOS Safari 対策: touchend 後に snap アニメーションが完了するのを待ってから位置を確認する
  // scroll イベントが snap アニメーション中に止まる場合でもループジャンプが確実に動作する
  const touchEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleTouchEnd = () => {
      if (touchEndTimerRef.current) clearTimeout(touchEndTimerRef.current);
      // snap アニメーション完了を待つ（iOS は最大 300ms 程度）
      touchEndTimerRef.current = setTimeout(() => {
        checkScrollPosition();
      }, 300);
    };

    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchend', handleTouchEnd);
      if (touchEndTimerRef.current) clearTimeout(touchEndTimerRef.current);
    };
  }, [checkScrollPosition]);

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
