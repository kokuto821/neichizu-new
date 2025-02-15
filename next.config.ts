import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // 警告を無視する設定
    config.module.rules.push({
      test: /web-worker\/node\.js$/,
      use: "null-loader",
    });

    return config;
  },
};

export default nextConfig;
