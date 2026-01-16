import { ReactNode } from 'react';
import { WIDTH_CLASS } from '@/app/styles/layoutConstants';

type Props = {
  children: ReactNode;
};

/**
 * 画面下部のUI要素（カード、ナビゲーション）の共通レイアウトコンテナ
 * 横幅を統一管理する
 */
export const BottomUIContainer = ({ children }: Props) => {
  const style = {
    absoluteContainer: `absolute bottom-0 left-1/2 -translate-x-1/2 pb-2 ${WIDTH_CLASS}`,
    flexContainer: `flex flex-col gap-4`
  }
  return (
    <div className={style.absoluteContainer}>
      <div className={style.flexContainer}>
        {children}
      </div>
    </div>
  );
};
