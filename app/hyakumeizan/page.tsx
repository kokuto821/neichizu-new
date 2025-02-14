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
  return (
    <div className="page_wrapper">
      {/* ヘッダーをインクルード */}
      <Header />

      {/* スマホナビの表示・非表示 */}
      <div className="map_title">
        <h2 className="h2-title_text">日本百名山</h2>
      </div>

      <div className="map_wrap">
        <MapRenderer setSelectedFeature={setSelectedFeature} />
        <PopupCard selectedFeature={selectedFeature} />
      </div>

      <footer className="foot_nav">
        <p className="foot_nav_p">
          <Link
            href="https://www.google.com/maps/d/viewer?mid=1OjXFg_mjG2QeZTXK1enyj0957jiP9Og&ll=38.66483464924118%2C140.62674284694677&z=7"
            target="_blank"
            rel="noopener noreferrer"
            className="foot_nav_link"
          >
            Googlemapで見る
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Hyakumeizan; // デフォルトエクスポート
