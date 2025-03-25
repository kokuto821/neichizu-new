import { RefObject } from 'react';
import 'ol/ol.css';

type MapRendererProps = {
  mapRef: RefObject<HTMLDivElement | null>;
};

export const MapRenderer: React.FC<MapRendererProps> = ({ mapRef }) => {
  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    />
  );
};

export default MapRenderer;
