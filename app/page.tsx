// app/feature/map/hyakumeizan/page.tsx
'use client';
import { useEffect } from 'react';
import { MapRenderer } from '@/app/feature/map/hyakumeizan/component/MapRenderer';
import { MapToolbar } from './components/molecules/MapToolbar';
import { useInitializeMap } from './feature/map/hyakumeizan/hooks/useInitializeMap';
import { useMapClick } from './feature/map/hyakumeizan/hooks/useMapClick';
import { useImageLoader } from './feature/map/hyakumeizan/hooks/useImageLoader';
import { BottomNavigation } from './components/molecules/BottomNavigation';
import { RoadingSpinner } from './components/molecules/RoadingSpinner';
import { NeiCard } from './components/molecules/NeiCard';
import { useMapLayers } from './hooks/useMapLayers';

const Hyakumeizan = () => {
  const { map, mapRef, switchBaseLayer } = useInitializeMap();

  const {
    isVectorVisible,
    setIsVectorVisible,
    isGeoparkVisible,
    setIsGeoparkVisible,
  } = useMapLayers(map);

  const {
    selectedFeature,
    setSelectedFeature,
    isFeatureClick,
    setIsFeatureClick,
  } = useMapClick(map);

  const { isImageLoaded } = useImageLoader(selectedFeature, setIsFeatureClick);

  // 百名山レイヤーが非表示になったらNeiCompactCardを消す
  useEffect(() => {
    if (!isVectorVisible) {
      setSelectedFeature(null);
    }
  }, [isVectorVisible, setSelectedFeature]);

  // ジオパークレイヤーが非表示になったらNeiCompactCardを消す
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
        {isImageLoaded && (
          <NeiCard
            selectedFeature={selectedFeature}
          />
        )}
        <BottomNavigation
          isVectorVisible={isVectorVisible}
          setIsVectorVisible={setIsVectorVisible}
          isGeoparkVisible={isGeoparkVisible}
          setIsGeoparkVisible={setIsGeoparkVisible}
        />
        <MapToolbar switchBaseLayer={switchBaseLayer} />
      </div>
    </div>
  );
};

export default Hyakumeizan;
