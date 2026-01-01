import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CombinedFeatureProperties } from '@/app/feature/map/types/types';
import { usePopupVisible } from '@/app/feature/map/hyakumeizan/hooks/usePopupVisible';

type Props = {
  selectedFeature: CombinedFeatureProperties | null;
  children: (feature: CombinedFeatureProperties) => React.ReactNode;
};

export const PopupCard = ({ selectedFeature, children }: Props) => {
  const { isVisible, shouldRender, displayFeature } =
    usePopupVisible(selectedFeature);

  const style = {
    cardWrapper: `pt-0 px-[5%] pb-[12.5vh] md:px-[20%] absolute bottom-0 left-0 w-full transition-opacity duration-300 ${
      isVisible
        ? 'opacity-100 pointer-events-auto'
        : 'opacity-0 pointer-events-none'
    }`,
    card: 'flex items-center bg-ecruWhite',
    cardContentRight: 'flex flex-col pt-[2px] pr-0 pb-[2px] pl-[10px] flex-1',
  };

  // フェードアウトアニメーション完了後にアンマウント
  if (!shouldRender || !displayFeature) return null;

  return (
    <div className={style.cardWrapper}>
      <Card className={style.card}>
        {displayFeature.image && (
          <CardMedia
            component="img"
            sx={{
              width: 151,
              height: 130,
            }}
            image={displayFeature.image}
            alt={displayFeature.name}
          />
        )}
        <div className={style.cardContentRight}>{children(displayFeature)}</div>
      </Card>
    </div>
  );
};
