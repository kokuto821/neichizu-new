import { useEffect } from 'react';

const registerSW = async (): Promise<void> => {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};

const isServiceWorkerSupported = (): boolean => 
  typeof window !== 'undefined' && 'serviceWorker' in navigator;

export const useServiceWorker = () => {
  useEffect(() => {
    if (!isServiceWorkerSupported()) return;

    window.addEventListener('load', registerSW);

    return () => {
      window.removeEventListener('load', registerSW);
    };
  }, []);
};