import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
    }
  },
  esbuild: {
    loader: 'jsx',
    include: /(src)\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad(
              { filter: /(src)\/.*\.js$/ },
              async (args) => ({
                loader: 'jsx',
                contents: await fs.readFile(args.path, 'utf8'),
              })
            );
          },
        },
      ],
    },
  }
})
