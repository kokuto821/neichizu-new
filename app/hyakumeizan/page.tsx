// app/feature/map/hyakumeizan/page.tsx
"use client";
import { Header } from "@/app/components/molecules/header";
import { MapRenderer } from "@/app/feature/map/hyakumeizan/component/MapRenderer";
import { memo, useState } from "react";
import { FeatureProperties } from "../feature/map/hyakumeizan/types/types";
import { PopupCard } from "../components/molecules/popupCard";
import { MapToolbar } from "../components/molecules/mapToolbar";
import { useInitializeMap } from "../feature/map/hyakumeizan/hooks/useInitializeMap";
import { useLayerChange } from "../feature/map/hyakumeizan/hooks/useLayerChange";

const Hyakumeizan = memo(() => {
  const [selectedFeature, setSelectedFeature] =
    useState<FeatureProperties | null>(null);
  const [popupVisible, setIsPopupVisible] = useState<boolean>(false);
  const { map, mapRef, setMap } = useInitializeMap();
  const { changeOSMLayer, changeGSILayer } = useLayerChange({
    map,
  });
  return (
    <div className="page_wrapper">
      {/* ヘッダーをインクルード */}
      <Header />
      {/* スマホナビの表示・非表示 */}
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
        {popupVisible ? <PopupCard selectedFeature={selectedFeature} /> : null}
        <MapToolbar
          changeOSMLayer={changeOSMLayer}
          changeGSILayer={changeGSILayer}
        />
      </div>
    </div>
  );
});

// Next.js のページコンポーネントは default export でなければならない
export default Hyakumeizan;
