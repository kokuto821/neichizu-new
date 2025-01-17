import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "./components/molecules/header";
import { Footer } from "./components/molecules/footer";
import { ItemBoxEyecatch } from "./components/molecules/ItemBoxEyecatch";

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
              title={"百名山マップ"}
              url={"百名山マップ"}
              img={"/img/hyakumeizan-eyecatch.webp"}
              reference={
                "https://www.momonayama.net/hundred_mt_list_data/list.html"
              }
            >
              日本百名山のマップです
            </ItemBoxEyecatch>
            <div className="white_back_inner_eyecatch">
              <Link href="/feature/mapWrapper/hyakumeizan">
                <Image
                  src="/img/hyakumeizan-eyecatch.webp"
                  alt="百名山マップ"
                  width={500}
                  height={300}
                />
              </Link>
              <p className="white_inner_map-title">
                <Link href="/hyakumeizan" className="link_url">
                  -百名山マップ-
                </Link>
              </p>
              <div className="white_back_inner_info">
                <p>日本百名山のマップです</p>
                <p>
                  <a
                    className="link_url"
                    href="https://www.momonayama.net/hundred_mt_list_data/list.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    参考になったサイト
                  </a>
                </p>
              </div>
            </div>
            <div className="white_back_inner_eyecatch">
              <Link href="/geopark">
                <Image
                  src="/img/geopark-eyecatch.webp"
                  alt="ジオパークマップ"
                  width={500}
                  height={300}
                />
              </Link>
              <p className="white_inner_map-title">
                <Link href="/geopark" className="link_url">
                  -ジオパークマップ-
                </Link>
              </p>
              <div className="white_back_inner_info">
                <p>日本ジオパークのマップです</p>
                <p>
                  <a
                    className="link_url"
                    href="https://geopark.jp/geopark/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    参考になったサイト
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="white_back">
          <div className="white_back_inner">
            <div className="white_back_inner_eyecatch">
              <p className="map-eyecatch_block">
                <Link href="/tokyo-green">
                  <Image
                    src="/img/tokyo-green_eyecatch.webp"
                    alt="東京23区の緑被分布図"
                    width={500}
                    height={300}
                  />
                </Link>
              </p>
              <div className="white_inner_map-title">
                <Link
                  href="/tokyo-green"
                  className="link_url"
                  style={{ fontSize: "1rem" }}
                >
                  -東京23区の緑被分布図
                  <br />
                  (1984-2023)-
                </Link>
              </div>
              <div className="white_back_inner_info">
                <p>
                  卒業研究で作成した、衛星画像から作成した東京都23区の年代別の緑被分布図です。
                </p>
                <p>
                  <a
                    className="link_url"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    研究内容
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="white_back"></div>
        <div className="space"></div>
      </div>

      <Footer />
    </div>
  );
}
