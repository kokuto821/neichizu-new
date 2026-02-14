// app/feature/map/hyakumeizan/page.tsx
'use client';
import { useEffect, useState, useCallback } from 'react';
import { MapRenderer } from '@/app/feature/map/components/MapRenderer';
import { MapToolbar } from '@/app/feature/map/components/MapToolbar';
import { useInitializeMap } from './feature/map/hooks/useInitializeMap';
import { useMapClick } from './feature/map/hooks/useMapClick';
import { useImageLoader } from './feature/map/hooks/useImageLoader';
import { BottomNavigation } from './components/molecules/BottomNavigation';
import { LoadingSpinner } from './components/molecules/LoadingSpinner';
import { NeiCard } from '@/app/feature/map/components/NeiCard';
import { useMapLayers } from './hooks/useMapLayers';
import { BottomUIContainer } from './components/molecules/BottomUIContainer';

const Hyakumeizan = () => {
  const { map, mapRef, switchBaseLayer } = useInitializeMap();

  const {
    isVectorVisible,
    setIsVectorVisible,
    isGeoparkVisible,
    setIsGeoparkVisible,
  } = useMapLayers(map);

  // ローディング状態（分割代入で使用）
  const [loading, setLoading] = useState({
    isClickLoading: false,
    isSwipeLoading: false,
  });
  const { isClickLoading, isSwipeLoading } = loading;
  const isLoading = isClickLoading || isSwipeLoading;

  const setClickLoading = useCallback((value: boolean) => {
    setLoading((prev) => ({ ...prev, isClickLoading: value }));
  }, []);
  const setSwipeLoading = useCallback((value: boolean) => {
    setLoading((prev) => ({ ...prev, isSwipeLoading: value }));
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setLoading((prev) => ({
      ...prev,
      isClickLoading: false,
      isSwipeLoading: false,
    }));
  }, []);

  const { selectedFeature, setSelectedFeature } = useMapClick({
    map,
    onClickLoading: setClickLoading,
  });

  const { isImageLoaded } = useImageLoader(selectedFeature, handleLoadingComplete);

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
        {isLoading && selectedFeature !== null && <LoadingSpinner />}
        <MapToolbar switchBaseLayer={switchBaseLayer} />
        <BottomUIContainer>
          {isImageLoaded && (
            <NeiCard
              selectedFeature={selectedFeature}
              map={map}
              onFeatureChange={setSelectedFeature}
              onSwipeLoadingChange={setSwipeLoading}
            />
          )}
          <BottomNavigation
            isVectorVisible={isVectorVisible}
            setIsVectorVisible={setIsVectorVisible}
            isGeoparkVisible={isGeoparkVisible}
            setIsGeoparkVisible={setIsGeoparkVisible}
          />
        </BottomUIContainer>
      </div>
    </div>
  );
};

export default Hyakumeizan;
