/**
 * AI 自動翻譯腳本
 * 使用 OpenAI API 將繁體中文翻譯成多種語言
 * 
 * 使用方法：
 * 1. 設定系統環境變數：OPENAI_API_KEY=your-key
 * 2. 執行：npm run translate
 * 
 * 注意：與 DocEngine-SaaS 相同，直接從系統環境變數讀取，不需要 .env 檔案
 */

import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 直接從系統環境變數讀取（與 DocEngine-SaaS 相同的方式）
// Node.js 會自動讀取系統環境變數，不需要 dotenv
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('❌ 錯誤：找不到 OPENAI_API_KEY 環境變數');
  console.error('請設定系統環境變數 OPENAI_API_KEY');
  console.error('Windows: set OPENAI_API_KEY=sk-your-key-here');
  console.error('PowerShell: $env:OPENAI_API_KEY="sk-your-key-here"');
  console.error('Linux/Mac: export OPENAI_API_KEY=sk-your-key-here');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: apiKey,
});

// 支援的語言列表（第一階段：熱門 15 種）
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
          content: `You are a professional translator specializing in technical and business content. 
Translate the following Traditional Chinese (Taiwan) text to ${targetLangName} (${targetLang}).

IMPORTANT Guidelines:
- Maintain professional business tone
- Keep technical terms accurate
- Preserve marketing appeal
- Use culturally appropriate expressions for ${targetLangName} speaking regions
- Keep placeholders like {taxId}, {email} unchanged
- Preserve line breaks (\n) in the text`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.3, // 降低創意，提高準確性
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error(`❌ Error translating to ${targetLang}:`, error.message);
    throw error;
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
        console.log(`  ✓ [${targetLang}] ${key}: Using cache`);
      } else {
        console.log(`  → [${targetLang}] ${key}: Translating...`);
        try {
          const translated = await translateText(value, targetLang, targetLangName);
          result[key] = translated;
          cache[cacheKey] = translated;
          
          // 延遲避免 rate limit（OpenAI 限制：3 requests/min for GPT-4）
          await new Promise(resolve => setTimeout(resolve, 20000)); // 20 秒延遲
        } catch (error) {
          console.error(`  ✗ [${targetLang}] ${key}: Translation failed, using original`);
          result[key] = value; // 失敗時使用原文
        }
      }
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
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
  const cacheDir = path.join(__dirname, '..', '.translation-cache');
  const cacheFile = path.join(cacheDir, `${targetLang}.json`);
  let cache = {};
  
  try {
    await fs.mkdir(cacheDir, { recursive: true });
    const cacheContent = await fs.readFile(cacheFile, 'utf-8');
    cache = JSON.parse(cacheContent);
    console.log(`  📦 Using cache: ${Object.keys(cache).length} entries`);
  } catch {
    // 快取不存在，從頭開始
    console.log(`  📝 No cache found, starting fresh`);
  }
  
  // 翻譯
  const translatedJson = await translateObject(sourceJson, targetLang, targetLangName, cache);
  
  // 儲存翻譯結果
  const targetDir = path.join(__dirname, '..', 'src', 'i18n', 'locales');
  await fs.mkdir(targetDir, { recursive: true });
  const targetFile = path.join(targetDir, `${targetLang}.json`);
  await fs.writeFile(targetFile, JSON.stringify(translatedJson, null, 2), 'utf-8');
  
  // 儲存快取
  await fs.writeFile(cacheFile, JSON.stringify(cache, null, 2), 'utf-8');
  
  console.log(`  ✅ Saved to ${targetFile}`);
  console.log(`  💾 Cache updated`);
}

/**
 * 主函式：翻譯所有語言
 */
async function translateAll() {
  // 檢查 API Key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY environment variable is not set');
    console.error('   Please set it: export OPENAI_API_KEY=your-key');
    process.exit(1);
  }

  const sourceFile = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'zh-TW.json');
  
  // 檢查原始檔案是否存在
  try {
    await fs.access(sourceFile);
  } catch {
    console.error(`❌ Error: Source file not found: ${sourceFile}`);
    process.exit(1);
  }
  
  console.log('🚀 Starting translation for all languages...\n');
  console.log(`📄 Source: ${sourceFile}`);
  console.log(`🌐 Languages: ${Object.keys(LANGUAGES).length} languages\n`);
  
  // 依序翻譯所有語言
  const results = {
    success: [],
    failed: [],
  };
  
  for (const [langCode, langName] of Object.entries(LANGUAGES)) {
    try {
      await translateLocaleFile(sourceFile, langCode, langName);
      results.success.push(langCode);
    } catch (error) {
      console.error(`❌ Failed to translate ${langCode}:`, error.message);
      results.failed.push(langCode);
      // 繼續翻譯其他語言
    }
  }
  
  // 總結
  console.log('\n' + '='.repeat(50));
  console.log('📊 Translation Summary:');
  console.log(`  ✅ Success: ${results.success.length} languages`);
  console.log(`  ❌ Failed: ${results.failed.length} languages`);
  
  if (results.success.length > 0) {
    console.log(`\n  Successfully translated:`);
    results.success.forEach(lang => {
      console.log(`    - ${lang} (${LANGUAGES[lang]})`);
    });
  }
  
  if (results.failed.length > 0) {
    console.log(`\n  Failed to translate:`);
    results.failed.forEach(lang => {
      console.log(`    - ${lang} (${LANGUAGES[lang]})`);
    });
  }
  
  console.log('\n🎉 Translation process complete!');
  console.log('\n💡 Tips:');
  console.log('  - Check the generated files in src/i18n/locales/');
  console.log('  - Cache is saved in .translation-cache/');
  console.log('  - Re-run this script to update only changed translations');
}

// 執行
translateAll().catch((error) => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
