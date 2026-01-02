import { FC, ReactNode } from 'react';

const style = {
  footerWrapper:
    'p-4 border-t border-gray flex items-center justify-center mt-auto',
  center: 'text-center',
};

type Props = {
  children: ReactNode;
};

// ドロワーフッター
export const DrawerFooter: FC<Props> = ({ children }) => (
  <div className={style.footerWrapper}>
    <p className={style.center}>{children}</p>
  </div>
);
