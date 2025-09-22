import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      include: [
        '**/assets/**/*.{jpg,jpeg,png,gif,tiff,webp,svg,avif}',
        '**/dhalia_works/**/*.{jpg,jpeg,png,gif,tiff,webp,svg,avif}'
      ],
      exclude: undefined,
      includePublic: true,
      logStats: true,
      png: {
        quality: 75,
        compressionLevel: 9,
        effort: 6,
      },
      jpeg: {
        quality: 75,
        mozjpeg: true,
      },
      jpg: {
        quality: 75,
        mozjpeg: true,
      },
      webp: {
        quality: 75,
        lossless: false,
        effort: 6,
      }
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3002",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    assetsInlineLimit: 4096, // 4kb
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset';
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(name)) {
            return `assets/images/${name.replace(/\.[^/.]+$/, '')}-[hash][extname]`;
          }
          return `assets/${name}-[hash][extname]`;
        },
      },
    },
  },
});
