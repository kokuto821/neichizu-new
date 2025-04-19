// app/feature/map/hyakumeizan/page.tsx
'use client';
import { Header } from '@/app/components/molecules/header';
import { MapRenderer } from '@/app/feature/map/hyakumeizan/component/MapRenderer';
import { PopupCard } from '../components/molecules/popupCard';
import { MapToolbar } from '../components/molecules/mapToolbar';
import { useInitializeMap } from '../feature/map/hyakumeizan/hooks/useInitializeMap';
import { useMapClick } from '../feature/map/hyakumeizan/hooks/useMapClick';
import { useImageLoader } from '../feature/map/hyakumeizan/hooks/useImageLoader';
import { CircularProgress } from '@mui/material';
import { color } from '../css/color';
import { ReactNode } from 'react';

const Hyakumeizan = () => {
  const { map, mapRef, switchBaseLayer } = useInitializeMap();

  const { selectedFeature, isFeatureClick, setIsFeatureClick } =
    useMapClick(map);

  const { isImageLoaded } = useImageLoader(selectedFeature, setIsFeatureClick);

  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="map_title">
        <h2 className="h2-title_text">日本百名山</h2>
      </div>

      <div className="map_wrap">
        <MapRenderer mapRef={mapRef} />
        {isFeatureClick && selectedFeature && (
          <div
            style={{
              position: 'absolute',
              color: color.SemiDarkGreen,
              bottom: '4vh',
              left: '0vw',
              width: '100vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px 20% 4vh 20%',
              visibility: 'visible', // isVisibleステートで制御
            }}
          >
            <CircularProgress color="inherit" />
          </div>
        )}
        {isImageLoaded && selectedFeature && (
          <PopupCard selectedFeature={selectedFeature} />
        )}

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
