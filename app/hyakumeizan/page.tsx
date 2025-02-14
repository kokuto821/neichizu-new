// app/feature/map/hyakumeizan/page.tsx
"use client";
import Link from "next/link";
import { Header } from "@/app/components/molecules/header";
import { MapRenderer } from "@/app/feature/map/hyakumeizan/component/MapRenderer";
import { useState } from "react";
import { FeatureProperties } from "../feature/map/hyakumeizan/types/types";
import { PopupCard } from "../components/molecules/popupCard";

const Hyakumeizan = () => {
  const [selectedFeature, setSelectedFeature] =
    useState<FeatureProperties | null>(null);
  const [isVisible, setIsVisible] = useState(false);
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
          setIsVisible={setIsVisible}
        />
        {isVisible ? <PopupCard selectedFeature={selectedFeature} /> : null}
      </div>
    </div>
  );
};

export default Hyakumeizan; // デフォルトエクスポート
