import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { getAllHyakumeizan } from '@/app/utils/supabaseFunctions';
import {
  HyakumeizanFromDB,
  HyakumeizanFromSelected,
} from '../types/hyakumeizanTypes';

export const fetchHyakumeizanData = async () => {
  try {
    console.log('🔄 Supabaseからデータを取得中...');
    const { data, error } = await getAllHyakumeizan();

    console.log('📊 Supabase Response:', { data, error });

    if (error) {
      console.error('❌ Supabaseからのデータ取得エラー:', error);
      console.error('エラー詳細:', JSON.stringify(error, null, 2));
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('⚠️ Supabaseからデータが取得できませんでした');
      console.warn('data:', data);
      console.warn(
        "テーブル 'hyakumeizan' が存在するか、データが入っているか確認してください"
      );
      return [];
    }

    console.log(`✅ ${data.length}件の百名山データを取得しました`);
    console.log('最初のデータ:', data[0]);

    // 全てのフィーチャーを地図上に表示する
    return data.map(
      (row: HyakumeizanFromDB): HyakumeizanFromSelected => ({
        geometry: new Point(
          fromLonLat([
            parseFloat(row.longitude || '0'),
            parseFloat(row.latitude || '0'),
          ])
        ),
        id: row.id,
        category: row.category,
        name: row.name,
        area: row.area || '',
        height: row.height,
        googlemaplink: row.googlemaplink,
        image: row.image || '',
        YAMAP: row.YAMAP,
      })
    );
  } catch (error) {
    console.error('❌ データ処理エラー:', error);
    return [];
  }
};
