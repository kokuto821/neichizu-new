import { FC, RefObject } from 'react';
import 'ol/ol.css';

type MapRendererProps = {
  mapRef: RefObject<HTMLDivElement | null>;
};

export const MapRenderer: FC<MapRendererProps> = ({ mapRef }) => {
  return <div ref={mapRef} className="relative w-full h-full" />;
};

export default MapRenderer;
