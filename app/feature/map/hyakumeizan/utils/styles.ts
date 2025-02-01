import { Style, Icon } from "ol/style";

export const mountainIcon = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: "/img/mountain.png",
    scale: 0.5,
    // size: [64, 64],
  }),
});
