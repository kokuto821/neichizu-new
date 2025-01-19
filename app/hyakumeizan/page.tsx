// app/feature/map/hyakumeizan/page.tsx
"use client";

import {
  initializeMap,
  DEFAULT_CONFIG,
} from "../feature/map/hyakumeizan/utils/initializeMap";
import { MapRenderer } from "../feature/map/hyakumeizan/component/MapRenderer";

export default function HyakumeizanPage() {
  return (
    <>
      <MapRenderer initializeMap={initializeMap} config={DEFAULT_CONFIG} />
    </>
  );
}
