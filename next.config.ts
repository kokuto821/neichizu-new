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
        'service-worker':  './public/service-worker.js'
      };
    }

    return config;
  },

  // Service Worker用のセキュリティヘッダーを追加
  headers: async () => [
    {
      source: '/service-worker.js',
      headers: [
            {
              key: 'Service-Worker-Allowed',
              value: '/'
            },
            {
              key: 'Cache-Control',
              value: 'public, max-age=0, must-revalidate'
            },
            {
              key: 'Content-Type',
              value: 'application/javascript; charset=utf-8'
            }
          ]
    }
  ],
};

export default nextConfig;
