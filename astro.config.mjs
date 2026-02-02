// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// 熱門 15 種語言（第一階段）
const locales = [
  'zh-TW', // 繁體中文（預設）
  'en',    // English
  'ja',    // 日本語
  'ko',    // 한국어
  'zh-CN', // 简体中文
  'es',    // Español
  'fr',    // Français
  'de',    // Deutsch
  'it',    // Italiano
  'pt',    // Português
  'ru',    // Русский
  'ar',    // العربية
  'hi',    // हिन्दी
  'th',    // ไทย
  'vi',    // Tiếng Việt
];

// https://astro.build/config
export default defineConfig({
  site: 'https://smartsequence.tech',
  
  // 多語言配置
  i18n: {
    defaultLocale: 'zh-TW',
    locales: locales,
    routing: {
      prefixDefaultLocale: false, // zh-TW 不加前綴（/ 而非 /zh-TW）
      redirectToDefaultLocale: false, // 不自動重定向，允許訪問 /en/ 等路徑
    },
  },
  
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'zh-TW',
        locales: locales,
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});