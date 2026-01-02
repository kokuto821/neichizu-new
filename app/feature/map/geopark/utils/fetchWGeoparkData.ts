import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { getAllGeoparks } from '@/app/utils/supabaseFunctions';
import { WGeoparkFromDB } from '../types/types';

/**
 * Supabase から世界ジオパークの生データを取得し、地図用オブジェクトにマッピングして返す
 * @returns {Promise<Array<any>>} マッピング済みのジオパーク配列（geometry は ol/geom/Point）
 */
export const fetchWGeoparkData = async () => {
  try {
    console.log('🔄 Supabaseから世界ジオパークデータを取得中...');
    const { data, error } = await getAllGeoparks();

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
        "テーブル 'world_geopark' が存在するか、データが入っているか確認してください"
      );
      return [];
    }

    console.log(`✅ ${data.length}件の世界ジオパークデータを取得しました`);
    console.log('最初のデータ:', data[0]);
    console.log('カラム名:', Object.keys(data[0]));

    return data.map((row: WGeoparkFromDB) => {
      const mappedData = {
        name: row.name,
        area: row.area || '',
        category: row.category || '世界ジオパーク',
        comment: row.comment || '',
        googlemaplink: row.googlemaplink,
        website: row.website || '',
        image: row.image || '/img/geopark_w.png',
        geometry: new Point(
          fromLonLat([
            parseFloat(row.longitude || '0'),
            parseFloat(row.latitude || '0'),
          ])
        ),
      };
      console.log('マッピング後:', {
        name: mappedData.name,
        comment: mappedData.comment,
        website: mappedData.website,
      });
      return mappedData;
    });
  } catch (error) {
    console.error('❌ データ処理エラー:', error);
    return [];
  }
};
