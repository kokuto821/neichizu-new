import { FC } from 'react';

type NeiButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  label?: string;
};

export const NeiButton: FC<NeiButtonProps> = ({ onClick, isActive, label }) => {
  const style = {
    base: 'text-sm px-4 py-2 rounded transition-colors shadow-lg ease-in-out duration-200',
    active: 'bg-accentLightOrange text-ecruWhite',
    inactive: 'bg-semiDarkGreen text-ecruWhite lg:hover:bg-middleGreen',
  };

  const buttonStyle = isActive ? style.active : style.inactive;

  return (
    <button onClick={onClick} className={`${style.base} ${buttonStyle}`}>
      {label}
    </button>
  );
};
