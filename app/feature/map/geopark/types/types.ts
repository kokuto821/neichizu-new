export type GeoparkProperties = {
  geometry: string;
  name: string;
  area: string;
  category: string;
  comment: string;
  googlemaplink: string;
  website: string;
  image: string;
};

export type GeoparkFromDB = {
  id?: number;
  no?: number;
  name: string;
  エリア?: string;
  area?: string;
  Latitude?: string;
  Longitude?: string;
  latitude?: string;
  longitude?: string;
  区分?: string;
  category?: string;
  googlemaplink: string;
  コメント?: string;
  comment?: string;
  ジオパーク公式サイト?: string;
  website?: string;
  image?: string;
  created_at?: string;
};
