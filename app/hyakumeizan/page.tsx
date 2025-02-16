// app/feature/map/hyakumeizan/page.tsx
'use client';
import { Header } from '@/app/components/molecules/header';
import { MapRenderer } from '@/app/feature/map/hyakumeizan/component/MapRenderer';
import { useState } from 'react';
import { PopupCard } from '../components/molecules/popupCard';
import { MapToolbar } from '../components/molecules/mapToolbar';
import { useInitializeMap } from '../feature/map/hyakumeizan/hooks/useInitializeMap';
import { FeatureProperties } from '../feature/map/hyakumeizan/types/types';

const Hyakumeizan = () => {
  const [popupVisible, setIsPopupVisible] = useState<boolean>(false);
  const { map, mapRef, setMap, switchBaseLayer } = useInitializeMap();
  const [selectedFeature, setSelectedFeature] =
    useState<FeatureProperties | null>(null);

  return (
    <div className="page_wrapper">
      <Header />
      <div className="map_title">
        <h2 className="h2-title_text">日本百名山</h2>
      </div>

      <div className="map_wrap">
        <MapRenderer
          setSelectedFeature={setSelectedFeature}
          setIsVisible={setIsPopupVisible}
          map={map}
          setMap={setMap}
          mapRef={mapRef}
        />
        {popupVisible && <PopupCard selectedFeature={selectedFeature} />}
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

// Next.js のページコンポーネントは default export でなければならない
export default Hyakumeizan;
