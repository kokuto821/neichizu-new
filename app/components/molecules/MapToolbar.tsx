import {
  useChangeVisible,
  LayerType,
} from '@/app/feature/map/hyakumeizan/hooks/useChangeVisible';
import { NeiButton } from './NeiButton';
import { NeiIconButton } from './NeiIconButton';
import { MdLayers } from 'react-icons/md';

type Props = {
  switchBaseLayer: (layerName: string) => void;
};

/**
 * マップツールバーコンポーネント
 * レイヤー表示切替と各種類の地図レイヤーを選択する機能を提供
 */
export const MapToolbar = ({ switchBaseLayer }: Props) => {
  const { isVisible, changeVisible, changeLayer, isLayerActive } =
    useChangeVisible();

  const style = {
    mapToolbarInner: 'flex flex-col absolute top-0 left-0 p-[15px]',
    layerList: 'flex flex-col gap-[5px] pt-[7.5px]',
  };

  /**
   * レイヤー変更を処理する共通関数
   * @param layerType - レイヤーの種類
   */
  const handleLayerChange = (layerType: LayerType) => () => {
    changeLayer(layerType);
    switchBaseLayer(layerType);
  };

  return (
    <div className={style.mapToolbarInner}>
      <NeiIconButton
        onClick={() => {
          changeVisible();
        }}
        isActive={isVisible}
      >
        <MdLayers className="w-6 h-6 bg-inherit text-inherit" />
      </NeiIconButton>
      {isVisible ? (
        <div className={style.layerList}>
          <NeiButton
            onClick={handleLayerChange('gsi')}
            isActive={isLayerActive('gsi')}
            label="地理院地図"
          />
          <NeiButton
            onClick={handleLayerChange('photo')}
            isActive={isLayerActive('photo')}
            label="空中写真"
          />
          <NeiButton
            onClick={handleLayerChange('relief')}
            isActive={isLayerActive('relief')}
            label="色別標高"
          />
          <NeiButton
            onClick={handleLayerChange('osm')}
            isActive={isLayerActive('osm')}
            label="OSM"
          />
          <NeiButton
            onClick={handleLayerChange('osmTopo')}
            isActive={isLayerActive('osmTopo')}
            label="OSM Topo"
          />
        </div>
      ) : null}
    </div>
  );
};
