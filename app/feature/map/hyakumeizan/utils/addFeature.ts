import { Map, Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { mountainIcon } from "./styles";
import { fetchCSVData } from "./fetchCSVData";

export const addFeature = async (map: Map, vectorSource: VectorSource) => {
  const data = await fetchCSVData("/csv/hyakumeizan.csv");

  data.forEach(
    ({ name, height, googlemaplink, YAMAP, image, area, geometry }) => {
      // サンプルのフィーチャーを追加
      const feature = new Feature({
        geometry: geometry,
        name: name,
        height: height,
        googlemaplink: googlemaplink,
        YAMAP: YAMAP,
        image: image,
        area: area,
        zIndex: Infinity,
      });

      feature.setStyle(mountainIcon);

      vectorSource.addFeature(feature);
      console.log("Feature added");
    }
  );
};
