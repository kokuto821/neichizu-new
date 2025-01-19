// app/feature/map/hyakumeizan/page.tsx
"use client";

import { initializeMap, DEFAULT_CONFIG } from "./utils/initializeMap";
import { MapRenderer } from "./component/MapRenderer";

export default function HyakumeizanPage() {
  return (
    <>
      <MapRenderer initializeMap={initializeMap} config={DEFAULT_CONFIG} />
    </>
  );
}
