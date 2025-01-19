import { initializeMap, DEFAULT_CONFIG } from "./utils/initializeMap";
import { MapRenderer } from "./component/MapRenderer";

export const hyakumeizan: React.FC = () => (
  <>
    <MapRenderer initializeMap={initializeMap} config={DEFAULT_CONFIG} />
  </>
);
