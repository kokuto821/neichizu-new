// app/feature/map/hyakumeizan/page.tsx
'use client';
import { MapRenderer } from '@/app/feature/map/hyakumeizan/component/MapRenderer';
import { PopupCard } from './components/molecules/popupCard';
import { MapToolbar } from './components/molecules/mapToolbar';
import { useInitializeMap } from './feature/map/hyakumeizan/hooks/useInitializeMap';
import { useMapClick } from './feature/map/hyakumeizan/hooks/useMapClick';
import { useImageLoader } from './feature/map/hyakumeizan/hooks/useImageLoader';
import { BottomNavigation } from './components/molecules/BottomNavigation';
import { RoadingSpinner } from './components/molecules/RoadingSpinner';
import { useVectorLayerVisibility } from './feature/map/hyakumeizan/hooks/useVectorLayerVisibility';

const Hyakumeizan = () => {
  const { map, mapRef, switchBaseLayer } = useInitializeMap();

  const { isVectorVisible, setIsVectorVisible } = useVectorLayerVisibility(map);

  const { selectedFeature, isFeatureClick, setIsFeatureClick } =
    useMapClick(map);

  const { isImageLoaded } = useImageLoader(selectedFeature, setIsFeatureClick);

  return (
    <div className="flex flex-col h-full">
      <div className="relative h-[100vh]">
        <MapRenderer mapRef={mapRef} />
        {isFeatureClick && selectedFeature !== null && <RoadingSpinner />}
        {isImageLoaded && <PopupCard selectedFeature={selectedFeature} />}
        <BottomNavigation
          isVectorVisible={isVectorVisible}
          setIsVectorVisible={setIsVectorVisible}
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
