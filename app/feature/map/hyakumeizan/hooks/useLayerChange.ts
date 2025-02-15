import { useCallback, Dispatch, SetStateAction, useState } from "react";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import { gsi, osm } from "../utils/layers";
import { addVectorLayer } from "../utils/addVectorLayer";

type Props = {
  map: Map;
};

export const useLayerChange = ({ map }: Props) => {
  const [selectedLayer, setSelectedLayer] = useState<TileLayer>(gsi);
  const changeOSMLayer = useCallback(() => {
    if (selectedLayer !== osm) {
      // 削除前に対象レイヤーが既に追加されているかチェック
      if (map.getLayers().getArray().includes(selectedLayer)) {
        map.removeLayer(selectedLayer);
      }
      if (!map.getLayers().getArray().includes(osm)) {
        map.addLayer(osm);
        addVectorLayer({ map });
      }
      setSelectedLayer(osm);
    }
  }, [map, selectedLayer]);
  const changeGSILayer = useCallback(() => {
    if (selectedLayer !== gsi) {
      // 削除前に対象レイヤーが既に追加されているかチェック
      if (map.getLayers().getArray().includes(selectedLayer)) {
        map.removeLayer(selectedLayer);
      }
      if (!map.getLayers().getArray().includes(gsi)) {
        map.addLayer(gsi);
        addVectorLayer({ map });
      }
      setSelectedLayer(gsi);
    }
  }, [map, selectedLayer]);
  return { selectedLayer, changeOSMLayer, changeGSILayer };
};
