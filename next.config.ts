import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // 警告を無視する設定
    config.module.rules.push({
      test: /web-worker\/node\.js$/,
      use: "null-loader",
    });

    // Service Workerのエントリーポイントを追加
    if (typeof config.entry === 'object' && !Array.isArray(config.entry)) {
      config.entry = {
        ...config.entry,
        'service-worker':  './public/sw.js'
      };
    }

    return config;
  },

  // Service Worker用のセキュリティヘッダーを追加
  headers: async () => [
    {
      source: '/sw.js',
      headers: [
        {
          key: 'Service-Worker-Allowed',
          value: '/'
        },
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, must-revalidate'
        }
      ]
    }
  ],
};

export default nextConfig;
