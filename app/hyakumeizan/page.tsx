// app/feature/map/hyakumeizan/page.tsx
'use client';
import { MapRenderer } from '@/app/feature/map/hyakumeizan/component/MapRenderer';
import { PopupCard } from '../components/molecules/popupCard';
import { MapToolbar } from '../components/molecules/mapToolbar';
import { useInitializeMap } from '../feature/map/hyakumeizan/hooks/useInitializeMap';
import { useMapClick } from '../feature/map/hyakumeizan/hooks/useMapClick';
import { useImageLoader } from '../feature/map/hyakumeizan/hooks/useImageLoader';
import { BottomNavigation } from '../components/molecules/BottomNavigation';
import { RoadingSpinner } from '../components/molecules/RoadingSpinner';

const Hyakumeizan = () => {
  const { map, mapRef, switchBaseLayer, isVectorVisible, setIsVectorVisible } =
    useInitializeMap();

  const { selectedFeature, isFeatureClick, setIsFeatureClick } =
    useMapClick(map);

  const { isImageLoaded } = useImageLoader(selectedFeature, setIsFeatureClick);

  return (
    <div className="flex flex-col h-full">
      <div className="relative h-[100vh]">
        <MapRenderer mapRef={mapRef} />

        <div className="pt-0 px-[5%] md:px-[20%] absolute bottom-0 left-0 w-full">
          <div className="flex flex-col gap-2 pb-[1vh]">
            {isFeatureClick && selectedFeature !== null && (
              <div className="translate-y-20 z-1">
                <RoadingSpinner />
              </div>
            )}
            {isImageLoaded && <PopupCard selectedFeature={selectedFeature} />}
            <BottomNavigation
              isVectorVisible={isVectorVisible}
              setIsVectorVisible={setIsVectorVisible}
            />
          </div>
        </div>

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
