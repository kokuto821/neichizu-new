import { FC, ReactNode } from 'react';

type NeiIconButtonProps = {
  children: ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
};

export const NeiIconButton: FC<NeiIconButtonProps> = ({
  children,
  onClick,
  disabled = false,
  isActive = false,
  className,
}) => {
  const style = {
    NeiIconBtn:
      'bg-ecruWhite border border-gray  rounded-[20px] w-[40px] h-[40px]  transition-colors flex justify-center items-center',
    active: 'text-accentOrange',
    inactive: 'text-semiDarkGreen lg:hover:text-lightGreen',
  };

  const buttonStyle = isActive ? style.active : style.inactive;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${style.NeiIconBtn} ${buttonStyle} ${className || ''}`}
    >
      {children}
    </button>
  );
};
