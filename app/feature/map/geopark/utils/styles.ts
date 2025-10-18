import { Style, Icon } from 'ol/style';

export const geoparkIcon = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: '/img/geopark_w.png',
    scale: 0.2,
  }),
});
