// types.ts
export type MountainData = {
  緯度: string;
  経度: string;
  画像: string;
  name: string;
  エリア: string;
  height: string;
  googlemaplink: string;
  YAMAP: string;
};

export type MapConfig = {
  initialCenter: [number, number];
  initialZoom: number;
  mountainIconPath: string;
  mountainIconScale: number;
};
