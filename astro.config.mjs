// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';

// https://astro.build/config
export default defineConfig({
  site: 'http://hektor.mx/',
  integrations: [mdx(), vue(), sitemap()],
  base: '/',
  vite: {
    css: {
      devSourcemap: true,
      postcss: {
        plugins: [
          postcssNested(),
          autoprefixer()
        ]
      }
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'index.css') {
              return 'assets/css/main.css';
            }
            if (assetInfo.name?.endsWith('.css')) {
              return 'assets/css/[name]-[hash].css';
            }
            return 'assets/[name][extname]';
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
        }
      }
    }
  }
});