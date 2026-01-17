import { usePopupVisible, FADE_IN_DELAY, FADE_OUT_DURATION } from '@/app/feature/map/hyakumeizan/hooks/usePopupVisible';
import { WGeoparkFromSelected } from '@/app/feature/map/geopark/types/types';
import { HyakumeizanFromSelected } from '@/app/feature/map/hyakumeizan/types/types';
import { GeoparkFeatureContent } from './GeoparkFeatureContent';
import { MountainFeatureContent } from './MountainFeatureContent';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { FC } from 'react';

type Props = {
  selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null;
  onExpand: () => void;
  fadeInDelay?: number;
};

export const NeiCompactCard: FC<Props> = ({
  selectedFeature,
  onExpand,
  fadeInDelay,
}) => {
  const { isVisible, shouldRender, displayFeature } =
    usePopupVisible(selectedFeature, {
      fadeInDelay: fadeInDelay ?? FADE_IN_DELAY,
      fadeOutDuration: FADE_OUT_DURATION,
    });

  const style = {
    cardWrapper: `pt-0 transition-opacity duration-300 ${isVisible
      ? 'opacity-100 pointer-events-auto'
      : 'opacity-0 pointer-events-none'
      }`,
    neiCard:
      'flex items-center bg-ecruWhite rounded-xl shadow-md overflow-hidden',
    cardImage:
      'w-[152px] h-[131px] flex-shrink-0 rounded-l-xl object-cover block',
    cardContentRight:
      'flex flex-1 flex-col flex-[3] pt-[2px] pr-0 pb-[2px] pl-[10px]',
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
      <motion.div
        className={style.neiCard}
        layoutId={`card-${displayFeature.id}`}
        onClick={onExpand}
        onDragEnd={(_, info) => {
          if (info.offset.y < -50) {
            onExpand();
          }
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 0.5, times: [0, 0.5, 1] }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {displayFeature.image && (
          <img
            className={style.cardImage}
            src={displayFeature.image}
            alt={displayFeature.name}
          />
        )}
        <div className={style.cardContentRight}>
          {isWGeopark(displayFeature) ? (
            <GeoparkFeatureContent
              id={String(displayFeature.id)}
              name={displayFeature.name}
              area={displayFeature.area}
              comment={displayFeature.comment}
              googlemaplink={displayFeature.googlemaplink}
              website={displayFeature.website}
            />
          ) : isHyakumeizan(displayFeature) ? (
            <MountainFeatureContent
              id={String(displayFeature.id)}
              name={displayFeature.name}
              area={displayFeature.area}
              height={displayFeature.height}
              googlemaplink={displayFeature.googlemaplink}
              YAMAP={displayFeature.YAMAP}
            />
          ) : null}
        </div>
      </motion.div>
    </div>
  );
};
