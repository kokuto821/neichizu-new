import { NeiIconButton } from '../molecules/NeiIconButton';

type Props = {
  onClose: () => void;
  className?: string;
}

const style = {
  button: 'absolute top-4 right-4 opacity-80',
  icon: 'w-6 h-6 block',
};

export const NeiCloseButton = ({ onClose, className }: Props) => {
  return (
    <NeiIconButton
      onClick={onClose}
      className={className || style.button}
      aria-label="閉じる"
    >
      <svg
        className={style.icon}
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
  );
};
