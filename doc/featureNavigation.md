# フィーチャスワイプナビゲーション実装ガイド

## 📦 実装ファイル

### 1. **useFeatureNavigation.ts**
配置先: `/app/hooks/useFeatureNavigation.ts`

**機能:**
- OpenLayersの地図から該当レイヤータイプの全フィーチャを取得
- ID昇順でソート
- 現在選択中のフィーチャのインデックスを計算
- 次/前のフィーチャへのナビゲーション機能を提供

**特徴:**
- カテゴリ（百名山 or ジオパーク）を自動判定
- 型安全なフィーチャ変換
- エッジケース（最初/最後のフィーチャ）を自動処理

---

### 2. **useSwipeNavigation.ts**
配置先: `/app/hooks/useSwipeNavigation.ts`

**機能:**
- 左右・下方向のスワイプを検出
- タッチとマウスの両方に対応
- プルトゥリフレッシュの防止

**特徴:**
- スワイプ方向を自動判定（優勢な方向を採用）
- 個別のスワイプ方向を無効化可能
- 既存の`useSwipe`フックより柔軟で拡張性が高い

---

### 3. **NeiExpandedCard.tsx（更新版）**
配置先: `/app/components/molecules/NeiExpandedCard.tsx`

**変更点:**
- `map`と`onFeatureChange`をpropsとして受け取る
- `useFeatureNavigation`で次/前のフィーチャを管理
- `useSwipeNavigation`で左右スワイプを検出
- framer-motionでスムーズな横スライドアニメーション実装

**アニメーション:**
- 左スワイプ: カードが左に消えて、次のカードが右から登場
- 右スワイプ: カードが右に消えて、前のカードが左から登場

---

### 4. **NeiCard.tsx（更新版）**
配置先: `/app/components/molecules/NeiCard.tsx`

**変更点:**
- `map`と`onFeatureChange`をpropsとして受け取り、`NeiExpandedCard`に渡す

---

### 5. **page.tsx（更新版）**
配置先: `/app/feature/map/hyakumeizan/page.tsx`

**変更点:**
- `NeiCard`に`map`と`onFeatureChange={setSelectedFeature}`を渡す

---

## 🚀 使い方

### 基本的な流れ

1. ユーザーが地図上のフィーチャをクリック
2. `NeiCompactCard`が表示される
3. カードをタップして`NeiExpandedCard`に展開
4. **左スワイプ → 次のフィーチャ**
5. **右スワイプ → 前のフィーチャ**
6. **下スワイプ → カードを閉じる**

### スワイプの挙動

- **百名山を選択中**: 百名山の中だけで移動
- **ジオパークを選択中**: ジオパークの中だけで移動
- **最初のフィーチャで右スワイプ**: 無効（何も起こらない）
- **最後のフィーチャで左スワイプ**: 無効（何も起こらない）

---

## 🎨 アニメーション詳細

### カード切り替えアニメーション

```typescript
const cardVariants = {
  enter: (direction: SwipeDirection) => ({
    x: direction === 'left' ? 300 : direction === 'right' ? -300 : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: SwipeDirection) => ({
    x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
    opacity: 0,
  }),
};
```

- **duration**: 0.3秒
- **easing**: easeInOut
- **mode**: wait（前のカードが完全に消えてから次のカードが表示される）

---

## 🔧 カスタマイズ

### スワイプ閾値の変更

```typescript
const { onTouchStart, onTouchMove, onTouchEnd, onMouseDown } =
  useSwipeNavigation({
    onSwipeDown: onClose,
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    threshold: 150, // デフォルト: 100px
  });
```

### アニメーション速度の変更

```typescript
transition={{ duration: 0.5, ease: 'easeInOut' }} // デフォルト: 0.3秒
```

### スワイプ方向の無効化

```typescript
const { onTouchStart, onTouchMove, onTouchEnd, onMouseDown } =
  useSwipeNavigation({
    onSwipeDown: onClose,
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    disableLeftSwipe: !canGoNext, // 次がない場合は左スワイプ無効
    disableRightSwipe: !canGoPrev, // 前がない場合は右スワイプ無効
  });
```

---

## 📝 実装のポイント

### 1. **型安全性**
- OpenLayersのFeatureから型付きオブジェクトへの変換を一元管理
- 百名山とジオパークで異なる型を正しく扱う

### 2. **パフォーマンス**
- フィーチャリストの取得とソートは`useEffect`で一度だけ実行
- `useMemo`と`useCallback`で不要な再計算を防止

### 3. **ユーザビリティ**
- スワイプ方向の優勢判定で誤操作を防止
- エッジケース（最初/最後）で自動的にスワイプを無効化
- プルトゥリフレッシュの防止

### 4. **保守性**
- 各機能を独立したフックに分離
- 単一責任の原則に従った設計
- 明確な命名とコメント

---

## 🐛 トラブルシューティング

### Q: スワイプが反応しない
A: `map`が正しく渡されているか確認してください。`map`が`null`の場合、フィーチャリストが取得できません。

### Q: アニメーションがカクつく
A: `AnimatePresence`の`mode="wait"`を確認してください。また、`transition`の`duration`を調整してみてください。

### Q: 最初/最後のフィーチャでスワイプできてしまう
A: `useSwipeNavigation`の`disableLeftSwipe`と`disableRightSwipe`が正しく設定されているか確認してください。

---

## ✅ チェックリスト

実装前に以下を確認してください：

- [ ] `useFeatureNavigation.ts`を`/app/hooks/`に配置
- [ ] `useSwipeNavigation.ts`を`/app/hooks/`に配置
- [ ] `NeiExpandedCard.tsx`を更新
- [ ] `NeiCard.tsx`を更新
- [ ] `page.tsx`を更新
- [ ] TypeScriptのエラーがないことを確認
- [ ] 百名山とジオパークの両方でテスト
- [ ] モバイルとデスクトップの両方でテスト

---

## 🎯 今後の拡張案

- **ループナビゲーション**: 最後のフィーチャから最初に戻る
- **キーボードナビゲーション**: 矢印キーで移動
- **プログレスインジケーター**: 「3 / 100」のような表示
- **スワイプヒント**: 初回表示時にチュートリアル
- **スワイプ感度の調整**: ユーザー設定で閾値を変更可能に

---

## 📚 参考資料

- [framer-motion AnimatePresence](https://www.framer.com/motion/animate-presence/)
- [OpenLayers Vector Layers](https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector.html)
- [React Touch Events](https://react.dev/reference/react-dom/components/common#touch-events)