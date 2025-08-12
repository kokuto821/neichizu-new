import { Map, View } from 'ol';
import { defaults as defaultControls } from 'ol/control';

import { layers } from './layers';
import { fromLonLat } from 'ol/proj';

const MAP_CONFIG = {
  initialCenter: fromLonLat([139, 35]),
  initialZoom: 5.5,
  defaultLayer: 'gsi'
} as const;

export const initializeMap = (target: HTMLElement): Map => {
  return new Map({
    target,
    layers,
    view: new View({
      center: MAP_CONFIG.initialCenter,
      zoom: MAP_CONFIG.initialZoom,
    }),
    controls: defaultControls({ zoom: false }),
  });
};