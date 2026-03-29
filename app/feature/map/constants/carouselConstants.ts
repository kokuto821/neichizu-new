// カードカルーセルのスクロール・アニメーション関連定数

// スクロール停止判定までのデバウンス時間 (ms)
export const SCROLL_DEBOUNCE_MS = 15;

// ホイールスクロールのクールダウン時間 (ms)
export const WHEEL_COOLDOWN_MS = 100;

// カード境界からこの割合以内ならスナップ済みとみなす（0〜0.5）
export const SNAP_THRESHOLD_RATIO = 0.15;

// カード切り替えアニメーションのspringバネ定数
export const SPRING_STIFFNESS = 500;

// 減衰比 0.9: damping = 2 * sqrt(stiffness) * ratio
// < 1.0: 少し揺れて止まる、= 1.0: 揺れなし（臨界制動）、> 1.0: 遅い
export const SPRING_DAMPING_RATIO = 0.9;
export const SPRING_DAMPING = 2 * Math.sqrt(SPRING_STIFFNESS) * SPRING_DAMPING_RATIO;

// ハイライトアニメーションの時間 (Tailwind クラス名)
export const HIGHLIGHT_TRANSITION_DURATION = 'duration-150';

// touchend 後に snap アニメーション完了を待つ時間 (ms) ― iOS Safari 対策
export const TOUCH_END_SNAP_WAIT_MS = 300;

// 展開カードのスライドアニメーション X 移動量 (px)
export const SLIDE_ANIMATION_OFFSET_PX = 300;

// 展開カードのスライドアニメーション duration / delay (s) ― スライドアニメーションの基準値
export const SLIDE_ANIMATION_DURATION_S = 0.3;

// スワイプ方向アニメーション後にリセットするまでの遅延 (ms) ― SLIDE_ANIMATION_DURATION_S のms表現
export const SWIPE_DIRECTION_RESET_MS = SLIDE_ANIMATION_DURATION_S * 1000;

// ドラッグ中カードの spring パラメータ
export const DRAG_SPRING_STIFFNESS = 300;
export const DRAG_SPRING_DAMPING = 30;

// 非選択カードの scale / opacity
export const CARD_INACTIVE_SCALE = 0.95;
export const CARD_INACTIVE_OPACITY = 0.8;

// カード退場アニメーションの duration (s) ― SLIDE_ANIMATION_DURATION_S と統一
export const CARD_EXIT_DURATION_S = SLIDE_ANIMATION_DURATION_S;

// カード登場アニメーションの Y オフセット (px)
export const CARD_ENTER_Y_OFFSET_PX = 40;