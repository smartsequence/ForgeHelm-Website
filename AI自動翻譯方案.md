# AI 自動翻譯方案 - 55+ 語言支援

**建立日期**: 2026-01-25  
**版本**: v1.0  
**目標**: 使用 AI 自動翻譯支援 55+ 國家語言

---

## 🎯 三種方案比較

### 方案 1: 建置時 AI 翻譯（Build-time）⭐ **強烈推薦**

**架構：**
```
npm run build
  ↓
1. 讀取繁體中文內容
  ↓
2. 呼叫 AI API 翻譯成 55+ 語言
  ↓
3. 生成靜態多語言頁面
  ↓
4. 部署到 Vercel
```

**優點：**
- ✅ SEO 完美（每個語言獨立 URL）
- ✅ 速度極快（靜態頁面）
- ✅ 成本可控（建置時一次性成本）
- ✅ 可快取翻譯結果（避免重複翻譯）
- ✅ 離線可用
- ✅ 生產環境零成本

**缺點：**
- ⚠️ 建置時間較長（55+ 語言需要時間）
- ⚠️ 內容更新需要重新建置

**成本估算：**
```
假設：
- 5 個主要頁面
- 每頁約 2000 tokens
- 翻譯成 55 種語言
- 使用 GPT-4 Turbo: $0.01/1K input, $0.03/1K output

計算：
輸入：5 頁 × 2000 tokens × 55 語言 = 550K tokens
輸出：5 頁 × 2000 tokens × 55 語言 = 550K tokens
成本：(550K × $0.01 + 550K × $0.03) / 1000 = $22

一次性建置成本：約 $22
後續更新：僅翻譯變更部分，成本更低
```

---

### 方案 2: 執行時 AI 翻譯（Runtime）❌ **不推薦**

**架構：**
```
用戶訪問 /en/
  ↓
1. 檢查快取
  ↓
2. 無快取 → 呼叫 AI API 翻譯
  ↓
3. 返回翻譯結果
```

**優點：**
- ✅ 即時翻譯
- ✅ 不需要預先建置

**缺點：**
- ❌ 成本高（每次訪問都要 API 呼叫）
- ❌ 速度慢（需要等待 API 回應）
- ❌ SEO 不友善（搜尋引擎看不到翻譯）
- ❌ 不穩定（API 可能失敗）
- ❌ 需要快取機制（增加複雜度）

**成本估算：**
```
假設：
- 每月 1000 訪客
- 每頁 2000 tokens
- 55 種語言平均分配

計算：
每月 API 呼叫：1000 × 55 = 55,000 次
成本：55,000 × 2 × $0.01 = $1,100/月 ❌

這還不包括：
- API 失敗重試
- 快取儲存成本
- 維護成本
```

---

### 方案 3: 混合方案 ⭐ **平衡方案**

**架構：**
```
熱門語言（10-15 種）：
- 建置時預先翻譯
- 靜態生成頁面

其他語言（40+ 種）：
- 執行時 AI 翻譯
- 快取翻譯結果
```

**優點：**
- ✅ 熱門語言 SEO 完美
- ✅ 其他語言靈活支援
- ✅ 成本可控（僅熱門語言預先翻譯）

**缺點：**
- ⚠️ 需要維護兩套機制
- ⚠️ 其他語言 SEO 較差

**成本估算：**
```
建置時（15 種熱門語言）：
- 成本：約 $6

執行時（40 種其他語言）：
- 假設每月 100 次訪問
- 成本：100 × 2 × $0.01 = $2/月

總計：$6 + $2/月 = 非常可控 ✅
```

---

## 🚀 推薦實作：方案 1（建置時 AI 翻譯）

### 步驟 1: 安裝依賴

```bash
npm install openai
# 或
npm install @google-cloud/translate
# 或
npm install deepl-node
```

### 步驟 2: 建立翻譯腳本

**`scripts/translate-all.js`**

```javascript
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 支援的 55+ 語言列表
const LANGUAGES = {
  'en': 'English',
  'ja': '日本語',
  'ko': '한국어',
  'zh-CN': '简体中文',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
  'it': 'Italiano',
  'pt': 'Português',
  'ru': 'Русский',
  'ar': 'العربية',
  'hi': 'हिन्दी',
  'th': 'ไทย',
  'vi': 'Tiếng Việt',
  'id': 'Bahasa Indonesia',
  'tr': 'Türkçe',
  'pl': 'Polski',
  'nl': 'Nederlands',
  'sv': 'Svenska',
  'da': 'Dansk',
  'fi': 'Suomi',
  'no': 'Norsk',
  'cs': 'Čeština',
  'hu': 'Magyar',
  'ro': 'Română',
  'el': 'Ελληνικά',
  'he': 'עברית',
  'uk': 'Українська',
  'bg': 'Български',
  'hr': 'Hrvatski',
  'sk': 'Slovenčina',
  'sl': 'Slovenščina',
  'et': 'Eesti',
  'lv': 'Latviešu',
  'lt': 'Lietuvių',
  'mt': 'Malti',
  'ga': 'Gaeilge',
  'cy': 'Cymraeg',
  'is': 'Íslenska',
  'mk': 'Македонски',
  'sq': 'Shqip',
  'sr': 'Српски',
  'bs': 'Bosanski',
  'ca': 'Català',
  'eu': 'Euskara',
  'gl': 'Galego',
  'ms': 'Bahasa Melayu',
  'tl': 'Filipino',
  'sw': 'Kiswahili',
  'zu': 'isiZulu',
  'af': 'Afrikaans',
  'am': 'አማርኛ',
  'az': 'Azərbaycan',
  'be': 'Беларуская',
  'bn': 'বাংলা',
  'ka': 'ქართული',
  'kk': 'Қазақ',
  'ky': 'Кыргыз',
  'lo': 'ລາວ',
  'mn': 'Монгол',
  'my': 'မြန်မာ',
  'ne': 'नेपाली',
  'si': 'සිංහල',
  'ta': 'தமிழ்',
  'te': 'తెలుగు',
  'ur': 'اردو',
  'uz': 'Oʻzbek',
};

/**
 * 翻譯單段文字
 */
async function translateText(text, targetLang, targetLangName) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Translate the following Traditional Chinese (Taiwan) text to ${targetLangName} (${targetLang}). 
          
Maintain:
- Professional business tone
- Technical terms accuracy
- Marketing appeal
- Cultural appropriateness for ${targetLangName} speaking regions`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.3,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(`Error translating to ${targetLang}:`, error);
    return text; // 失敗時返回原文
  }
}

/**
 * 翻譯 JSON 物件（遞迴）
 */
async function translateObject(obj, targetLang, targetLangName, cache = {}) {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      // 檢查快取
      const cacheKey = `${targetLang}:${value}`;
      if (cache[cacheKey]) {
        result[key] = cache[cacheKey];
        console.log(`  [${targetLang}] ${key}: Using cache`);
      } else {
        console.log(`  [${targetLang}] ${key}: Translating...`);
        const translated = await translateText(value, targetLang, targetLangName);
        result[key] = translated;
        cache[cacheKey] = translated;
        
        // 延遲避免 rate limit
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } else if (typeof value === 'object' && value !== null) {
      result[key] = await translateObject(value, targetLang, targetLangName, cache);
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * 翻譯整個語言檔案
 */
async function translateLocaleFile(sourceFile, targetLang, targetLangName) {
  console.log(`\n🌍 Translating to ${targetLangName} (${targetLang})...`);
  
  // 讀取原始檔案
  const sourceContent = await fs.readFile(sourceFile, 'utf-8');
  const sourceJson = JSON.parse(sourceContent);
  
  // 讀取快取（如果存在）
  const cacheFile = `./.translation-cache/${targetLang}.json`;
  let cache = {};
  try {
    const cacheContent = await fs.readFile(cacheFile, 'utf-8');
    cache = JSON.parse(cacheContent);
    console.log(`  Using cache: ${Object.keys(cache).length} entries`);
  } catch {
    // 快取不存在，從頭開始
  }
  
  // 翻譯
  const translatedJson = await translateObject(sourceJson, targetLang, targetLangName, cache);
  
  // 儲存翻譯結果
  const targetDir = path.dirname(sourceFile).replace('zh-TW', targetLang);
  await fs.mkdir(targetDir, { recursive: true });
  const targetFile = path.join(targetDir, path.basename(sourceFile));
  await fs.writeFile(targetFile, JSON.stringify(translatedJson, null, 2), 'utf-8');
  
  // 儲存快取
  await fs.mkdir('.translation-cache', { recursive: true });
  await fs.writeFile(cacheFile, JSON.stringify(cache, null, 2), 'utf-8');
  
  console.log(`  ✅ Saved to ${targetFile}`);
}

/**
 * 主函式：翻譯所有語言
 */
async function translateAll() {
  const sourceFile = './src/i18n/locales/zh-TW.json';
  
  console.log('🚀 Starting translation for all languages...\n');
  
  // 依序翻譯所有語言
  for (const [langCode, langName] of Object.entries(LANGUAGES)) {
    if (langCode === 'zh-TW') continue; // 跳過原始語言
    
    try {
      await translateLocaleFile(sourceFile, langCode, langName);
    } catch (error) {
      console.error(`❌ Failed to translate ${langCode}:`, error);
      // 繼續翻譯其他語言
    }
  }
  
  console.log('\n🎉 All translations complete!');
}

// 執行
translateAll().catch(console.error);
```

### 步驟 3: 更新 package.json

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "npm run translate && astro build",
    "translate": "node scripts/translate-all.js",
    "translate:single": "node scripts/translate-single.js",
    "preview": "astro preview"
  }
}
```

### 步驟 4: 建立 Astro i18n 配置

**`astro.config.mjs`**

```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 動態讀取所有語言
const locales = [
  'zh-TW', // 預設
  'en', 'ja', 'ko', 'zh-CN', 'es', 'fr', 'de', 'it', 'pt', 'ru',
  'ar', 'hi', 'th', 'vi', 'id', 'tr', 'pl', 'nl', 'sv', 'da',
  // ... 其他 35+ 語言
];

export default defineConfig({
  site: 'https://smartsequence.tech',
  
  i18n: {
    defaultLocale: 'zh-TW',
    locales: locales,
    routing: {
      prefixDefaultLocale: false, // zh-TW 不加前綴
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
```

### 步驟 5: 建立翻譯工具

**`src/i18n/utils.ts`**

```typescript
import type { GetStaticPaths } from 'astro';

// 所有支援的語言
export const languages = {
  'zh-TW': '繁體中文',
  'en': 'English',
  'ja': '日本語',
  'ko': '한국어',
  // ... 其他語言
} as const;

export type Language = keyof typeof languages;
export const defaultLang: Language = 'zh-TW';

// 動態載入翻譯檔案
export async function getTranslations(lang: Language) {
  try {
    const translations = await import(`./locales/${lang}.json`);
    return translations.default;
  } catch {
    // 如果翻譯不存在，回退到預設語言
    const defaultTranslations = await import(`./locales/${defaultLang}.json`);
    return defaultTranslations.default;
  }
}

// 從 URL 取得語言
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in languages) {
    return lang as Language;
  }
  return defaultLang;
}

// 取得本地化路徑
export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

// 取得所有語言的靜態路徑（用於 getStaticPaths）
export function getStaticPathsForAllLanguages(): GetStaticPaths {
  return async () => {
    return Object.keys(languages).map((lang) => ({
      params: { lang },
    }));
  };
}
```

---

## 💡 最佳實踐建議

### 1. 翻譯快取策略

```javascript
// 建立 .translation-cache/ 資料夾
// 儲存已翻譯的內容，避免重複翻譯
// 更新內容時，只翻譯變更部分
```

### 2. 分批翻譯

```javascript
// 不要一次翻譯 55 種語言
// 先翻譯熱門 10-15 種
// 其他語言漸進式加入
```

### 3. 人工校對關鍵頁面

```javascript
// 首頁、定價頁等重要頁面
// 建議人工校對確保品質
```

### 4. 成本控制

```javascript
// 使用 GPT-3.5 而非 GPT-4（成本更低）
// 或使用 Google Translate API（更便宜）
// 僅關鍵內容使用 GPT-4
```

---

## 📊 成本優化建議

### 使用 Google Translate API（更便宜）

```javascript
import { Translate } from '@google-cloud/translate';

const translate = new Translate({
  projectId: 'your-project-id',
  keyFilename: 'path/to/key.json',
});

async function translateText(text, targetLang) {
  const [translation] = await translate.translate(text, targetLang);
  return translation;
}

// 成本：$20/1M characters（比 OpenAI 便宜很多）
```

### 使用 DeepL API（品質更好）

```javascript
import * as deepl from 'deepl-node';

const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

async function translateText(text, targetLang) {
  const result = await translator.translateText(text, 'zh', targetLang);
  return result.text;
}

// 成本：$25/1M characters（品質優秀）
```

---

## 🎯 推薦流程

1. **第一階段**：翻譯熱門 10-15 種語言
   - 使用建置時翻譯
   - 人工校對關鍵頁面
   - 成本：約 $3-5

2. **第二階段**：漸進式加入其他語言
   - 根據流量需求決定優先順序
   - 使用快取避免重複翻譯
   - 成本：每次新增約 $0.5-1

3. **維護階段**：
   - 內容更新時，僅翻譯變更部分
   - 使用快取機制
   - 成本：每次更新約 $0.1-0.5

---

## ✅ 總結

**推薦方案：建置時 AI 翻譯**

- 成本：一次性 $20-30（55 種語言）
- SEO：完美
- 速度：極快（靜態頁面）
- 維護：簡單（快取機制）

**實作優先順序：**
1. 先支援 10-15 種熱門語言
2. 建立快取機制
3. 漸進式加入其他語言
4. 關鍵頁面人工校對
