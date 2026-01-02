import { FC } from 'react';

type Props = {
  isOpen: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const style = {
  backdrop: 'fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity',
};

/**
 * バックドロップコンポーネント
 * モーダルやドロワーの背後に表示される半透明のオーバーレイ。
 * 主な目的は背景コンテンツとの操作を遮断して注目を集めること（フォーカス保持）。
 */
export const NeiBackdrop: FC<Props> = ({ isOpen, onClick }) =>
  isOpen ? <div className={style.backdrop} onClick={onClick} /> : null;
