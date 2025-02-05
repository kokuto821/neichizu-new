import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <div className="main_header">
      <h1 className="h1-title_text">
        <Image src="/img/logo.png" width={40} height={40} alt="Logo Icon" />
        <Link href="/" className="main_header__title_text">
          ねいちず-NatureMaps
        </Link>
      </h1>
      <nav className="pc-nav">
        <ul>
          <li>
            <Link href="/" className="main_header__menu-text">TOP</Link>
          </li>
          <li>
            <Link href="/other_list" className="main_header__menu-text">OTHERS</Link>
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
    </div>
  );
};
