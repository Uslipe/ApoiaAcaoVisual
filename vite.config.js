import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [react(), svgrPlugin({ svgrOptions: { icon: true } })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.jsx",
    css: true,
    testTimeout: 10000,
  },
});
