// タイトルボタン
import { color } from '@/app/css/color';
import Image from 'next/image';
import { FC } from 'react';

const style = {
  button: 'inline-flex items-center gap-2',
  imageContainer: 'flex items-center justify-center',
  image: { minWidth: 25, minHeight: 25 },
  text: 'font-bold',
};

type Props = {
  titleText: string;
  titleImagePath: string;
  textColor?: string;
  altText?: string;
  onClick?: () => void;
};

export const NavigationTitle: FC<Props> = ({
  titleText,
  titleImagePath,
  textColor = color.EcruWhite,
  altText = 'Logo Icon',
  onClick,
}) => {
  return (
    <button onClick={onClick} className={style.button}>
      <div
        className={style.imageContainer}
        style={{
          minWidth: style.image.minWidth,
          minHeight: style.image.minHeight,
        }}
      >
        <Image
          src={titleImagePath}
          width={style.image.minWidth}
          height={style.image.minHeight}
          alt={altText}
        />
      </div>
      <span className={style.text} style={{ color: textColor }}>
        {titleText}
      </span>
    </button>
  );
};
