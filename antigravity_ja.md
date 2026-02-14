# Antigravity プロジェクトコンテキスト: Neichizu

## 1. プロジェクト概要

**名称**: Neichizu (Nature x Chizu)
**コンセプト**: 「自然SPOT」の発見に特化し、直感的な探索と没入感に焦点を当てた、ノイズのないプラットフォーム。
**コアバリュー**:

- **ビジュアル重視**: 高解像度写真と没入型UI。
- **探索**: スポットをザッピングするための水平スワイプ、シームレスなカード展開。
- **シンプルさ**: ノイズを排除し、自然情報に直接アクセス。

## 2. 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript 5.7
- **スタイリング**: Tailwind CSS (v3 + v4 postcss plugin?), Emotion
- **アニメーション**: Framer Motion
- **地図エンジン**: OpenLayers (`ol`)
- **バックエンド/データ**: Supabase
- **状態/ロジック**: カスタムフック, Jotai(global state)

## 3. ディレクトリ構成

- `app/`: メインアプリケーションコード (App Router)。
  - `feature/`: 機能ベースのモジュール (地図、山、ジオパークに関するロジックなど)。
  - `components/`: 再利用可能なUIコンポーネント (Atoms, Molecules, etc.)。
  - `hooks/`: 共有フック。
  - `utils/`: 共有ユーティリティ。
- `public/`: 静的アセット (画像、アイコン)。

## 4. デザインシステム

**カラー** (`tailwind.config.ts` より):

- `ecruWhite`: `var(--ecruWhite)`
- `darkGreen`: `var(--darkGreen)`
- `semiDarkGreen`: `var(--semiDarkGreen)`
- `middleGreen`: `var(--middleGreen)`
- `lightGreen`: `var(--lightGreen)`
- `accentOrange`: `var(--accentOrange)`
- `accentLightOrange`: `var(--accentLightOrange)`
- `gray`: `var(--gray)`

**UI/UX 原則**:

- **カードの展開**: コンパクトカードから全画面詳細へのスムーズな遷移。
- **スワイプナビゲーション**: スポッティングのための水平スクロール。
- **アースカラー**: セージグリーンとナチュラルホワイトの一貫した使用。

## 5. 開発ワークフロー

**コマンド**:

- `npm run dev`: 開発サーバー起動 (`--webpack` 使用)。
- `npm run build`: プロダクションビルド。
- `npm run lint`: ESLint 実行。

**ルール**:

- **言語**: 日本語 (常に日本語で回答すること)。
- **品質**: 変更後は必ず Lint を実行すること。
- **厳守**: 指示に従い、正確に実行すること。

## 6. 主要機能 (推測)

- **百名山**: 日本百名山のデータ/表示。
- **ジオパーク**: ジオパークのデータ/表示。
- **地図連携**: クラスタリングを用いた地図上へのスポット表示 (計画/実装済み)。

## 7. コーディングルール

**一般原則**:

- **厳守**: 指示を正確に守ること。許可なく機能の追加/削除を行わないこと。
- **言語**: すべての回答は日本語で行うこと。
- **確認**: 要件が不明確な場合は必ず質問すること。
- **検証**: 変更後は必ず `npm run lint` を実行すること。
- **同期**: このファイルと `antigravity.md` は、どちらか一方が更新された場合、必ず同時にもう一方も更新すること。

**コードスタイル (ESLint/Prettier による強制)**:

- **フォーマット**: Prettier (2 spaces, single quotes, semi-colons)。
- **React**: 関数コンポーネント。`prop-types` は使用せず、TS interface を使用すること。
- **Typo/未使用**: `no-unused-vars` (warn), `no-console` (warn)。
- **インポート**: 絶対パスでのインポートには `@/` エイリアスを使用すること。

## 8. Tailwind CSS ガイドライン

**スタイルオブジェクトパターン (必須)**:

- TailwindCSSのクラス文字列は、コンポーネント外部の `const style` オブジェクトで一元管理すること。JSX内に直接クラス文字列を記述しない。

  ```tsx
  const style = {
    container: 'flex flex-col p-4 bg-white rounded',
    title: 'text-xl font-bold text-gray-800',
  };
  ```

**ルール**:

- **`@apply` 禁止**: グローバルスタイルにどうしても必要な場合を除き、CSSファイル内での `@apply` の使用は避けること。
- **カスタムカラー**: 任意の16進数ではなく、定義されたテーマカラー (`ecruWhite`, `darkGreen` など) を使用すること。
- **動的スタイル**: 条件付きクラスにはテンプレートリテラルを使用すること。

  ```tsx
  className={`${style.base} ${isActive ? style.active : ''}`}
  ```

- **順序**: レイアウト、余白、視覚効果クラスを論理的にグループ化すること。
