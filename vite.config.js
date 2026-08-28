import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    {
      name: 'multi-page-dev-routing',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const rawUrl = req.url || '';
          const [pathname, search] = rawUrl.split('?');
          const cleanPath = pathname.replace(/\/$/, '');

          if (cleanPath === '/painel/admin') {
            req.url = '/painel/admin/index.html' + (search ? '?' + search : '');
          } else if (cleanPath === '/painel') {
            req.url = '/painel/index.html' + (search ? '?' + search : '');
          } else if (cleanPath === '/links') {
            req.url = '/links/index.html' + (search ? '?' + search : '');
          }

          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        links: resolve(__dirname, 'links/index.html'),
        painel: resolve(__dirname, 'painel/index.html'),
        painelAdmin: resolve(__dirname, 'painel/admin/index.html'),
      },
    },
  },
});
