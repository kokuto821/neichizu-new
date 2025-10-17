import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FeatureProperties } from '@/app/feature/map/hyakumeizan/types/types';
import Link from 'next/link';
import { usePopupVisible } from '@/app/feature/map/hyakumeizan/hooks/usePopupVisible';
import { color } from '@/app/css/color';

type Props = {
  selectedFeature: FeatureProperties | null;
};

export const PopupCard = ({ selectedFeature }: Props) => {
  const { isVisible, shouldRender, displayFeature } = usePopupVisible(selectedFeature);

  // フェードアウトアニメーション完了後にアンマウント
  if (!shouldRender) return null;

  return (
    <div
      className="pt-0 px-[5%] pb-[110px] md:px-[20%] absolute bottom-0 left-0 w-full transition-opacity duration-300"
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
        {displayFeature?.image && (
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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ padding: '0px 0px 0px 10px' }}>
            <Typography component="div" variant="h5">
              {displayFeature?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              {displayFeature?.area} {displayFeature?.height}
            </Typography>
            <Link href={displayFeature?.googlemaplink || '#'} target="_blank">
              <Image
                className="link-img-logo"
                src={'/img/g_map_logo.png'}
                alt={'googleMap'}
                width={110}
                height={110}
              />
            </Link>
            <Link href={displayFeature?.YAMAP || '#'} target="_blank">
              <Image
                className="link-img-logo"
                src={'/img/yamap-logo.png'}
                alt={'Yamap'}
                width={110}
                height={110}
              />
            </Link>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};
