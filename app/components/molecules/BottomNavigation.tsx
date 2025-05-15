import { color } from '@/app/css/color';
import { FC, ReactNode } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';

import { Dispatch, SetStateAction } from 'react';

export const BottomNavigation = ({
  isVectorVisible,
  setIsVectorVisible,
}: {
  isVectorVisible: boolean;
  setIsVectorVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const UnvisualContainer: FC<{
    children: ReactNode;
  }> = ({ children }) => {
    return (
      <div className="pt-0 px-[5%] pb-[1.25vh] md:px-[20%] absolute bottom-0 left-0 w-full">
        {children}
      </div>
    );
  };

  const NavigationWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <div
        className="p-[5px] border rounded-xl flex gap-2 alngn-center shadow-xl-2"
        style={{
          backgroundColor: color.SemiDarkGreen,
          borderColor: color.Gray,
        }}
      >
        {children}
      </div>
    );
  };

  const NavigationList: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <div className="flex gap-2 overflow-scroll overflow-y-hidden hidden-scrollbar">
        {children}
      </div>
    );
  };

  const NavigationItem: FC<{
    children: ReactNode;
    onClick?: () => void;
    isVisible?: boolean;
  }> = ({ children, onClick, isVisible }) => {
    return (
      <div
        className="flex flex-col items-center justify-center text-xs rounded-xl cursor-pointer border-4"
        style={{
          color: color.SemiDarkGreen,
          backgroundColor: color.Gray,
          borderColor: isVisible ? color.LightGreen : 'transparent',
        }}
      >
        <Button
          className="flex-col"
          sx={{ color: color.SemiDarkGreen }}
          onClick={onClick}
        >
          {children}
        </Button>
      </div>
    );
  };

  const NavigationTitle: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <>
        <div className="flex items-center justify-center">
          <Image src="/img/logo.png" width={25} height={25} alt="Logo Icon" />
        </div>
        <h2
          className="flex items-center justify-center font-bold"
          style={{ color: color.EcruWhite }}
        >
          {children}
        </h2>
      </>
    );
  };

  const NavigationImageWrapper: FC<{ children: ReactNode }> = ({
    children,
  }) => {
    return (
      <div className="w-[50px] h-[30px] flex flex-col justify-center items-center">
        {children}
      </div>
    );
  };

  return (
    <UnvisualContainer>
      <NavigationWrapper>
        <NavigationTitle>Neichizu</NavigationTitle>
        <NavigationList>
          <NavigationItem
            onClick={() => {
              setTimeout(() => setIsVectorVisible(!isVectorVisible), 300);
            }}
            isVisible={isVectorVisible}
          >
            <NavigationImageWrapper>
              <Image
                src="/img/mountain.png"
                width={30}
                height={30}
                alt="Logo Icon"
              />
            </NavigationImageWrapper>
            百名山
          </NavigationItem>
          <NavigationItem>Hello</NavigationItem>
          <NavigationItem>Hello</NavigationItem>
          <NavigationItem>Hello</NavigationItem>
          <NavigationItem>Hello</NavigationItem>
        </NavigationList>
      </NavigationWrapper>
    </UnvisualContainer>
  );
};
