# Antigravity Project Context: Neichizu

## 1. Project Overview

**Name**: Neichizu (Nature x Chizu)
**Concept**: A platform specialized in discovery of "natural spots" without noise, focusing on intuitive exploration and immersion.
**Core Value**:

- **Visual First**: High-resolution photos and immersive UI.
- **Exploration**: Horizontal swipe for zapping through spots, seamless card expansion.
- **Simplicity**: No noise, direct access to nature information.

## 2. Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS (v3 with v4 postcss plugin?), Emotion
- **Animation**: Framer Motion
- **Map Engine**: OpenLayers (`ol`)
- **Backend/Data**: Supabase
- **State/Logic**: Custom hooks, Jotai(global state)

## 3. Directory Structure

- `app/`: Main application code (App Router).
  - `feature/`: Feature-based modules.
  - `components/`: Reusable UI components.
  - `hooks/`: Shared hooks.
  - `utils/`: Shared utilities.
- `public/`: Static assets (images, icons).

## 4. Design System

**Colors** (from `tailwind.config.ts`):

- `ecruWhite`: `var(--ecruWhite)`
- `darkGreen`: `var(--darkGreen)`
- `semiDarkGreen`: `var(--semiDarkGreen)`
- `middleGreen`: `var(--middleGreen)`
- `lightGreen`: `var(--lightGreen)`
- `accentOrange`: `var(--accentOrange)`
- `accentLightOrange`: `var(--accentLightOrange)`
- `gray`: `var(--gray)`

**UI/UX Principles**:

- **Card Expansion**: Smooth transition from compact card to full-screen detail.
- **Swipe Navigation**: Horizontal scrolling for spotting.
- **Earth Tones**: Consistent use of sage greens and natural whites.

## 5. Development Workflow

**Commands**:

- `npm run dev`: Start development server (using `--webpack`).
- `npm run build`: Build for production.
- `npm run lint`: Run ESLint.

**Rules**:

- **Language**: Japanese (Always respond in Japanese).
- **Quality**: Always run lint after changes.
- **Strict Adherence**: Follow instructions precisely.

## 6. Key Features (Inferred)

- **Hyakumeizan**: 100 Famous Mountains data/display.
- **Geopark**: Geopark data/display.
- **Map Integration**: Displaying spots on a map with clustering.

## 7. Coding Rules

**General Principles**:

- **Strict Adherence**: Follow instructions exactly. Do not add/remove features without permission.
- **Language**: All responses must be in Japanese.
- **Clarification**: Always ask questions if requirements are unclear.
- **Verification**: Always run `npm run lint` after changes.
- **Synchronization**: This file and `antigravity_ja.md` must be updated simultaneously whenever a change is made to either.

**Code Style (Enforced by ESLint/Prettier)**:

- **Formatting**: Prettier (2 spaces, single quotes, semi-colons).
- **React**: Function components. No `prop-types` (use TS interface).
- **Typos/Unused**: `no-unused-vars` (warn), `no-console` (warn).
- **Imports**: Use `@/` alias for absolute imports.

## 8. Tailwind CSS Guidelines

**Style Object Pattern (必須 / Required)**:

- TailwindCSSのクラス文字列は、コンポーネント外部の `const style` オブジェクトで一元管理すること。JSX内に直接クラス文字列を記述しない。
- Define all Tailwind class strings in a `const style` object outside the component. Do not write class strings directly in JSX.

  ```tsx
  const style = {
    container: 'flex flex-col p-4 bg-white rounded',
    title: 'text-xl font-bold text-gray-800',
  };
  ```

**Rules**:

- **No `@apply`**: Avoid using `@apply` in CSS files unless absolutely necessary for global styles.
- **Custom Colors**: Use defined theme colors (`ecruWhite`, `darkGreen`, etc.) instead of arbitrary hex values.
- **Dynamic Styles**: Use template literals for conditional classes.

  ```tsx
  className={`${style.base} ${isActive ? style.active : ''}`}
  ```

- **Ordering**: Group layout, spacing, and visual classes logically.
