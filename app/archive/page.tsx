import React from 'react';
import { Header } from './header';
import { MainFooter } from './mainFooter';
import { ItemBoxEyecatch } from './ItemBoxEyecatch';

export default function Home() {
  return (
    <div className="wrapper">
      <Header />

      <div className="map_title">
        <h2 className="h2-title_text">トップページ</h2>
      </div>

      <div className="content">
        <div className="white_back">
          <div className="white_back_inner">
            <ItemBoxEyecatch
              title="百名山マップ"
              url="/hyakumeizan"
              img="/img/hyakumeizan-eyecatch.webp"
              reference="https://www.momonayama.net/hundred_mt_list_data/list.html"
            >
              日本百名山のマップです
            </ItemBoxEyecatch>
            <ItemBoxEyecatch
              title="ジオパークマップ"
              url="/geopark"
              img="/img/geopark-eyecatch.webp"
              reference="https://geopark.jp/geopark/"
            >
              日本ジオパークのマップです
            </ItemBoxEyecatch>
          </div>
        </div>
        <div className="white_back">
          <div className="white_back_inner">
            <ItemBoxEyecatch
              title="東京23区の緑被分布図"
              url="/tokyo-green"
              img="/img/tokyo-green_eyecatch.webp"
              reference="#"
            >
              卒業研究で作成した、衛星画像から作成した東京都23区の年代別の緑被分布図です
              <br />
              (1984-2023)
            </ItemBoxEyecatch>
          </div>
        </div>
        <div className="white_back"></div>
        <div className="space"></div>
      </div>
      <MainFooter />
    </div>
  );
}
