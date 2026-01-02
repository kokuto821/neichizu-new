import { FC } from 'react';
import Image from 'next/image';
import { CiImageOff } from 'react-icons/ci';

type Props = {
  /** 画像パス */
  imagePath?: string;
  /* ボタンのラベル*/
  label: string;
  /** クリックされたときの処理 */
  onClick?: () => void;
  /** ボタンが選択されてるかどうか */
  isVisible?: boolean;
};

export const NavigationItem: FC<Props> = ({
  imagePath,
  label,
  onClick,
  isVisible,
}) => {
  const style = {
    navigationImageWrapper: 'flex flex-col justify-center items-center',
    navigationItem:
      'bg-ecruWhite inline-flex flex-col items-center justify-center w-auto rounded-xl cursor-pointer border-4 px-2',
    navigationItemButton:
      'whitespace-nowrap text-xs flex-col text-semiDarkGreen',
  };
  return (
    <div
      className={`${style.navigationItem} ${isVisible ? 'border-lightGreen' : 'border-transparent'}`}
    >
      <button className={style.navigationItemButton} onClick={onClick}>
        <div className={style.navigationImageWrapper}>
          {imagePath ? (
            <Image src={imagePath} width={30} height={30} alt={label} />
          ) : (
            <CiImageOff />
          )}
        </div>
        {label}
      </button>
    </div>
  );
};
