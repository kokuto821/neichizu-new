import { ReactNode } from 'react';
import { CONTAINER_WIDTH_CLASS } from '@/app/styles/layoutConstants';

type Props = {
  children: ReactNode;
};

/**
 * 画面下部のUI要素（カード、ナビゲーション）の共通レイアウトコンテナ
 * 横幅を統一管理する
 */
export const BottomUIContainer = ({ children }: Props) => {
  const style = {
    absoluteContainer: `absolute bottom-0 left-1/2 -translate-x-1/2 pb-4 ${CONTAINER_WIDTH_CLASS}`,
    flexContainer: `flex flex-col gap-2 items-center`
  }
  return (
    <div className={style.absoluteContainer}>
      <div className={style.flexContainer}>
        {children}
      </div>
    </div>
  );
};
