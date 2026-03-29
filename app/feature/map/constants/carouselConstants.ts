// カードカルーセルのスクロール・アニメーション関連定数

// スクロール停止判定までのデバウンス時間 (ms)
export const SCROLL_DEBOUNCE_MS = 15;

// ホイールスクロールのクールダウン時間 (ms)
export const WHEEL_COOLDOWN_MS = 100;

// カード境界からこの割合以内ならスナップ済みとみなす（0〜0.5）
export const SNAP_THRESHOLD_RATIO = 0.15;

// カード切り替えアニメーションのspringバネ定数
export const SPRING_STIFFNESS = 1000;

// 減衰比 0.9: damping = 2 * sqrt(stiffness) * ratio
// < 1.0: 少し揺れて止まる、= 1.0: 揺れなし（臨界制動）、> 1.0: 遅い
export const SPRING_DAMPING_RATIO = 0.9;
export const SPRING_DAMPING = 2 * Math.sqrt(SPRING_STIFFNESS) * SPRING_DAMPING_RATIO;

// ハイライトアニメーションの時間 (Tailwind クラス名)
export const HIGHLIGHT_TRANSITION_DURATION = 'duration-50';