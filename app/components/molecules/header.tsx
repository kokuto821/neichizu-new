import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header id="header">
      <h1 className="h1-title_text">
        <Image src="/img/logo.png" width={40} height={40} alt="Logo Icon" />
        <Link href="/" className="a-title_text">
          ねいちず-NatureMaps
        </Link>
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
  );
};
