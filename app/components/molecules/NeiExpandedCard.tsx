import { WGeoparkFromSelected } from '@/app/feature/map/geopark/types/types';
import { HyakumeizanFromSelected } from '@/app/feature/map/hyakumeizan/types/types';
import { motion, AnimatePresence } from 'framer-motion';
import { NeiCloseButton } from '../atoms/NeiCloseButton';
import { usePopupVisible } from '@/app/feature/map/hyakumeizan/hooks/usePopupVisible';
import { LinkIcon } from '../atoms/LinkIcon';
import { WIDTH_CLASS } from '@/app/styles/layoutConstants';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// 拡張表示のカードコンポーネント
interface ExpandedCardProps {
  selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null;
  onClose: () => void;
}

const expandedCardStyle = {
  overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40',
  wrapper: 'fixed inset-0 z-50 flex items-center justify-center pointer-events-none',
  container:
    `${WIDTH_CLASS} h-[80vh] rounded-2xl shadow-2xl bg-ecruWhite flex flex-col overflow-hidden pointer-events-auto relative`,
  imageWrapper: 'relative w-full flex-shrink-0',
  contentWrapper: 'p-4 md:p-8 overflow-y-auto flex-1',
  title: 'text-2xl md:text-3xl font-bold',
  image: 'block w-full h-[40vh] object-cover',
  description: 'text-lg mb-8 text-gray-700',
  detailsContainer: 'space-y-4',
  detailsTitle: 'text-xl font-semibold mb-4',
  detailsText: 'leading-relaxed text-gray-700',
  grid: 'grid grid-cols-2 gap-4',
  featureCard: 'bg-semiDarkGreen rounded-lg p-4 shadow-sm',
  featureTitle: 'font-semibold mb-2 text-ecruWhite',
  featureDescription: 'text-ecruWhite text-sm',
  linkContainer: 'flex gap-4 mt-3',
  linkCard: 'bg-ecruWhite rounded-lg p-2 flex items-center justify-center shadow-sm w-fit'
};

export const NeiExpandedCard: React.FC<ExpandedCardProps> = ({ selectedFeature, onClose }) => {
  const { isVisible, shouldRender, displayFeature } = usePopupVisible(selectedFeature);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!shouldRender || !displayFeature || !mounted) return null;

  const isWGeopark = (f: HyakumeizanFromSelected | WGeoparkFromSelected): f is WGeoparkFromSelected => {
    return (f as WGeoparkFromSelected).comment !== undefined;
  };

  const isHyakumeizan = (f: HyakumeizanFromSelected | WGeoparkFromSelected): f is HyakumeizanFromSelected => {
    return (f as HyakumeizanFromSelected).height !== undefined;
  };

  return createPortal(
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
          <div className={expandedCardStyle.wrapper}>
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
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
