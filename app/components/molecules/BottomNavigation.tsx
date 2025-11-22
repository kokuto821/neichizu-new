import { color } from '@/app/css/color';
import { FC, ReactNode } from 'react';
import Image from 'next/image';

import { Button } from '@mui/material';

import { Dispatch, SetStateAction } from 'react';
import { SwipeableDrawer } from './SwipeableDrawer';

export const BottomNavigation = ({
  isVectorVisible,
  setIsVectorVisible,
  isGeoparkVisible,
  setIsGeoparkVisible,
}: {
  isVectorVisible: boolean;
  setIsVectorVisible: Dispatch<SetStateAction<boolean>>;
  isGeoparkVisible: boolean;
  setIsGeoparkVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const UnvisualContainer: FC<{
    children: ReactNode;
  }> = ({ children }) => {
    return (
      <div className="pt-0 px-[5%] pb-[10px] md:px-[20%] absolute bottom-0 left-0 w-full">
        {children}
      </div>
    );
  };

  const NavigationWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <div
        className="h-[10vh] p-[5px] rounded-xl flex gap-2 alngn-center"
        style={{
          backgroundColor: color.SemiDarkGreen,
          boxShadow:
            '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
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
          backgroundColor: color.EcruWhite,
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
        <NavigationList>
          <SwipeableDrawer />
          <NavigationItem
            onClick={() => {
              console.log(
                '🖱️ [BottomNav] 百名山クリック - 現在:',
                isVectorVisible,
                '→ 変更後:',
                !isVectorVisible
              );
              setIsVectorVisible(!isVectorVisible);
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
          <NavigationItem
            onClick={() => {
              console.log(
                '🖱️ [BottomNav] ジオパーククリック - 現在:',
                isGeoparkVisible,
                '→ 変更後:',
                !isGeoparkVisible
              );
              setIsGeoparkVisible(!isGeoparkVisible);
            }}
            isVisible={isGeoparkVisible}
          >
            <NavigationImageWrapper>
              <Image
                src="/img/geopark_w.png"
                width={30}
                height={30}
                alt="Geopark Icon"
              />
            </NavigationImageWrapper>
            <span className="text-[10px] sm:text-xs whitespace-nowrap">
              世界ジオパーク
            </span>
          </NavigationItem>
          <NavigationItem>Hello</NavigationItem>
          <NavigationItem>Hello</NavigationItem>
          <NavigationItem>Hello</NavigationItem>
        </NavigationList>
      </NavigationWrapper>
    </UnvisualContainer>
  );
};
