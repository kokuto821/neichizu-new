import { useEffect } from 'react';

const registerSW = async (): Promise<void> => {
  try {
    // 登録時にログを追加
    console.log('Service Workerの登録を開始');
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    console.log('Service Worker登録成功:', registration);
  } catch (error) {
    console.error('Service Worker登録失敗:', error);
  }
};

export const useServiceWorker = () => {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker未対応');
      return;
    }

    registerSW();
  }, []);
};