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

// 百名山とジオパークの両方に対応する型
type CombinedFeatureProperties = FeatureProperties & {
  category?: string;
  comment?: string;
  website?: string;
};

type Props = {
  selectedFeature: CombinedFeatureProperties | null;
};

export const PopupCard = ({ selectedFeature }: Props) => {
  const { isVisible, shouldRender, displayFeature } =
    usePopupVisible(selectedFeature);

  // デバッグ用ログ
  if (displayFeature) {
    console.log('PopupCard displayFeature:', {
      name: displayFeature.name,
      category: displayFeature.category,
      comment: displayFeature.comment,
      website: displayFeature.website,
    });
  }

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2px 0px 2px 2px',
          }}
        >
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

            {/* ジオパーク用の追加情報 */}
            {displayFeature?.category && (
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mt: 0.5 }}
              >
                区分: {displayFeature.category}
              </Typography>
            )}
            {displayFeature?.comment && (
              <Typography
                variant="body2"
                sx={{ mt: 0.5, fontSize: '0.875rem' }}
              >
                {displayFeature.comment}
              </Typography>
            )}

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <Link href={displayFeature?.googlemaplink || '#'} target="_blank">
                <Image
                  className="link-img-logo"
                  src={'/img/g_map_logo.png'}
                  alt={'googleMap'}
                  width={110}
                  height={110}
                />
              </Link>

              {/* 百名山の場合はYAMAPリンク */}
              {displayFeature?.YAMAP && (
                <Link href={displayFeature.YAMAP} target="_blank">
                  <Image
                    className="link-img-logo"
                    src={'/img/yamap-logo.png'}
                    alt={'Yamap'}
                    width={110}
                    height={110}
                  />
                </Link>
              )}

              {/* ジオパークの場合は公式サイトリンク */}
              {displayFeature?.website && (
                <Link href={displayFeature.website} target="_blank">
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'underline',
                      fontSize: '0.75rem',
                    }}
                  >
                    公式サイト →
                  </Typography>
                </Link>
              )}
            </Box>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};
