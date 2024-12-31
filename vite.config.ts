import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/**/*',
          dest: 'assets'
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@/app': '/src/app',
      '@/assets': '/src/assets',
      '@/components': '/src/components',
      '@/features': '/src/features',
      '@/hooks': '/src/hooks',
      '@/pages': '/src/pages',
      '@/routes': '/src/routes',
      '@/themes': '/src/themes',
      '@/styles': '/src/styles',
      '@/utils': '/src/utils',
      '@/services': '/src/services',
      '@/config': '/src/config',
      '@/types': '/src/types',
      '@/store': '/src/store',
      '@/layout': '/src/layout',
      '@/data': '/src/data',
      '@/helper': '/src/helper',
      '@/i18n': '/src/i18n',
    },
  },
});