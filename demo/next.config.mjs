import createMDX from '@next/mdx'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@formular/atomos', '@atomos/ui'],
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  webpack: (config) => {
    // Add aliases to use source files with mocks instead of built dist
    config.resolve.alias = {
      ...config.resolve.alias,
      '@atomos/ui': resolve(__dirname, '../packages/atomos-ui-mock/index.tsx'),
      'formular.dev': resolve(__dirname, '../src/mocks/formular-dev.ts'),
      '@formular/atomos': resolve(__dirname, '../src/index.ts'),
      // Support @ imports from source files - they should resolve to ../src
      // This won't conflict with demo @/ imports because those are processed
      // by the TypeScript path mapping in demo/tsconfig.json
      '@': resolve(__dirname, '../src'),
    }
    
    return config
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
