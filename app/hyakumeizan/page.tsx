// app/feature/map/hyakumeizan/page.tsx
'use client';
import { Header } from '@/app/components/molecules/header';
import { MapRenderer } from '@/app/feature/map/hyakumeizan/component/MapRenderer';
import { useEffect, useRef, useState } from 'react';
import { PopupCard } from '../components/molecules/popupCard';
import { MapToolbar } from '../components/molecules/mapToolbar';
import { useInitializeMap } from '../feature/map/hyakumeizan/hooks/useInitializeMap';
import { FeatureProperties } from '../feature/map/hyakumeizan/types/types';

const Hyakumeizan = () => {
  const [popupVisible, setIsPopupVisible] = useState<boolean>(false);
  const { map, mapRef, setMap, switchBaseLayer } = useInitializeMap();
  const [selectedFeature, setSelectedFeature] =
    useState<FeatureProperties | null>(null);
  // 画像読み込み状態を管理するステートを追加
  const [imageLoaded, setImageLoaded] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null); // useRefで画像参照を保持

  // 選択されたフィーチャーが変更された時の処理
  useEffect(() => {
    setImageLoaded(false); // 画像読み込み状態をリセット

    if (selectedFeature?.image) {
      imgRef.current = new Image(); // useRefに画像を代入
      imgRef.current.src = selectedFeature.image;
      imgRef.current.onload = () => setImageLoaded(true);
      imgRef.current.onerror = () => setImageLoaded(true); // エラー時も読み込み完了扱い
    } else {
      setImageLoaded(true); // 画像がない場合は即時完了
    }

    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null;
        imgRef.current.onerror = null;
      }
    };
  }, [selectedFeature]);

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
        {popupVisible && imageLoaded && (
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
