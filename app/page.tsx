// app/feature/map/hyakumeizan/page.tsx
'use client';
import { useEffect } from 'react';
import { MapRenderer } from '@/app/feature/map/hyakumeizan/component/MapRenderer';
import { PopupCard } from './components/molecules/PopupCard';
import { MapToolbar } from './components/molecules/MapToolbar';
import { useInitializeMap } from './feature/map/hyakumeizan/hooks/useInitializeMap';
import { useMapClick } from './feature/map/hyakumeizan/hooks/useMapClick';
import { useImageLoader } from './feature/map/hyakumeizan/hooks/useImageLoader';
import { BottomNavigation } from './components/molecules/BottomNavigation';
import { RoadingSpinner } from './components/molecules/RoadingSpinner';
import { useLayerVisibility } from './feature/map/hooks/useLayerVisibility';
import { addHyakumeizanFeature } from './feature/map/hyakumeizan/utils/addFeature';
import { addGeoparkFeature } from './feature/map/geopark/utils/addFeature';

const Hyakumeizan = () => {
  const { map, mapRef, switchBaseLayer } = useInitializeMap();

  // 百名山レイヤー
  const { isVisible: isVectorVisible, setIsVisible: setIsVectorVisible } =
    useLayerVisibility({
      map,
      layerType: 'hyakumeizan',
      addFeatures: addHyakumeizanFeature,
      initialVisible: true,
    });

  // 世界ジオパークレイヤー
  const { isVisible: isGeoparkVisible, setIsVisible: setIsGeoparkVisible } =
    useLayerVisibility({
      map,
      layerType: 'geopark',
      addFeatures: addGeoparkFeature,
      initialVisible: false,
    });

  const {
    selectedFeature,
    setSelectedFeature,
    isFeatureClick,
    setIsFeatureClick,
  } = useMapClick(map);

  const { isImageLoaded } = useImageLoader(selectedFeature, setIsFeatureClick);

  // 百名山レイヤーが非表示になったらPopupCardを消す
  useEffect(() => {
    if (!isVectorVisible) {
      setSelectedFeature(null);
    }
  }, [isVectorVisible, setSelectedFeature]);

  // ジオパークレイヤーが非表示になったらPopupCardを消す
  useEffect(() => {
    if (!isGeoparkVisible) {
      setSelectedFeature(null);
    }
  }, [isGeoparkVisible, setSelectedFeature]);

  return (
    <div className="flex flex-col h-full">
      <div className="relative h-[100vh]">
        <MapRenderer mapRef={mapRef} />
        {isFeatureClick && selectedFeature !== null && <RoadingSpinner />}
        {isImageLoaded && <PopupCard selectedFeature={selectedFeature} />}
        <BottomNavigation
          isVectorVisible={isVectorVisible}
          setIsVectorVisible={setIsVectorVisible}
          isGeoparkVisible={isGeoparkVisible}
          setIsGeoparkVisible={setIsGeoparkVisible}
        />
        <MapToolbar
          changeGSILayer={() => switchBaseLayer('gsi')}
          changePHOTOLayer={() => switchBaseLayer('photo')}
          changeRELIEFLayer={() => switchBaseLayer('relief')}
          changeOSMLayer={() => switchBaseLayer('osm')}
          changeTOPOLayer={() => switchBaseLayer('osmTopo')}
        />
      </div>
    </div>
  );
};

export default Hyakumeizan;
