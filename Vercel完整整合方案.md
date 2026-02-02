# Vercel 完整整合方案（翻譯 API + RAG + AI 客服）【備選方案】

> **狀態說明**：目前範例文件主要以「Azure Static Web Apps + Astro i18n」為預設示範架構，  
> 但官網也可以選擇部署在 **Vercel**，成本級距與 Azure 免費額度同樣偏低。  
> 若日後決定採用 Vercel，實作時可參考本文件；若使用 Azure，則以 `DEPLOYMENT.md` 與 `I18N_SETUP.md` 為主。

**建立日期**: 2026-01-25  
**版本**: v1.0  
**狀態**: ✅ 全功能整合方案

---

## ✅ 您的問題

### 在 Vercel 上也可以用翻譯 API 和 RAG 和 AI 客服嗎？

**答案：完全可以！** ⭐

Vercel Serverless Functions 可以呼叫任何外部 API 和服務。

---

## 🏗️ 完整技術架構

```
┌─────────────────────────────────────────────────────────┐
│              Vercel 平台（All-in-One）                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  前端層（Astro）                                    │  │
│  │  • 靜態頁面（繁中/英文）                           │  │
│  │  • SSR 頁面（其他語言）                            │  │
│  │  • AI 客服 UI                                      │  │
│  └───────────────────────────────────────────────────┘  │
│                          ↕                               │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Serverless Functions（API 層）                    │  │
│  │                                                     │  │
│  │  /api/translate                                    │  │
│  │  ├─ Google Translate API 整合 ✅                   │  │
│  │  └─ 翻譯快取（PostgreSQL）                         │  │
│  │                                                     │  │
│  │  /api/chat                                         │  │
│  │  ├─ OpenAI GPT-4 ✅                                │  │
│  │  ├─ RAG 搜尋（Pinecone）✅                         │  │
│  │  └─ 多語言支援                                     │  │
│  │                                                     │  │
│  │  /api/embeddings                                   │  │
│  │  └─ OpenAI Embeddings ✅                           │  │
│  └───────────────────────────────────────────────────┘  │
│                          ↕                               │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Vercel Postgres                                   │  │
│  │  • contents（網站內容）                            │  │
│  │  • translation_cache（翻譯快取）                   │  │
│  │  • chat_history（對話歷史）                        │  │
│  └───────────────────────────────────────────────────┘  │
│                                                           │
└──────────────────┬────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────┐
│              外部服務（API 整合）                          │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Google Cloud Translation API ✅                         │
│  ├─ 支援 133 種語言                                      │
│  ├─ $20/1M 字元                                          │
│  └─ Vercel Functions 直接呼叫                            │
│                                                           │
│  OpenAI API ✅                                           │
│  ├─ GPT-4 Turbo（AI 客服）                              │
│  ├─ text-embedding-ada-002（RAG）                        │
│  └─ Vercel Functions 直接呼叫                            │
│                                                           │
│  Pinecone Vector Database ✅                             │
│  ├─ 儲存 content embeddings                              │
│  ├─ RAG 語義搜尋                                         │
│  ├─ 免費方案：1M vectors                                 │
│  └─ Vercel Functions 直接呼叫                            │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ 核心功能實作

### 1️⃣ 翻譯 API 整合

#### Google Translate API

```typescript
// src/pages/api/translate.ts
import type { APIRoute } from 'astro';
import { Translate } from '@google-cloud/translate/v2';
import prisma from '../../lib/prisma';

const translate = new Translate({
  key: process.env.GOOGLE_TRANSLATE_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
  const { text, targetLang, sourceLang = 'zh-TW' } = await request.json();

  try {
    // 1. 檢查快取
    const cacheKey = `${text.substring(0, 100)}_${targetLang}`;
    const cached = await prisma.translationCache.findFirst({
      where: {
        translatedText: {
          contains: text.substring(0, 50),
        },
        languageCode: targetLang,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (cached) {
      return new Response(
        JSON.stringify({
          translatedText: cached.translatedText,
          cached: true,
        }),
        { status: 200 }
      );
    }

    // 2. 呼叫 Google Translate API
    const [translation] = await translate.translate(text, {
      from: sourceLang,
      to: targetLang,
    });

    // 3. 儲存快取（30 天）
    await prisma.translationCache.create({
      data: {
        contentId: null, // 動態翻譯
        languageCode: targetLang,
        translatedText: translation,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        translationService: 'google',
      },
    });

    return new Response(
      JSON.stringify({
        translatedText: translation,
        cached: false,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Translation error:', error);
    return new Response(
      JSON.stringify({ error: 'Translation failed' }),
      { status: 500 }
    );
  }
};
```

---

### 2️⃣ RAG 系統整合

#### OpenAI Embeddings + Pinecone

```typescript
// src/lib/rag.ts
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.index('docengine-website');

/**
 * 建立 Embedding
 */
export async function createEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  
  return response.data[0].embedding;
}

/**
 * 儲存內容到 Pinecone
 */
export async function upsertContent(
  id: string,
  text: string,
  metadata: Record<string, any>
): Promise<void> {
  const embedding = await createEmbedding(text);
  
  await index.upsert([
    {
      id,
      values: embedding,
      metadata: {
        text,
        ...metadata,
      },
    },
  ]);
}

/**
 * RAG 搜尋相關內容
 */
export async function searchRelevantContent(
  query: string,
  topK: number = 5
): Promise<Array<{ text: string; score: number }>> {
  const queryEmbedding = await createEmbedding(query);
  
  const results = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  });

  return results.matches.map((match) => ({
    text: match.metadata?.text as string,
    score: match.score || 0,
  }));
}
```

---

### 3️⃣ AI 客服整合

```typescript
// src/pages/api/chat.ts
import type { APIRoute } from 'astro';
import OpenAI from 'openai';
import { searchRelevantContent } from '../../lib/rag';
import prisma from '../../lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
  const {
    message,
    language = 'zh-TW',
    sessionId,
  } = await request.json();

  try {
    // 1. 翻譯問題成英文（統一處理）
    const englishQuestion =
      language === 'en' ? message : await translateToEnglish(message, language);

    // 2. RAG 搜尋相關內容
    const relevantContent = await searchRelevantContent(englishQuestion);
    const context = relevantContent.map((c) => c.text).join('\n\n');

    // 3. 生成回答（英文）
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a helpful customer service AI for SmartSequence Tech Studio and DocEngine.

Use the following context from the website to answer questions accurately:

${context}

Guidelines:
- Be professional, friendly, and concise
- Answer in a helpful and informative tone
- If the context doesn't contain relevant information, say so politely
- Provide specific details when available
- Encourage users to try DocEngine's free trial when appropriate`,
        },
        {
          role: 'user',
          content: englishQuestion,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const englishAnswer = response.choices[0].message.content || '';

    // 4. 翻譯回答回使用者語言
    const answer =
      language === 'en'
        ? englishAnswer
        : await translateFromEnglish(englishAnswer, language);

    // 5. 儲存對話歷史
    await prisma.chatHistory.create({
      data: {
        sessionId,
        userLanguage: language,
        userMessage: message,
        aiResponse: answer,
      },
    });

    return new Response(
      JSON.stringify({
        answer,
        sessionId,
        language,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: 'Chat failed' }),
      { status: 500 }
    );
  }
};

async function translateToEnglish(
  text: string,
  sourceLang: string
): Promise<string> {
  // 呼叫 /api/translate
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      targetLang: 'en',
      sourceLang,
    }),
  });
  
  const data = await response.json();
  return data.translatedText;
}

async function translateFromEnglish(
  text: string,
  targetLang: string
): Promise<string> {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      targetLang,
      sourceLang: 'en',
    }),
  });
  
  const data = await response.json();
  return data.translatedText;
}
```

---

### 4️⃣ 前端 AI 客服 UI

```astro
---
// src/components/AIChatWidget.astro
---

<div id="ai-chat-widget" class="chat-widget">
  <button id="chat-toggle" class="chat-toggle">
    💬 AI 客服
  </button>
  
  <div id="chat-window" class="chat-window hidden">
    <div class="chat-header">
      <h3>DocEngine AI 客服</h3>
      <button id="chat-close">✕</button>
    </div>
    
    <div id="chat-messages" class="chat-messages">
      <div class="message bot">
        👋 您好！我是 DocEngine 的 AI 助理。<br>
        有什麼可以幫助您的嗎？
      </div>
    </div>
    
    <form id="chat-form" class="chat-input">
      <input
        type="text"
        id="chat-input"
        placeholder="輸入您的問題..."
        required
      />
      <button type="submit">送出</button>
    </form>
  </div>
</div>

<style>
  .chat-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }

  .chat-toggle {
    padding: 1rem 1.5rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 1rem;
  }

  .chat-window {
    position: absolute;
    bottom: 70px;
    right: 0;
    width: 380px;
    height: 500px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
  }

  .chat-window.hidden {
    display: none;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--primary);
    color: white;
    border-radius: 12px 12px 0 0;
  }

  .chat-messages {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
  }

  .message {
    margin-bottom: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    max-width: 80%;
  }

  .message.bot {
    background: var(--gray-100);
    margin-right: auto;
  }

  .message.user {
    background: var(--primary);
    color: white;
    margin-left: auto;
  }

  .chat-input {
    display: flex;
    padding: 1rem;
    border-top: 1px solid var(--gray-200);
  }

  .chat-input input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--gray-300);
    border-radius: 6px;
    margin-right: 0.5rem;
  }

  .chat-input button {
    padding: 0.5rem 1rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
</style>

<script>
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatForm = document.getElementById('chat-form') as HTMLFormElement;
  const chatInput = document.getElementById('chat-input') as HTMLInputElement;
  const chatMessages = document.getElementById('chat-messages');

  // 生成 session ID
  const sessionId = crypto.randomUUID();

  // 偵測語言
  const userLanguage = navigator.language.startsWith('zh') ? 'zh-TW' : 'en';

  chatToggle?.addEventListener('click', () => {
    chatWindow?.classList.toggle('hidden');
  });

  chatClose?.addEventListener('click', () => {
    chatWindow?.classList.add('hidden');
  });

  chatForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = chatInput.value.trim();
    if (!message) return;

    // 顯示使用者訊息
    addMessage(message, 'user');
    chatInput.value = '';

    // 顯示載入中
    const loadingId = addMessage('正在思考...', 'bot');

    try {
      // 呼叫 AI 客服 API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          language: userLanguage,
          sessionId,
        }),
      });

      const data = await response.json();

      // 移除載入中訊息
      document.getElementById(loadingId)?.remove();

      // 顯示 AI 回答
      addMessage(data.answer, 'bot');
    } catch (error) {
      console.error('Chat error:', error);
      document.getElementById(loadingId)?.remove();
      addMessage('抱歉，發生錯誤。請稍後再試。', 'bot');
    }
  });

  function addMessage(text: string, type: 'user' | 'bot'): string {
    const id = `msg-${Date.now()}`;
    const messageDiv = document.createElement('div');
    messageDiv.id = id;
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    
    chatMessages?.appendChild(messageDiv);
    chatMessages?.scrollTo(0, chatMessages.scrollHeight);
    
    return id;
  }
</script>
```

---

## 💰 完整成本分析

### 起步階段（1,000 訪客/月）

```
Vercel：
├─ Hosting: $0
├─ Serverless Functions: $0（免費額度內）
└─ Postgres: $0（免費 0.5GB）

翻譯 API（Google Translate）：
├─ 20% 訪客使用其他語言 = 200 人
├─ 每人 5 頁 × 2000 字元 = 10,000 字元
├─ 總計：2M 字元
├─ 快取命中率 80%
└─ 實際翻譯：400K 字元 = $8

AI 客服（OpenAI）：
├─ 100 次對話/月
├─ RAG 搜尋：100 × $0.001 = $0.10
├─ GPT-4 回答：100 × 2K tokens × $0.03/1K = $6
└─ 翻譯：100 × 500 字元 × 2 = 100K 字元 = $2

Pinecone Vector DB：
└─ 免費方案（1M vectors）= $0

總成本：約 $16/月 ✅
```

### 成長階段（10,000 訪客/月）

```
Vercel Pro：$20/月

Google Translate：
├─ 20M 字元
└─ 快取後：4M 字元 = $80

AI 客服：
├─ 500 次對話
└─ 成本：$40

總成本：約 $140/月 ✅
仍然非常合理！
```

---

## 🔧 環境變數設定

### Vercel Dashboard 設定

```bash
# 1. Vercel Postgres（自動設定）
POSTGRES_URL="..."
POSTGRES_PRISMA_URL="..."

# 2. 手動添加的 API Keys
GOOGLE_TRANSLATE_API_KEY="your-google-key"
OPENAI_API_KEY="sk-your-openai-key"
PINECONE_API_KEY="your-pinecone-key"
PINECONE_ENVIRONMENT="us-west1-gcp"
PINECONE_INDEX_NAME="docengine-website"

# 3. 其他配置
NODE_ENV="production"
```

---

## 🚀 部署流程

### 完整步驟

```bash
# 1. 安裝所有依賴
npm install @vercel/postgres
npm install @prisma/client
npm install @google-cloud/translate
npm install openai
npm install @pinecone-database/pinecone

# 2. 設定資料庫（Vercel Dashboard）
# Storage → Create Database → Postgres

# 3. 設定環境變數（Vercel Dashboard）
# Settings → Environment Variables

# 4. 建立資料庫遷移
npx prisma migrate deploy

# 5. 建立初始 embeddings
npm run build-embeddings  # 自訂腳本

# 6. 推送到 GitHub
git push

# 7. Vercel 自動部署 ✅
```

---

## ✅ 功能檢查清單

### 翻譯功能

- [ ] Google Translate API 金鑰已設定
- [ ] 翻譯 API endpoint 已建立
- [ ] 翻譯快取機制運作正常
- [ ] 支援 133 種語言
- [ ] 前端可以動態載入翻譯

### RAG 系統

- [ ] Pinecone 帳號已建立
- [ ] Vector index 已建立
- [ ] OpenAI Embeddings API 可用
- [ ] 內容已轉換成 embeddings
- [ ] RAG 搜尋功能正常

### AI 客服

- [ ] OpenAI API 金鑰已設定
- [ ] Chat API endpoint 已建立
- [ ] RAG 整合正常
- [ ] 多語言翻譯正常
- [ ] 對話歷史有儲存
- [ ] 前端 UI 已整合

---

## 🎯 測試方案

### 本地測試

```bash
# 1. 下載環境變數
vercel env pull .env.local

# 2. 啟動開發伺服器
npm run dev

# 3. 測試 API
# 翻譯 API
curl -X POST http://localhost:4321/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"你好","targetLang":"en"}'

# AI 客服
curl -X POST http://localhost:4321/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is DocEngine?","sessionId":"test"}'
```

---

## 💡 最佳實踐

### 1. 快取策略

```typescript
// 多層快取
1. 記憶體快取（Map/LRU）      → 最快
2. Postgres 快取（30 天）      → 快
3. API 呼叫                    → 慢

優先順序：記憶體 → DB → API
```

### 2. 錯誤處理

```typescript
try {
  // API 呼叫
} catch (error) {
  // 降級策略
  if (error.code === 'QUOTA_EXCEEDED') {
    // 使用備援 API
  } else {
    // 返回預設內容
  }
}
```

### 3. Rate Limiting

```typescript
// 防止濫用
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分鐘
  max: 100, // 最多 100 次請求
});
```

---

## 🎉 總結

### ✅ Vercel 可以用所有功能！

```
Vercel 平台完整支援：
✅ PostgreSQL 資料庫
✅ Google Translate API（翻譯）
✅ OpenAI API（AI 客服 + RAG）
✅ Pinecone（Vector Database）
✅ 所有 Serverless Functions

一個平台，全部功能！
```

### 📊 完整功能列表

| 功能 | 技術 | Vercel 支援 |
|------|------|------------|
| 靜態網站 | Astro SSG | ✅ |
| 動態翻譯 | Google Translate | ✅ |
| AI 客服 | OpenAI GPT-4 | ✅ |
| RAG 搜尋 | OpenAI + Pinecone | ✅ |
| 資料庫 | PostgreSQL | ✅ |
| 快取 | Postgres + Memory | ✅ |

### 💰 總成本

```
起步階段：$15-20/月
├─ Vercel: $0
├─ 翻譯: $8
├─ AI 客服: $8
└─ Pinecone: $0

成長階段：$140-160/月
├─ Vercel Pro: $20
├─ 翻譯: $80
├─ AI 客服: $40
└─ Pinecone: $0

結論：成本合理，功能完整！✅
```

---

**建立日期**: 2026-01-25  
**維護者**: 智序資訊工作室  
**狀態**: ✅ Vercel 完整整合方案
