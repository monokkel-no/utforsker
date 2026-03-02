import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import viteReact from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { faviconsPlugin } from "./build/faviconsPlugin/faviconsPlugin.js";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const config = defineConfig({
  envDir: "../..",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    devtools(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({ server: { preset: "netlify" } }),
    viteReact(),
    vanillaExtractPlugin(),
    faviconsPlugin(),
  ],
});

export default config;
