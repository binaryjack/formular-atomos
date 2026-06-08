import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = '/formular-atomos';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? `${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@formular/atomos', '@atomos/ui', 'formular.dev'],
};

export default nextConfig;
