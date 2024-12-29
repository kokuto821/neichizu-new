// app/feature/map/hyakumeizan/page.tsx
import dynamic from 'next/dynamic';

// MapComponentを動的にインポートし、SSRを無効にする
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

const Page = () => {
  return (
    <div>
      <h1>地図ページ</h1>
      <MapComponent />
    </div>
  );
};

export default Page;
