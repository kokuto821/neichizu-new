import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FeatureProperties } from '@/app/feature/map/hyakumeizan/types/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  selectedFeature: FeatureProperties | null;
};

export const PopupCard = ({ selectedFeature }: Props) => {
  const [isVisible, setIsVisible] = useState(false); // 表示状態を管理するステート

  useEffect(() => {
    if (selectedFeature) {
      // 0.5秒後に表示状態をtrueにする
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);

      // クリーンアップ関数でタイマーをクリア
      return () => {
        clearTimeout(timer);
        setIsVisible(false); // 表示状態をリセット
      };
    } else {
      setIsVisible(false); // selectedFeatureがnullの場合は非表示
    }
  }, [selectedFeature]);
  return (
    <div
      className="pt-0 px-[5%] pb-[4vh] md:px-[20%]"
      style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        visibility: isVisible ? 'visible' : 'hidden', // isVisibleステートで制御
        transition: 'visibility 0.3s ease', // 必要に応じてトランジションを追加
      }}
    >
      <Card sx={{ display: 'flex', alignItems: 'center' }}>
        {selectedFeature?.image && (
          <CardMedia
            component="img"
            sx={{
              width: 151,
              height: 130,
            }}
            image={selectedFeature.image}
            alt={selectedFeature.name}
          />
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ padding: '0px 0px 0px 10px' }}>
            <Typography component="div" variant="h5">
              {selectedFeature?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              {selectedFeature?.area} {selectedFeature?.height}
            </Typography>
            <Link href={selectedFeature?.googlemaplink || '#'} target="_blank">
              <Image
                className="link-img-logo"
                src={'/img/g_map_logo.jpg'}
                alt={'googleMap'}
                width={110}
                height={110}
              />
            </Link>
            <Link href={selectedFeature?.YAMAP || '#'} target="_blank">
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
