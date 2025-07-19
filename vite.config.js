import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(eslint),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Realestway",
        short_name: "Realestway",
        description: "Rent and manage houses easily across Nigeria.",
        theme_color: "#100073",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/applogo.jpg",
            sizes: "192x192",
            type: "image/jpg",
          },
          {
            src: "/favicon.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/applogo.jpg",
            sizes: "512x512",
            type: "image/jpg",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
