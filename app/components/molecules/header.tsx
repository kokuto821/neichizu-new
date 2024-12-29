import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
    return(
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
      )
}