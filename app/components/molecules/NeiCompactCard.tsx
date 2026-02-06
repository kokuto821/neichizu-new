import { usePopupVisible, FADE_IN_DELAY, FADE_OUT_DURATION } from '@/app/feature/map/hyakumeizan/hooks/usePopupVisible';
import { WGeoparkFromSelected } from '@/app/feature/map/geopark/types/types';
import { HyakumeizanFromSelected } from '@/app/feature/map/hyakumeizan/types/types';
import { GeoparkFeatureContent } from './GeoparkFeatureContent';
import { MountainFeatureContent } from './MountainFeatureContent';
import { motion, AnimatePresence } from 'framer-motion';
import { FC, useRef } from 'react';

type Props = {
  selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null;
  onExpand: () => void;
  fadeInDelay?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onDeselect?: () => void;
  swipeDirection?: 'left' | 'right' | null;
};

const cardVariants = {
  enter: (direction: 'left' | 'right' | null) => ({
    x: direction === 'left' ? 300 : direction === 'right' ? -300 : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: (direction: 'left' | 'right' | null) => ({
    x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
    opacity: 0,
  }),
};

export const NeiCompactCard: FC<Props> = ({
  selectedFeature,
  onExpand,
  fadeInDelay,
  onSwipeLeft,
  onSwipeRight,
  onDeselect,
  swipeDirection,
}) => {
  const { isVisible, shouldRender, displayFeature } =
    usePopupVisible(selectedFeature, {
      fadeInDelay: fadeInDelay ?? FADE_IN_DELAY,
      fadeOutDuration: FADE_OUT_DURATION,
    });
  
  const containerRef = useRef<HTMLDivElement>(null);

  const style = {
    cardWrapper: `pt-0 transition-opacity duration-300 ${isVisible
      ? 'opacity-100 pointer-events-auto'
      : 'opacity-0 pointer-events-none'
      }`,
    neiCard:
      'flex items-center bg-ecruWhite rounded-xl shadow-md overflow-hidden touch-pan-y relative',
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
       <AnimatePresence mode="wait" custom={swipeDirection}>
        <motion.div
           key={displayFeature.id}
          className={style.neiCard}
          ref={containerRef}
          custom={swipeDirection}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={onExpand}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          drag
          dragDirectionLock
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            const { offset } = info;
            const swipeThreshold = 50;
            // 縦スワイプと判定するための係数（横移動の1.2倍以上の縦移動が必要）
            const verticalThresholdFactor = 1.2;

            // 縦方向の判定 (横方向よりも明らかに縦移動が大きい場合のみ)
            if (Math.abs(offset.y) > Math.abs(offset.x) * verticalThresholdFactor) {
              if (offset.y < -swipeThreshold) {
                onExpand(); // 上へスワイプで展開
              } else if (offset.y > swipeThreshold) {
                onDeselect?.(); // 下へスワイプで閉じる
              }
            }
            // 横方向の判定 (縦方向が優先でない場合)
            else if (Math.abs(offset.x) > swipeThreshold) {
              if (offset.x < 0) {
                onSwipeLeft?.(); // 左スワイプ（次へ）
              } else {
                onSwipeRight?.(); // 右スワイプ（前へ）
              }
            }
          }}
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
      </AnimatePresence>
    </div>
  );
};
