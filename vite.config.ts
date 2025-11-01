import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import svgr from "vite-plugin-svgr";
import { constants } from "zlib";

// Helper to keep all emitted files under dist/assets with predictable names
const rollupOutput = {
  entryFileNames: "assets/[name]-[hash].js",
  chunkFileNames: "assets/[name]-[hash].js",
  assetFileNames: (assetInfo: { name?: string }) => {
    // keep images/css/fonts under assets too
    return "assets/[name]-[hash][extname]";
  },
};

export default defineConfig({
  base: "/",                   // ensure relative paths in output
  plugins: [
    react(),
    svgr(),

    // Brotli compression (.br)
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
      compressionOptions: {
        params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
      },
      deleteOriginFile: false,
      // Only compress typical text assets
      filter: /\.(js|css|html|svg)$/i,
      verbose: false,
    }),

    // Gzip compression (.gz) fallback
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|css|html|svg)$/i,
      verbose: false,
    }),
  ],

  build: {
    outDir: "dist",            // explicit (default, but we force it)
    assetsDir: "assets",       // explicit subdir
    target: "es2020",
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 0,      // better caching
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
   

    rollupOptions: {
      output: rollupOutput,    // <� enforce relative asset paths
    },

    commonjsOptions: { transformMixedEsModules: true },
  },
  esbuild: { drop: ["console", "debugger"] },

   server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['token.buycex.com', '.ngrok-free.dev', 'https://iamdino.org',     'sole-everything-img-prison.trycloudflare.com'
],
  },

});
