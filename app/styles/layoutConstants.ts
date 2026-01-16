/**
 * アプリケーション全体で使用する共通レイアウト定数
 */

/**
 * カード、ナビゲーションなどの横幅を統一するための水平パディング
 */
export const LAYOUT_HORIZONTAL_PADDING = {
  mobile: '5vw',
  desktop: '20vw',
} as const;



/**
 * 使用例: className={`fixed ${HORIZONTAL_POSITION_CLASS} inset-y-4`}
 */
export const HORIZONTAL_POSITION_CLASS = 'left-[5vw] right-[5vw] md:left-[20vw] md:right-[20vw]';

/**
 * 幅を指定して中央揃えにするためのクラス
 * paddingではなくwidthで幅を決めたい場合に使用
 */
export const LAYOUT_WIDTH = {
  mobile: '90vw',   // 100vw - 5vw * 2
  desktop: '65vw',  // 100vw - 20vw * 2
} as const;

export const WIDTH_CLASS = 'w-[90vw] md:w-[65vw]';
