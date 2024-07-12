import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import configArcoStyleImportPlugin from './plugin/arcoStyleImport'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    configArcoStyleImportPlugin(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
      {
        find: '@type',
        replacement: resolve(__dirname, '../src/types'),
      },
      {
        find: '@store',
        replacement: resolve(__dirname, '../src/store'),
      },
      {
        find: '@hooks',
        replacement: resolve(__dirname, '../src/hooks'),
      },
      {
        find: '@enum',
        replacement: resolve(__dirname, '../src/enum'),
      },
    ],
    extensions: ['.ts', '.js'],
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            'src/assets/style/breakpoint.less',
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
})
