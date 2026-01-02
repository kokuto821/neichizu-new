import { Map, Feature } from 'ol';
import VectorSource from 'ol/source/Vector';
import { geoparkIcon } from './styles';
import { fetchWGeoparkData } from './fetchWGeoparkData';

export const addGeoparkFeature = async (
  map: Map,
  vectorSource: VectorSource
) => {
  const data = await fetchWGeoparkData();

  data.forEach(
    ({
      name,
      area,
      category,
      comment,
      googlemaplink,
      website,
      image,
      geometry,
    }) => {
      const feature = new Feature({
        geometry: geometry,
        name: name,
        area: area,
        category: category,
        comment: comment,
        googlemaplink: googlemaplink,
        website: website,
        image: image,
        zIndex: Infinity,
      });

      feature.setStyle(geoparkIcon);

      vectorSource.addFeature(feature);
      console.log('Geopark Feature added:', {
        name,
        category,
        comment,
        website,
        featureProps: {
          category: feature.get('category'),
          comment: feature.get('comment'),
          website: feature.get('website'),
        },
      });
    }
  );
};
