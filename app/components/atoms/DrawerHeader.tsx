import { color } from '@/app/css/color';
import { FC } from 'react';
import Image from 'next/image';
import { NeiIconButton } from '../molecules/NeiIconButton';

const style = {
  background: 'flex items-center justify-center relative w-full h-auto',
  closeButton:
    'bg-white p-2 rounded-full hover:bg-gray-100 transition-colors absolute top-4 right-4  opacity-80',
  closeIcon: 'w-6 h-6 text-gray-600',
};

export const DrawerHeader: FC<{
  onClose: () => void;
  imagePath: string;
}> = ({ onClose, imagePath }) => {
  return (
    <div
      className={style.background}
      style={{ backgroundColor: color.LightGreen }}
    >
      <Image
        src={imagePath}
        alt="Logo Icon"
        height={300}
        width={300}
        style={{ objectFit: 'contain' }}
      />
      <NeiIconButton
        onClick={onClose}
        className="absolute top-4 right-4 opacity-80"
        aria-label="閉じる"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </NeiIconButton>
    </div>
  );
};
