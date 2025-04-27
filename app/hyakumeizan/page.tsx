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
          <div className="pb-[1vh] flex flex-col justify-center gap-2">
            <div
              className="absolute top-10 left-0 right-0 bottom-0 m-auto z-1"
              style={{
                visibility:
                  isFeatureClick && selectedFeature !== null
                    ? 'visible'
                    : 'hidden', // isVisibleステートで制御
                transition: 'visibility 0.3s ease', // 必要に応じてトランジションを追加
              }}
            >
              <RoadingSpinner />
            </div>
            {isVectorVisible && isImageLoaded && (
              <PopupCard selectedFeature={selectedFeature} />
            )}
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
