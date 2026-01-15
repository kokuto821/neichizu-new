import { WGeoparkFromSelected } from '@/app/feature/map/geopark/types/types';
import { HyakumeizanFromSelected } from '@/app/feature/map/hyakumeizan/types/types';
import { motion } from 'framer-motion';
import { NeiCloseButton } from '../atoms/NeiCloseButton';

// 拡張表示のカードコンポーネント
interface ExpandedCardProps {
  selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null;
  onClose: () => void;
}

const expandedCardStyle = {
  overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40',
  container:
    'fixed inset-4 md:inset-10 rounded-2xl p-8 z-50 overflow-auto shadow-2xl',
  closeButton:
    'absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white font-bold transition-colors',
  title: 'text-4xl md:text-5xl font-bold text-white mb-6',
  description: 'text-white/90 text-lg mb-8',
  detailsContainer: 'space-y-4',
  detailsTitle: 'text-2xl font-semibold text-white mb-4',
  detailsText: 'text-white/80 leading-relaxed',
  grid: 'grid grid-cols-1 md:grid-cols-2 gap-4 mt-6',
  featureCard: 'bg-white/10 rounded-lg p-4',
  featureTitle: 'text-white font-semibold mb-2',
  featureDescription: 'text-white/70 text-sm',
  additionalContent: 'mt-8 bg-white/10 rounded-lg p-6',
  additionalTitle: 'text-white font-semibold mb-3 text-xl',
  additionalText: 'text-white/70 mb-4',
  tagContainer: 'flex gap-2 flex-wrap',
  tag: 'bg-white/20 px-3 py-1 rounded-full text-white text-sm',
};

export const NeiExpandedCard: React.FC<ExpandedCardProps> = ({ selectedFeature, onClose }) => {
  return (  
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={expandedCardStyle.overlay}
        onClick={onClose}
      />
      <motion.div
        layoutId={`card-${selectedFeature?.id}`}
        className={`bg-gradient-to-br ${expandedCardStyle.container}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <NeiCloseButton 
            onClose={onClose} 
            className={expandedCardStyle.closeButton}
          />
        </motion.div>

        <motion.h2 layoutId={`title-${selectedFeature?.id}`} className={expandedCardStyle.title}>
          {selectedFeature?.name}
        </motion.h2>

        <motion.p
          layoutId={`desc-${selectedFeature?.id}`}
          className={expandedCardStyle.description}
        >
          comments
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={expandedCardStyle.detailsContainer}
        >
          <h3 className={expandedCardStyle.detailsTitle}>詳細情報</h3>
          <p className={expandedCardStyle.detailsText}>
            これは全画面表示されたカードです。ここに詳細な情報やコンテンツを表示できます。
            背景をクリックするか、右上の×ボタンで閉じることができます。
          </p>

          <div className={expandedCardStyle.grid}>
            <div className={expandedCardStyle.featureCard}>
              <h4 className={expandedCardStyle.featureTitle}>特徴 1</h4>
              <p className={expandedCardStyle.featureDescription}>
                スムーズなアニメーション
              </p>
            </div>
            <div className={expandedCardStyle.featureCard}>
              <h4 className={expandedCardStyle.featureTitle}>特徴 2</h4>
              <p className={expandedCardStyle.featureDescription}>
                レスポンシブデザイン
              </p>
            </div>
            <div className={expandedCardStyle.featureCard}>
              <h4 className={expandedCardStyle.featureTitle}>特徴 3</h4>
              <p className={expandedCardStyle.featureDescription}>
                コンポーネント分離
              </p>
            </div>
            <div className={expandedCardStyle.featureCard}>
              <h4 className={expandedCardStyle.featureTitle}>特徴 4</h4>
              <p className={expandedCardStyle.featureDescription}>
                再利用可能な設計
              </p>
            </div>
          </div>

          <div className={expandedCardStyle.additionalContent}>
            <h4 className={expandedCardStyle.additionalTitle}>
              追加コンテンツ
            </h4>
            <p className={expandedCardStyle.additionalText}>
              拡張カードには、通常カードとは異なる詳細なコンテンツを表示できます。
              画像、動画、フォーム、その他のインタラクティブな要素を追加することも可能です。
            </p>
            <div className={expandedCardStyle.tagContainer}>
              <span className={expandedCardStyle.tag}>タグ1</span>
              <span className={expandedCardStyle.tag}>タグ2</span>
              <span className={expandedCardStyle.tag}>タグ3</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
