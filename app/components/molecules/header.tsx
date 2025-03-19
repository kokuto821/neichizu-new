'use client';

import { styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TitleWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
})

const ImageWrapper = styled('div')({
  height: '100%',
});

export const Header = () => {
  return (
    <div className="main_header">
      <TitleWrapper>
      <ImageWrapper><Image src="/img/logo.png" width={25} height={25} alt="Logo Icon" /></ImageWrapper>
      
      <h1 className="h1-title_text">
        <Link href="/" className="main_header__title_text">
          ねいちず-NatureMaps
        </Link>
      </h1>
      </TitleWrapper>
      
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
