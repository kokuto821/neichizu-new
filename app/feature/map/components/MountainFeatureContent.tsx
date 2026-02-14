import { FeatureTitle } from '@/app/components/atoms/FeatureTitle';
import { FeatureSubtitle } from '@/app/components/atoms/FeatureSubtitle';

type Props = {
  name: string;
  area: string;
  height?: string;
};

export const MountainFeatureContent = ({
  name,
  area,
  height,
}: Props) => {
  const style = {
    container: 'pl-[10px]',
    innerWrapper: 'flex flex-col justify-start gap-1 items-start',
  };

  return (
    <div className={style.container}>
      <FeatureTitle>{name}</FeatureTitle>
      <FeatureSubtitle>
        {area} {height}
      </FeatureSubtitle>
      <div className={style.innerWrapper}>
      </div>
    </div>
  );
};
