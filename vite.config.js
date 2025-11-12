// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const windowsIcons = [
  // Square 44x44 Logos
  { src: "/Flxfy/windows11/Square44x44Logo.scale-100.png", sizes: "44x44", type: "image/png" },
  { src: "/Flxfy/windows11/Square44x44Logo.scale-125.png", sizes: "55x55", type: "image/png" },
  { src: "/Flxfy/windows11/Square44x44Logo.scale-200.png", sizes: "88x88", type: "image/png" },
  { src: "/Flxfy/windows11/Square44x44Logo.scale-400.png", sizes: "176x176", type: "image/png" },

  // Square 150x150 Logos
  { src: "/Flxfy/windows11/Square150x150Logo.scale-100.png", sizes: "150x150", type: "image/png" },
  { src: "/Flxfy/windows11/Square150x150Logo.scale-200.png", sizes: "300x300", type: "image/png" },

  // Wide 310x150 Logos
  { src: "/Flxfy/windows11/Wide310x150Logo.scale-100.png", sizes: "310x150", type: "image/png" },
  { src: "/Flxfy/windows11/Wide310x150Logo.scale-200.png", sizes: "620x300", type: "image/png" },

  // Store Logo
  { src: "/Flxfy/windows11/StoreLogo.scale-100.png", sizes: "50x50", type: "image/png" },
  { src: "/Flxfy/windows11/StoreLogo.scale-200.png", sizes: "100x100", type: "image/png" },
];
export default defineConfig({

  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      // Recommended: Auto-update service worker
      registerType: 'autoUpdate',

      manifest: {
        // RECOMMENDED PWA FIELDS
        name: 'FlxFy App',
        short_name: '\u200B',
        description: 'Your PWA Description',
        theme_color: '#ffffff', 
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/FlxFy/',
        start_url: '/FlxFy/index.html',  
        icons: [
          {
            src: "/FlxFy/android/android-launchericon-48-48.png",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "/FlxFy/android/android-launchericon-72-72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "/FlxFy/android/android-launchericon-96-96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "/FlxFy/android/android-launchericon-144-144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/FlxFy/android/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/FlxFy/android/android-launchericon-512-512.png", 
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },

          { src: "/FlxFy/ios/1024.png", sizes: "1024x1024", type: "image/png" },
          { src: "/FlxFy/ios/512.png", sizes: "512x512", type: "image/png" },
          { src: "/FlxFy/ios/256.png", sizes: "256x256", type: "image/png" },
          { src: "/FlxFy/ios/192.png", sizes: "192x192", type: "image/png" },
          { src: "/FlxFy/ios/180.png", sizes: "180x180", type: "image/png" },
          { src: "/FlxFy/ios/167.png", sizes: "167x167", type: "image/png" },
          { src: "/FlxFy/ios/152.png", sizes: "152x152", type: "image/png" },
          { src: "/FlxFy/ios/144.png", sizes: "144x144", type: "image/png" },
          { src: "/FlxFy/ios/128.png", sizes: "128x128", type: "image/png" },
          { src: "/FlxFy/ios/120.png", sizes: "120x120", type: "image/png" },
          { src: "/FlxFy/ios/144.png ", sizes: "114x114", type: "image/png" },
          { src: "/FlxFy/ios/100.png", sizes: "100x100", type: "image/png" },
          { src: "/FlxFy/ios/87.png", sizes: "87x87", type: "image/png" },
          { src: "/FlxFy/ios/80.png", sizes: "80x80", type: "image/png" },
          { src: "/FlxFy/ios/76.png", sizes: "76x76", type: "image/png" },
          { src: "/FlxFy/ios/72.png", sizes: "72x72", type: "image/png" },
          { src: "/FlxFy/ios/64.png", sizes: "64x64", type: "image/png" },
          { src: "/FlxFy/ios/60.png", sizes: "60x60", type: "image/png" },
          { src: "/FlxFy/ios/58.png", sizes: "58x58", type: "image/png" },
          { src: "/FlxFy/ios/57.png", sizes: "57x57", type: "image/png" },
          { src: "/FlxFy/ios/50.png", sizes: "50x50", type: "image/png" },
          { src: "/FlxFy/ios/40.png", sizes: "40x40", type: "image/png" },
          { src: "/FlxFy/ios/32.png", sizes: "32x32", type: "image/png" },
          { src: "/FlxFy/ios/29.png", sizes: "29x29", type: "image/png" },
          { src: "/FlxFy/ios/20.png", sizes: "20x20", type: "image/png" },
          { src: "/FlxFy/ios/16.png", sizes: "16x16", type: "image/png" },
        ...windowsIcons
        ]

      }
    })
  ],
  base: '/'
})