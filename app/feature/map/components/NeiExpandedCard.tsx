import { WGeoparkFromSelected } from '@/app/feature/map/types/geoparkTypes';
import { HyakumeizanFromSelected } from '@/app/feature/map/types/hyakumeizanTypes';
import { motion, AnimatePresence } from 'framer-motion';
import { NeiCloseButton } from '@/app/components/atoms/NeiCloseButton';
import { usePopupVisible } from '@/app/feature/map/hooks/usePopupVisible';
import { LinkIcon } from '@/app/components/atoms/LinkIcon';
import { INNER_WIDTH_CLASS } from '@/app/styles/layoutConstants';
import { SLIDE_ANIMATION_OFFSET_PX, SLIDE_ANIMATION_DURATION_S } from '@/app/feature/map/constants/carouselConstants';
import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSwipe } from '@/app/hooks/useSwipe';

type ExpandedCardProps = {
  selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null;
  isExpanded: boolean;
  onClose: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  onGoNext: () => void;
  onGoPrev: () => void;
  swipeDirection?: 'left' | 'right' | null;
}

const style = {
  overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40',
  wrapper:
    'fixed inset-0 z-50 flex items-center justify-center pointer-events-auto overscroll-none',
  container: `${INNER_WIDTH_CLASS} h-[80vh] rounded-2xl shadow-2xl bg-ecruWhite flex flex-col overflow-y-auto overscroll-none pointer-events-auto relative touch-pan-y hidden-scrollbar`,
  imageWrapper: 'relative w-full flex-shrink-0',
  contentWrapper: 'p-4 md:p-6',
  title: 'text-2xl md:text-3xl font-bold',
  image: 'block w-full h-[40vh] object-cover',
  description: 'text-lg mb-8 text-gray-700',
  detailsWrapper: 'flex flex-col gap-4',
  detailsTitle: 'text-xl font-semibold mb-4',
  detailsText: 'leading-relaxed text-gray-700',
  grid: 'grid grid-cols-2 gap-4',
  featureCard: 'bg-semiDarkGreen rounded-lg p-4 pt-3 shadow-sm',
  featureTitle: 'font-semibold mb-2 text-ecruWhite',
  featureDescription: 'text-ecruWhite text-sm',
  linkContainer: 'flex gap-4',
  linkCard:
    'bg-ecruWhite rounded-lg p-2 flex items-center gap-1 justify-center shadow-sm w-fit text-semiDarkGreen',
};

type SwipeDirection = 'left' | 'right' | null;

export const NeiExpandedCard: React.FC<ExpandedCardProps> = ({
  selectedFeature,
  isExpanded,
  onClose,
  canGoNext,
  canGoPrev,
  onGoNext,
  onGoPrev,
  swipeDirection,
}) => {
  const { isVisible, shouldRender, displayFeature } = usePopupVisible(
    isExpanded ? selectedFeature : null,
    {
      fadeOutDuration: 500,
    }
  );
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // スワイプナビゲーション
  const { onTouchStart, onTouchMove, onTouchEnd, onMouseDown } =
    useSwipe({
      onSwipeDown: onClose,
      onSwipeLeft: canGoNext ? onGoNext : undefined,
      onSwipeRight: canGoPrev ? onGoPrev : undefined,
      threshold: 50,
      containerRef: containerRef,
      disableLeftSwipe: !canGoNext,
      disableRightSwipe: !canGoPrev,
    });

  const handleCardWrapperClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) onClose();
  };

  useEffect(() => {
    setMounted(true);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!shouldRender || !displayFeature || !mounted) return null;

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

  // カード切り替えアニメーション
  const cardVariants = {
    enter: (direction: SwipeDirection) => ({
      x: direction === 'left' ? SLIDE_ANIMATION_OFFSET_PX : direction === 'right' ? -SLIDE_ANIMATION_OFFSET_PX : 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: SwipeDirection) => ({
      x: direction === 'left' ? -SLIDE_ANIMATION_OFFSET_PX : direction === 'right' ? SLIDE_ANIMATION_OFFSET_PX : 0,
      opacity: 0,
    }),
  };

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={style.overlay}
            onClick={onClose}
          />
          <motion.div
            key="wrapper"
            className={style.wrapper}
            onClick={handleCardWrapperClick}
          >
            <AnimatePresence mode="wait" custom={swipeDirection}>
              <motion.div
                key={displayFeature.id}
                ref={containerRef}
                custom={swipeDirection}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: SLIDE_ANIMATION_DURATION_S, ease: 'easeInOut' }}
                className={style.container}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
              >
                <motion.div className={style.imageWrapper}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <NeiCloseButton onClose={onClose} />
                  </motion.div>

                  <motion.img
                    src={displayFeature.image || '/img/hyakumeizan/noimage-1-760x460.png'}
                    alt={displayFeature.name}
                    className={style.image}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onError={(e) => { e.currentTarget.src = '/img/hyakumeizan/noimage-1-760x460.png'; }}
                  />
                </motion.div>

                <motion.div className={style.contentWrapper}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: SLIDE_ANIMATION_DURATION_S }}
                    className={style.detailsWrapper}
                  >
                    <motion.h2
                      layoutId={`title-${displayFeature.id}`}
                      className={style.title}
                    >
                      {displayFeature.name}
                    </motion.h2>
                    {isWGeopark(displayFeature) && (
                      <>
                        <p className={style.detailsText}>
                          {displayFeature.comment}
                        </p>
                        <div className={style.grid}>
                          <div className={style.featureCard}>
                            <h4 className={style.featureTitle}>エリア</h4>
                            <p className={style.featureDescription}>
                              {displayFeature.area}
                            </p>
                          </div>
                          
                        </div>
                      </>
                    )}

                    {isHyakumeizan(displayFeature) && (
                      <>
                        <div className={style.grid}>
                          <div className={style.featureCard}>
                            <h4 className={style.featureTitle}>エリア</h4>
                            <p className={style.featureDescription}>
                              {displayFeature.area}
                            </p>
                          </div>
                          <div className={style.featureCard}>
                            <h4 className={style.featureTitle}>標高</h4>
                            <p className={style.featureDescription}>
                              {displayFeature.height}
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    <div className={style.featureCard}>
                      <h4 className={style.featureTitle}>リンク</h4>
                      <div className={style.linkContainer}>
                        <div className={style.linkCard}>
                          <LinkIcon
                            href={displayFeature.googlemaplink}
                            src="/img/g_map_logo.svg"
                            alt="Google Map"
                          />
                        </div>
                        {isHyakumeizan(displayFeature) &&
                          displayFeature.YAMAP && (
                            <div className={style.linkCard}>
                              <LinkIcon
                                href={displayFeature.YAMAP}
                                src="/img/yamap-logo.svg"
                                alt="YAMAP"
                              />
                            </div>
                          )}
                        {isWGeopark(displayFeature) &&
                          displayFeature.website && (
                            <div className={style.linkCard}>
                              <LinkIcon
                                href={displayFeature.website}
                                src="/img/geopark_w.png"
                                alt="Website"
                                width={40}
                                height={40}
                              >
                              公式サイト
                              </LinkIcon>
                            </div>
                          )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};