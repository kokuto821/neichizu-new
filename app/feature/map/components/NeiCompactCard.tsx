import { FC } from 'react';
import { FeatureType, isHyakumeizan, isWGeopark } from '@/app/feature/map/utils/featureUtils';
import { GeoparkFeatureContent } from './GeoparkFeatureContent';
import { MountainFeatureContent } from './MountainFeatureContent';

type Props = {
  feature: FeatureType;
  isSelected?: boolean;
  onExpand: () => void;
  onClick?: () => void;
  className?: string;
};

const style = {
  card: 'flex items-center bg-ecruWhite rounded-xl shadow-sm hover:shadow-md overflow-hidden cursor-pointer h-full transition-shadow select-none',
  cardImage: 'aspect-square h-[25vw] md:h-[10vh] flex-shrink-0 rounded-l-xl object-cover block',
  content: 'flex flex-1 flex-col p-2 min-w-0 justify-center',
};

export const NeiCompactCard: FC<Props> = ({
  feature,
  isSelected,
  onExpand,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`${style.card} ${className}`}
      onClick={onClick || (isSelected ? onExpand : undefined)}
    >
      {feature.image && (
        <img
          className={style.cardImage}
          src={feature.image}
          alt={feature.name}
        />
      )}
      <div className={style.content}>
        {isWGeopark(feature) ? (
          <GeoparkFeatureContent
            name={feature.name}
            area={feature.area}
          />
        ) : isHyakumeizan(feature) ? (
          <MountainFeatureContent
            name={feature.name}
            area={feature.area}
            height={feature.height}
          />
        ) : null}
      </div>
    </div>
  );
};

