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
      {/* <Header /> */}
      {/* <div className="map_title">
        <h2 className="h2-title_text">{isVectorVisible ? '日本百名山' : ''}</h2>
      </div> */}
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
