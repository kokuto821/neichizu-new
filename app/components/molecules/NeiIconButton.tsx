import { FC, ReactNode } from 'react';

type NeiIconButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
};

export const NeiIconButton: FC<NeiIconButtonProps> = ({
  children,
  onClick,
  disabled = false,
  isActive = false,
}) => {
  const style = {
    NeiIconBtn:
      'text-semiDarkGreen bg-ecruWhite border border-gray  rounded-[20px] w-[40px] h-[40px]  transition-colors flex justify-center items-center',
    active: 'text-accentOrange',
    inactive: 'text-semiDarkGreen lg:hover:text-lightGreen',
  };

  const buttonStyle = isActive ? style.active : style.inactive;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${style.NeiIconBtn} ${buttonStyle}`}
    >
      {children}
    </button>
  );
};
