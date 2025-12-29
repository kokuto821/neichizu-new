This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Neichizu プロジェクト要件・実装定義書

## 1. アプリケーションのコンセプト

**「自然（Nature）× 地図（Chizu）」**
既存の地図アプリでは埋もれてしまう「自然のスポット」を、ノイズレスに探索・発見することに特化したプラットフォーム。

## 2. コア要件（Core Requirements）

- **目的:** ユーザーが「今度の休みに行きたい自然」を直感的に見つけ、その景観に没入すること。
- **主要ターゲット:** アウトドア愛好家、風景写真家、地理好き、自然好き。
- **機能方針:**
  - **情報の閲覧に特化:** 投稿機能やバッジ機能（ゲーミフィケーション）はあえて実装せず、シンプルかつ高精度な情報の提供を優先。
  - **外部連携:** 詳細調査や実際のナビゲーションは、Google MapsやYAMAP等の既存インフラへシームレスに繋ぐ。

## 3. UI/UX デザイン指針

ありきたりなハーフモーダルを避け、独自の「探索体験」を実現するためのUI構成。

### ① 「カード・エクスパンド（成長）」アニメーション

- **挙動:** 下部のスポットカードをタップ、または上方向へスワイプすると、カードが画面全体へ滑らかに広がり詳細画面に昇華する。
- **効果:** 画面遷移によるコンテキストの断絶を防ぎ、写真を中心とした没入感を創出。

### ② 水平スワイプによるインデックス探索

- **挙動:** 画面下部のカードエリアを左右にスワイプすることで、地図上のフォーカス（強調表示）を次々と切り替える。
- **メリット:** 検索窓に文字を打つことなく、指先一つで次々と景色をザッピングできる。

### ③ ビジュアル・ファーストな情報設計

- **レイアウト:** 詳細画面では高解像度写真を最優先（画面上部〜全面）に配置。
- **背景演出:** 詳細展開時、背後の地図に `backdrop-filter: blur()` を適用し、地図との繋がりを維持しつつ情報の可視性を確保。

## 4. 今後の実装ロードマップ

| フェーズ    | 項目                 | 内容                                                                         |
| :---------- | :------------------- | :--------------------------------------------------------------------------- |
| **Phase 1** | **地図の最適化**     | ピンの密集を解消する「クラスタリング」の導入。                               |
| **Phase 2** | **ジェスチャー実装** | `framer-motion` や `vaul` 等を用いた、横スワイプと拡大アニメーションの両立。 |
| **Phase 3** | **視覚情報の強化**   | スポット詳細における写真比率の向上と、アースカラー基調のUIトーンの統一。     |
| **Phase 4** | **UXの磨き込み**     | 屋外（太陽光下）での視認性確保のためのコントラスト調整。                     |

## 5. アイデンティティ

- **ロゴ:** 2つの山をモチーフにした幾何学的なシンボル。
- **カラー:** セージグリーン等のアースカラー。
- **透明度:** ロゴ・アイコンの視認性を高めるため、境界線がぼやけないソリッドな加工を施す。
