import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CombinedFeatureProperties } from '@/app/feature/map/types/types';
import { usePopupVisible } from '@/app/feature/map/hyakumeizan/hooks/usePopupVisible';
import { color } from '@/app/css/color';

type Props = {
  selectedFeature: CombinedFeatureProperties | null;
  children: (feature: CombinedFeatureProperties) => React.ReactNode;
};

export const PopupCard = ({ selectedFeature, children }: Props) => {
  const { isVisible, shouldRender, displayFeature } =
    usePopupVisible(selectedFeature);

  // フェードアウトアニメーション完了後にアンマウント
  if (!shouldRender || !displayFeature) return null;

  return (
    <div
      className="pt-0 px-[5%] pb-[12.5vh] md:px-[20%] absolute bottom-0 left-0 w-full transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: color.EcruWhite,
        }}
      >
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2px 0px 2px 2px',
            flex: 1,
          }}
        >
          {children(displayFeature)}
        </Box>
      </Card>
    </div>
  );
};
