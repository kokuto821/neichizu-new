import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import { usePopupVisible } from '@/app/feature/map/hyakumeizan/hooks/usePopupVisible';
import { WGeoparkFromSelected } from '@/app/feature/map/geopark/types/types';
import { HyakumeizanFromSelected } from '@/app/feature/map/hyakumeizan/types/types';
import { GeoparkFeatureContent } from './GeoparkFeatureContent';
import { MountainFeatureContent } from './MountainFeatureContent';

type Props = {
  selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null;
};

export const PopupCard = ({ selectedFeature }: Props) => {
  const { isVisible, shouldRender, displayFeature } =
    usePopupVisible(selectedFeature);

  const style = {
    cardWrapper: `pt-0 px-[5%] pb-[12.5vh] md:px-[20%] absolute bottom-0 left-0 w-full transition-opacity duration-300 ${
      isVisible
        ? 'opacity-100 pointer-events-auto'
        : 'opacity-0 pointer-events-none'
    }`,
    card: 'bg-ecruWhite flex items-center ',
    neiCard:
      'flex items-center bg-ecruWhite border rounded-lg shadow-sm border-neutral-200/60 overflow-hidden',
    cardContentRight: 'flex flex-col pt-[2px] pr-0 pb-[2px] pl-[10px] flex-1',
  };

  // 型ガード関数
  const isWGeopark = (
    f: HyakumeizanFromSelected | WGeoparkFromSelected
  ): f is WGeoparkFromSelected => {
    return (f as WGeoparkFromSelected).comment !== undefined;
  };

  const isHyakumeizan = (
    f: HyakumeizanFromSelected | WGeoparkFromSelected
  ): f is HyakumeizanFromSelected => {
    return (f as HyakumeizanFromSelected).height !== undefined;
  };

  // フェードアウトアニメーション完了後にアンマウント
  if (!shouldRender || !displayFeature) return null;

  return (
    <div className={style.cardWrapper}>
      {/* <Card className={style.card}> */}
      <div className={style.neiCard}>
        {displayFeature.image && (
          <CardMedia
            className="rounded-l-lg object-cover block"
            component="img"
            sx={{
              width: 152, // 1px大きくする
              height: 131, // 1px大きくする
              marginLeft: '-1px', // ボーダーに被せる
              marginTop: '-0.5px',
              marginBottom: '-0.5px',
            }}
            image={displayFeature.image}
            alt={displayFeature.name}
          />
        )}
        <div className={style.cardContentRight}>
          {isWGeopark(displayFeature) ? (
            <GeoparkFeatureContent
              name={displayFeature.name}
              area={displayFeature.area}
              comment={displayFeature.comment}
              googlemaplink={displayFeature.googlemaplink}
              website={displayFeature.website}
            />
          ) : isHyakumeizan(displayFeature) ? (
            <MountainFeatureContent
              name={displayFeature.name}
              area={displayFeature.area}
              height={displayFeature.height}
              googlemaplink={displayFeature.googlemaplink}
              YAMAP={displayFeature.YAMAP}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
