import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { getAllHyakumeizan } from "@/app/utils/supabaseFunctions";
import { HyakumeizanFromDB } from "../types/types";

export const fetchSupabaseData = async () => {
  try {
    console.log("🔄 Supabaseからデータを取得中...");
    const { data, error } = await getAllHyakumeizan();

    console.log("📊 Supabase Response:", { data, error });

    if (error) {
      console.error("❌ Supabaseからのデータ取得エラー:", error);
      console.error("エラー詳細:", JSON.stringify(error, null, 2));
      return [];
    }

    if (!data || data.length === 0) {
      console.warn("⚠️ Supabaseからデータが取得できませんでした");
      console.warn("data:", data);
      console.warn("テーブル 'hyakumeizan' が存在するか、データが入っているか確認してください");
      return [];
    }

    console.log(`✅ ${data.length}件の百名山データを取得しました`);
    console.log("最初のデータ:", data[0]);

    // 全てのフィーチャーを地図上に表示する
    return data.map((row: HyakumeizanFromDB) => ({
      name: row.name,
      height: row.height,
      googlemaplink: row.googlemaplink,
      YAMAP: row.YAMAP,
      image: row.画像 || row.image || "",
      area: row.エリア || row.area || "",
      geometry: new Point(
        fromLonLat([
          parseFloat(row.経度 || row.longitude || "0"),
          parseFloat(row.緯度 || row.latitude || "0")
        ])
      ),
    }));
  } catch (error) {
    console.error("❌ データ処理エラー:", error);
    return [];
  }
};
