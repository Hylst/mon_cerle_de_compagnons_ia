import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            'audio-processing': path.resolve(__dirname, 'lib/worklets/audio-processing.ts'),
            'vol-meter': path.resolve(__dirname, 'lib/worklets/vol-meter.ts')
          },
          output: {
            entryFileNames: (chunkInfo) => {
              const worklets = ['audio-processing', 'vol-meter'];
              if (worklets.includes(chunkInfo.name)) {
                return 'assets/[name].js';
              }
              return 'assets/[name]-[hash].js';
            },
            chunkFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]',
          }
        }
      }
    };
});
