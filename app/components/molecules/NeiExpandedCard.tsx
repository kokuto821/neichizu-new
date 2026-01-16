import { WGeoparkFromSelected } from '@/app/feature/map/geopark/types/types';
import { HyakumeizanFromSelected } from '@/app/feature/map/hyakumeizan/types/types';
import { motion, AnimatePresence } from 'framer-motion';
import { NeiCloseButton } from '../atoms/NeiCloseButton';
import { usePopupVisible } from '@/app/feature/map/hyakumeizan/hooks/usePopupVisible';
import { LinkIcon } from '../atoms/LinkIcon';

// 拡張表示のカードコンポーネント
interface ExpandedCardProps {
  selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null;
  onClose: () => void;
}

const expandedCardStyle = {
  overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40',
  container:
    'fixed inset-y-4 left-[5vw] right-[5vw] md:inset-y-10 md:left-[20vw] md:right-[20vw] rounded-2xl z-50 shadow-2xl bg-ecruWhite flex flex-col overflow-hidden',
  imageWrapper: 'relative w-full flex-shrink-0',
  contentWrapper: 'p-4 md:p-8 overflow-y-auto flex-1',
  title: 'text-2xl md:text-3xl font-bold mb-6',
  image: 'block w-full h-80 md:h-[450px] object-cover',
  description: 'text-lg mb-8 text-gray-700',
  detailsContainer: 'space-y-4',
  detailsTitle: 'text-xl font-semibold mb-4',
  detailsText: 'leading-relaxed text-gray-700',
  grid: 'grid grid-cols-2 gap-4',
  featureCard: 'bg-semiDarkGreen rounded-lg p-4 shadow-sm',
  featureTitle: 'font-semibold mb-2 text-ecruWhite',
  featureDescription: 'text-ecruWhite text-sm',
  linkContainer: 'flex gap-4 mt-4',
  linkCard: 'bg-ecruWhite rounded-lg p-2 flex items-center justify-center shadow-sm w-fit'
};

export const NeiExpandedCard: React.FC<ExpandedCardProps> = ({ selectedFeature, onClose }) => {
  const { isVisible, shouldRender, displayFeature } = usePopupVisible(selectedFeature);

  if (!shouldRender || !displayFeature) return null;

  const isWGeopark = (f: HyakumeizanFromSelected | WGeoparkFromSelected): f is WGeoparkFromSelected => {
    return (f as WGeoparkFromSelected).comment !== undefined;
  };

  const isHyakumeizan = (f: HyakumeizanFromSelected | WGeoparkFromSelected): f is HyakumeizanFromSelected => {
    return (f as HyakumeizanFromSelected).height !== undefined;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={expandedCardStyle.overlay}
            onClick={onClose}
          />
          <motion.div
            layoutId={`card-${displayFeature.id}`}
            className={expandedCardStyle.container}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <div className={expandedCardStyle.imageWrapper}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <NeiCloseButton 
                  onClose={onClose} 
                />
              </motion.div>

              {displayFeature.image && (
                  <motion.img 
                      src={displayFeature.image} 
                      alt={displayFeature.name} 
                      className={expandedCardStyle.image}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                  />
              )}
            </div>

            <div className={expandedCardStyle.contentWrapper}>
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={expandedCardStyle.detailsContainer}
                >
                <motion.h2 layoutId={`title-${displayFeature.id}`}
                className={expandedCardStyle.title}>
                  {displayFeature.name}
                </motion.h2>
                {isWGeopark(displayFeature) && (
                    <>
                    <p className={expandedCardStyle.detailsText}>
                        {displayFeature.comment}
                    </p>
                        <div className={expandedCardStyle.grid}>
                        <div className={expandedCardStyle.featureCard}>
                            <h4 className={expandedCardStyle.featureTitle}>エリア</h4>
                            <p className={expandedCardStyle.featureDescription}>
                            {displayFeature.area}
                            </p>
                        </div>
                        <div className={expandedCardStyle.featureCard}>
                            <h4 className={expandedCardStyle.featureTitle}>Webサイト</h4>
                            <div className="mt-2">
                                {displayFeature.website && (
                                <a href={displayFeature.website} target="_blank" rel="noopener noreferrer" className="text-ecruWhite underline hover:text-white">
                                    公式サイト
                                </a>
                                )}
                            </div>
                        </div>
                    </div>
                    </>
                )}

                {isHyakumeizan(displayFeature) && (
                    <>
                    <div className={expandedCardStyle.grid}>
                        <div className={expandedCardStyle.featureCard}>
                        <h4 className={expandedCardStyle.featureTitle}>エリア</h4>
                        <p className={expandedCardStyle.featureDescription}>
                            {displayFeature.area}
                        </p>
                        </div>
                        <div className={expandedCardStyle.featureCard}>
                        <h4 className={expandedCardStyle.featureTitle}>標高</h4>
                        <p className={expandedCardStyle.featureDescription}>
                            {displayFeature.height}
                        </p>
                        </div>
                    </div>
                    </>
                )}

                <div className={`${expandedCardStyle.featureCard} mt-6`}>
                    <h4 className={expandedCardStyle.featureTitle}>リンク</h4>
                    <div className={expandedCardStyle.linkContainer}>
                        <div className={expandedCardStyle.linkCard}>
                        <LinkIcon
                            href={displayFeature.googlemaplink}
                            src="/img/g_map_logo.svg"
                            alt="Google Map"
                        />
                        </div>
                        {isHyakumeizan(displayFeature) && displayFeature.YAMAP && (
                        <div className={expandedCardStyle.linkCard}>
                            <LinkIcon href={displayFeature.YAMAP} src="/img/yamap-logo.svg" alt="YAMAP" />
                        </div>
                        )}
                    </div>
                </div>
                </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
