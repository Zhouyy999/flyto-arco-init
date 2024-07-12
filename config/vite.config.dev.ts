import { defineConfig, loadEnv, mergeConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import baseConfig from './vite.config.base'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return mergeConfig(
    {
      mode: 'development',
      server: {
        open: false,
        port: 9000,
        fs: {
          strict: true,
        },
        proxy: {
          '/api': {
            target: env.VITE_API_BASE_URL,
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
          },
        },
      },
      plugins: [
        eslint({
          cache: false,
          include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
          exclude: ['node_modules'],
        }),
      ],
    },
    baseConfig,
  )
})
