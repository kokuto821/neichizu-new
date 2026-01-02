import { Map, Feature } from 'ol';
import VectorSource from 'ol/source/Vector';
import { mountainIcon } from './styles';
import { HyakumeizanFromSelected } from '../types/types';
import { fetchHyakumeizanData } from './fetchHyakumeizanData';

export const addHyakumeizanFeature = async (
  map: Map,
  vectorSource: VectorSource
) => {
  const data = await fetchHyakumeizanData();

  data.forEach(
    ({
      geometry,
      id,
      category,
      name,
      area,
      height,
      googlemaplink,
      image,
      YAMAP,
    }: HyakumeizanFromSelected) => {
      const feature = new Feature({
        geometry: geometry,
        id: id,
        name: name,
        height: height,
        googlemaplink: googlemaplink,
        YAMAP: YAMAP,
        image: image,
        area: area,
        category: category,
        zIndex: Infinity,
      });

      feature.setStyle(mountainIcon);
      vectorSource.addFeature(feature);
    }
  );
};
