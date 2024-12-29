import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="wrapper">
        <header id="header">
          <h1 className="h1-title_text">
            <img src="./img/mountain.png" width="30px" height="30px" />
            <a href="index.php">ねいちず-NatureMaps</a>
          </h1>
          <nav className="pc-nav">
            <ul>
              <li>
                <a href="index.php">TOP</a>
              </li>
              <li>
                <a href="other_list.php">OTHERS</a>
              </li>
              {/* <li><a href="Jihanki-info.html">INFO</a></li>
<li><a href="myprof.html">PROFILE</a></li> */}
            </ul>
          </nav>
          <nav className="sp-nav">
            <ul>
              <li>
                <a href="index.php">TOP</a>
              </li>
              <li>
                <a href="other_list.php">OTHERS</a>
              </li>
              {/* <li><a href="Jihanki-info.html">INFO</a></li>
<li><a href="myprof.html">PROFILE</a></li> */}
              <li className="close">
                <span>閉じる</span>
              </li>
            </ul>
          </nav>
          <div id="hamburger">
            <span></span>
          </div>
        </header>
        {/* end Header */}
        {/* スマホナビの表示・非表示 */}
        <div className="map_title">
          <h2 className="h2-title_text">トップページ</h2>
        </div>

        {/* content */}
        <div className="content">
          <div className="white_back">
            <div className="white_back_inner">
              <div className="white_back_inner_eyecatch">
                <p>
                  <a href="hyakumeizan.php">
                    <img src="img/hyakumeizan-eyecatch.webp" alt="" />
                  </a>
                </p>
                <p className="white_inner_map-title">
                  <a className="link_url" href="hyakumeizan.php">
                    -百名山マップ-
                  </a>
                </p>
                <div className="white_back_inner_info">
                  <p>日本百名山のマップです</p>
                  <p>
                    <a
                      className="link_url"
                      href="https://www.momonayama.net/hundred_mt_list_data/list.html"
                      target="_blank"
                    >
                      参考になったサイト
                    </a>
                  </p>
                </div>
              </div>
              <div className="white_back_inner_eyecatch">
                <p>
                  <a href="geopark.php">
                    <img src="img/geopark-eyecatch.webp" alt="" />
                  </a>
                </p>
                <p className="white_inner_map-title">
                  <a className="link_url" href="geopark.php">
                    -ジオパークマップ-
                  </a>
                </p>
                <div className="white_back_inner_info">
                  <p>日本ジオパークのマップです</p>
                  <p>
                    <a
                      className="link_url"
                      href="https://geopark.jp/geopark/"
                      target="_blank"
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
                  <a href="tokyo-green.php">
                    <img src="img/tokyo-green_eyecatch.webp" alt="" />
                  </a>
                </p>
                <div className="white_inner_map-title">
                  <a
                    className="link_url"
                    href="tokyo-green.php"
                    style={{ fontSize: "1rem" }}
                  >
                    -東京23区の緑被分布図
                    <br />
                    (1984-2023)-
                  </a>
                </div>
                <div className="white_back_inner_info">
                  <p>
                    卒業研究で作成した、衛星画像から作成した東京都23区の年代別の緑被分布図です。
                  </p>
                  <p>
                    <a className="link_url" href="" target="_blank">
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
        {/* content */}
        <footer className="foot_nav">
          <p className="foot_nav_p">@naturemap since2023</p>
        </footer>
      </div>
    </>
  );
}
