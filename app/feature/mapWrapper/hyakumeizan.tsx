import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/app/components/molecules/header';

export const Hyakumeizan = () => {
  return (
    <div>
      {/* ヘッダーをインクルード */}
      <Header />

      {/* スマホナビの表示・非表示 */}
      <div className="map_title">
        <h2 className="h2-title_text">
          <Image src="/img/mountain.png" width={30} height={30} alt="山のアイコン" />
          日本百名山
        </h2>
      </div>

      <div className="map_wrap">
        <iframe 
          src="/hyakumeizan-map" // Next.jsではPHPファイルではなく、ルートを指定
          className="mapflame"
          style={{ border: 'none', width: '100%', height: '500px' }} // iframeのスタイルを追加
        ></iframe>
      </div>

      <footer className="foot_nav">
        <p className="foot_nav_p">
          <Link href="https://www.google.com/maps/d/viewer?mid=1OjXFg_mjG2QeZTXK1enyj0957jiP9Og&ll=38.66483464924118%2C140.62674284694677&z=7" target="_blank" rel="noopener noreferrer">
            Googlemapで見る
          </Link>
        </p>
      </footer>
    </div>
  );
}
