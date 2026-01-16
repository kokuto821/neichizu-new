import { Dispatch, SetStateAction } from 'react';
import { SwipeableDrawer } from './SwipeableDrawer';
import { DrawerContent } from '../atoms/DrawerContent';
import { NavigationItem } from '../atoms/NavigationItem';

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
  const style = {
    unvisualContainer: `pt-0 px-[5vw] pb-[10px] md:px-[20vw] absolute bottom-0 left-0 w-full`,
    navigationWrapper:
      'h-[10vh] p-[5px] rounded-xl flex gap-2 items-center bg-semiDarkGreen  shadow-md',
    navigationList:
      'flex gap-2 overflow-scroll overflow-y-hidden hidden-scrollbar h-full',
  };

  return (
    <div className={style.unvisualContainer}>
      <div className={style.navigationWrapper}>
        <div className={style.navigationList}>
          <SwipeableDrawer imagePath={'/img/hyakumeizan-eyecatch.png'}>
            <DrawerContent>
              Neichizu(ねいちず)は日本百名山やジオパークなど日本の自然スポットにまつわる地点をまとめた地図です。
            </DrawerContent>
          </SwipeableDrawer>
          <NavigationItem
            imagePath="/img/mountain.png"
            label="百名山"
            onClick={() => {
              setIsVectorVisible(!isVectorVisible);
            }}
            isVisible={isVectorVisible}
          />
          <NavigationItem
            imagePath="/img/geopark_w.png"
            label="世界ジオパーク"
            onClick={() => {
              setIsGeoparkVisible(!isGeoparkVisible);
            }}
            isVisible={isGeoparkVisible}
          />
          <NavigationItem label="Hello" />
          <NavigationItem label="Hello" />
          <NavigationItem label="Hello" />
        </div>
      </div>
    </div>
  );
};
