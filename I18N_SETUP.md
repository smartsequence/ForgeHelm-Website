# 多語言設定指南

## 📋 已完成項目

✅ Astro i18n 配置（支援 15 種熱門語言）  
✅ i18n 工具函式  
✅ 語言列表和翻譯檔案結構  
✅ 語言切換器元件  
✅ AI 自動翻譯腳本  

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

這會安裝 `openai` 套件（用於 AI 翻譯）。

### 2. 設定 OpenAI API Key

建立 `.env` 檔案（不要提交到 Git）：

```bash
OPENAI_API_KEY=sk-your-api-key-here
```

更新 `.gitignore` 確保 `.env` 不會被提交：

```
.env
.env.local
.translation-cache/
```

### 3. 執行翻譯

```bash
npm run translate
```

這會：
- 讀取 `src/i18n/locales/zh-TW.json`（繁體中文原始檔）
- 使用 OpenAI API 翻譯成 15 種語言
- 儲存翻譯結果到 `src/i18n/locales/{lang}.json`
- 建立快取檔案到 `.translation-cache/`（避免重複翻譯）

### 4. 建置網站

```bash
npm run build
```

這會生成所有語言版本的靜態頁面。

## 📁 檔案結構

```
src/
├─ i18n/
│  ├─ languages.ts          # 語言列表定義
│  ├─ utils.ts             # 翻譯工具函式
│  └─ locales/
│     ├─ zh-TW.json        # 繁體中文（原始）
│     ├─ en.json           # English（AI 翻譯）
│     ├─ ja.json           # 日本語（AI 翻譯）
│     └─ ...               # 其他語言
│
scripts/
└─ translate-all.js        # AI 翻譯腳本

.translation-cache/         # 翻譯快取（自動生成）
└─ {lang}.json             # 各語言快取
```

## 🌐 支援的語言（第一階段）

1. 🇹🇼 繁體中文 (zh-TW) - 預設語言
2. 🇺🇸 English (en)
3. 🇯🇵 日本語 (ja)
4. 🇰🇷 한국어 (ko)
5. 🇨🇳 简体中文 (zh-CN)
6. 🇪🇸 Español (es)
7. 🇫🇷 Français (fr)
8. 🇩🇪 Deutsch (de)
9. 🇮🇹 Italiano (it)
10. 🇵🇹 Português (pt)
11. 🇷🇺 Русский (ru)
12. 🇸🇦 العربية (ar)
13. 🇮🇳 हिन्दी (hi)
14. 🇹🇭 ไทย (th)
15. 🇻🇳 Tiếng Việt (vi)

## 💰 成本估算

**第一次翻譯（15 種語言）：**
- 假設：5 頁 × 2000 tokens × 15 語言 = 150K tokens
- 成本：約 $4.50（使用 GPT-4 Turbo）

**後續更新：**
- 僅翻譯變更部分
- 使用快取機制
- 成本：每次更新約 $0.5-1

## 🔧 使用方式

### 在頁面中使用翻譯

```astro
---
import Layout from '../layouts/Layout.astro';
import { getLangFromUrl, getTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const translations = await getTranslations(lang);
const t = (key: string) => {
  const keys = key.split('.');
  let value: any = translations;
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return key;
  }
  return value || key;
};
---

<Layout title={t('nav.home')} lang={lang}>
  <h1>{t('hero.title')}</h1>
  <p>{t('hero.tagline')}</p>
</Layout>
```

### 在元件中使用語言切換器

```astro
---
import LanguageSwitcher from '../components/LanguageSwitcher.astro';
import { getLangFromUrl } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
---

<header>
  <nav>
    <!-- 其他導航項目 -->
    <LanguageSwitcher currentLang={lang} currentPath={Astro.url.pathname} />
  </nav>
</header>
```

## 📝 更新翻譯內容

### 1. 更新繁體中文原始檔

編輯 `src/i18n/locales/zh-TW.json`：

```json
{
  "hero": {
    "title": "新的標題"
  }
}
```

### 2. 重新執行翻譯

```bash
npm run translate
```

腳本會：
- 檢查快取
- 只翻譯變更的部分
- 更新所有語言檔案

### 3. 人工校對（建議）

對於重要頁面（首頁、定價頁），建議人工校對翻譯結果。

## 🎯 最佳實踐

1. **先翻譯熱門語言**
   - 先完成 10-15 種熱門語言
   - 其他語言漸進式加入

2. **使用快取機制**
   - 翻譯結果會自動快取
   - 更新時只翻譯變更部分

3. **人工校對關鍵頁面**
   - 首頁、定價頁等重要頁面
   - 確保專業性和準確性

4. **定期更新**
   - 內容更新時重新翻譯
   - 保持所有語言版本同步

## ⚠️ 注意事項

1. **API Rate Limit**
   - OpenAI GPT-4 限制：3 requests/min
   - 腳本已加入 20 秒延遲
   - 翻譯 15 種語言需要約 30-40 分鐘

2. **成本控制**
   - 使用快取避免重複翻譯
   - 僅翻譯變更部分
   - 考慮使用 GPT-3.5（更便宜）

3. **翻譯品質**
   - AI 翻譯可能不夠完美
   - 重要頁面建議人工校對
   - 技術術語需要特別注意

## 🚀 下一步

1. ✅ 完成基礎架構
2. ⏳ 執行第一次翻譯
3. ⏳ 更新頁面使用翻譯
4. ⏳ 加入語言切換器到 Header
5. ⏳ 測試所有語言版本
6. ⏳ 部署多語言網站

## 📚 參考資源

- [Astro i18n 文檔](https://docs.astro.build/en/guides/internationalization/)
- [OpenAI API 文檔](https://platform.openai.com/docs/)
- [多語言 SEO 最佳實踐](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
