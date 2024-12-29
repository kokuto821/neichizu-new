import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="wrapper">
      <header id="header">
        <h1 className="h1-title_text">
          <Image src="/img/mountain.png" width={30} height={30} alt="Mountain icon" />
          <Link href="/">ねいちず-NatureMaps</Link>
        </h1>
        <nav className="pc-nav">
          <ul>
            <li>
              <Link href="/">TOP</Link>
            </li>
            <li>
              <Link href="/other_list">OTHERS</Link>
            </li>
          </ul>
        </nav>
        <nav className="sp-nav">
          <ul>
            <li>
              <Link href="/">TOP</Link>
            </li>
            <li>
              <Link href="/other_list">OTHERS</Link>
            </li>
            <li className="close">
              <span>閉じる</span>
            </li>
          </ul>
        </nav>
        <div id="hamburger">
          <span></span>
        </div>
      </header>

      <div className="map_title">
        <h2 className="h2-title_text">トップページ</h2>
      </div>

      <div className="content">
        <div className="white_back">
          <div className="white_back_inner">
            <div className="white_back_inner_eyecatch">
              <Link href="/hyakumeizan">
                <Image src="/img/hyakumeizan-eyecatch.webp" alt="百名山マップ" width={500} height={300} />
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
            {/* 他の white_back_inner_eyecatch ブロックも同様に変更 */}
          </div>
        </div>
        {/* 他の white_back ブロックも同様に変更 */}
      </div>

      <footer className="foot_nav">
        <p className="foot_nav_p">@naturemap since2023</p>
      </footer>
    </div>
  );
}
