import { FC, ReactNode } from 'react';

const style = {
  text: 'p-4 pt-8 text-gray-800 dark:text-gray-800',
};

type Props = {
  children: ReactNode;
};

// ドロワー本文
export const DrawerContent: FC<Props> = ({ children }) => (
  <span className={style.text}>{children}</span>
);
