export type FeatureProperties= {
    geometry: string,
    name: string,
    height: string,
    googlemaplink: string,
    YAMAP: string,
    image: string,
    area: string,
}

export type fetchMountainData = {
  緯度: string;
  経度: string;
  画像: string;
  name: string;
  エリア: string;
  height: string;
  googlemaplink: string;
  YAMAP: string;
};

// Supabaseから取得する百名山データの型
export type HyakumeizanFromDB = {
  id?: number;
  name: string;
  エリア?: string;
  area?: string;
  height: string;
  緯度?: string;
  経度?: string;
  latitude?: string;
  longitude?: string;
  googlemaplink: string;
  画像?: string;
  image?: string;
  YAMAP: string;
  created_at?: string;
};