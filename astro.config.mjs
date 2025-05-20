// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
site: 'https://hektor.mx/', 
base: '/', // Configuración base
integrations: [mdx(), vue(), sitemap()], 
vite: {
	build: {
	rollupOptions: {
		output: {
		assetFileNames: (assetInfo) => {
			// Personalización del nombre de los archivos CSS
			if (assetInfo.name === 'index.css') {
			return 'assets/css/main.css';
			}
			return 'assets/[name][extname]';
		},
		},
	},
	},
},
});
