# 智序資訊工作室官網架構規劃

## 🌐 網站定位
**智序資訊工作室 (SmartSequence Tech Studio)**  
專注於 AI 智能文件生成解決方案的技術工作室

**主域名**: smartsequence.tech  
**產品線**: Doc Engine（首個旗艦產品）

---

## 📁 網站架構

```
smartsequence.tech
│
├─ 🏠 Home（首頁）
│  ├─ Hero Section
│  │  ├─ 痛點描述（舊系統文件缺失/過時）
│  │  └─ 價值主張（AI 自動生成，節省 80% 時間）
│  │
│  ├─ Doc Engine 流程展示
│  │  ├─ 3-4 步驟視覺化流程
│  │  └─ 互動式 Demo/GIF
│  │
│  ├─ 最新消息 + 信任建立
│  │  ├─ 最新產品更新
│  │  ├─ 統一編號顯示
│  │  └─ 發票/合法營業證明
│  │
│  └─ 4 大 CTA 區域
│     ├─ 📖 試閱範例報告
│     ├─ 💰 查看定價方案
│     ├─ 🤝 商務合作諮詢
│     └─ 📬 訂閱最新消息
│
├─ 🚀 Doc Engine（產品頁）
│  ├─ 產品定位
│  │  ├─ 一句話價值主張
│  │  ├─ 目標客戶（.NET 遺留系統維護團隊）
│  │  └─ 核心問題解決
│  │
│  ├─ 功能特色
│  │  ├─ 🤖 AI 智能分析（OpenAI/Azure OpenAI）
│  │  ├─ 📊 多語言支援（C#/VB.NET/ASPX）
│  │  ├─ 🗄️ 資料庫分析（Oracle 等）
│  │  ├─ 🌐 Agent 架構（企業防火牆友善）
│  │  ├─ 🚀 即時同步（SignalR）
│  │  └─ 📝 專業報告輸出（PDF/Word）
│  │
│  ├─ Demo 展示
│  │  ├─ 產品截圖輪播
│  │  ├─ 操作流程影片
│  │  └─ 互動式展示（預留）
│  │
│  ├─ 試用入口（預留）
│  │  ├─ 立即試用按鈕
│  │  └─ 引導至 app.docengine.com
│  │
│  └─ FAQ 專區
│     ├─ 適用範圍（支援哪些技術？）
│     ├─ 交付物（報告格式？內容？）
│     ├─ 發票開立（統編/載具）
│     └─ 金流方式（綠界/PayPal）
│
├─ 💰 Pricing（定價）★ 導航第二優先
│  ├─ 方案總覽
│  │  ├─ 免費試用（14 天，功能完整）
│  │  ├─ 單次購買（一次性專案）
│  │  ├─ 月付方案（適合持續維護）
│  │  └─ 年付方案（最受歡迎，優惠 20%）
│  │
│  ├─ 功能對比表
│  │  ├─ 分析檔案數量
│  │  ├─ AI 模型選擇
│  │  ├─ 報告匯出次數
│  │  ├─ 技術支援等級
│  │  └─ 「最受歡迎」標籤標示
│  │
│  ├─ 金流信任標章
│  │  ├─ 綠界金流 LOGO
│  │  ├─ PayPal LOGO
│  │  └─ 安全加密說明
│  │
│  └─ 強力 CTA
│     ├─ 立即購買（引導至付款）
│     └─ 先看試用報告（降低門檻）
│
├─ 📖 About（關於我們）
│  ├─ 工作室簡介
│  │  ├─ 成立宗旨
│  │  ├─ 商業登記資訊
│  │  ├─ 統一編號
│  │  └─ 營業項目
│  │
│  ├─ 創辦人故事
│  │  ├─ 技術背景（.NET 10+ 年經驗）
│  │  ├─ 創業動機（解決實際痛點）
│  │  ├─ 個人照片
│  │  └─ 願景與使命
│  │
│  ├─ 技術實力
│  │  ├─ 核心技術棧展示
│  │  ├─ 專案經驗
│  │  └─ 持續學習精神
│  │
│  └─ 社交連結
│     ├─ LinkedIn 個人檔案
│     ├─ YouTube 技術頻道（如有）
│     ├─ GitHub Organization
│     └─ Email 聯絡方式
│
├─ 📧 Contact（聯絡我們）
│  ├─ 諮詢表單
│  │  ├─ 姓名（必填）
│  │  ├─ Email（必填）
│  │  ├─ 公司/單位（選填）
│  │  ├─ 需求類型（下拉選單）
│  │  │  ├─ 產品試用
│  │  │  ├─ 商務合作
│  │  │  ├─ 技術諮詢
│  │  │  └─ 其他
│  │  ├─ 詳細需求（文字區域）
│  │  └─ 送出按鈕
│  │
│  ├─ 直接聯絡方式
│  │  ├─ Email: contact@smartsequence.tech
│  │  ├─ LINE 官方帳號（QR Code + ID）
│  │  └─ 預計回覆時間（1-2 工作天）
│  │
│  └─ 常見諮詢連結
│     ├─ 定價方案 FAQ
│     ├─ 金流方式說明
│     └─ 發票開立流程
│
└─ 🦶 Footer（全站頁尾）
   ├─ 左側：品牌資訊
   │  ├─ 工作室 Logo
   │  ├─ 一句話標語
   │  └─ 統一編號：12345678（顯示於每頁）
   │
   ├─ 中間：快速導航
   │  ├─ 產品：Doc Engine
   │  ├─ 定價方案
   │  ├─ 關於我們
   │  ├─ 聯絡我們
   │  └─ Sitemap
   │
   ├─ 右側：社交 & 法律
   │  ├─ LinkedIn
   │  ├─ YouTube
   │  ├─ GitHub
   │  ├─ 隱私政策
   │  └─ 服務條款
   │
   └─ 底部：版權聲明
      └─ © 2026 智序資訊工作室 SmartSequence Tech Studio. All rights reserved.
```

---

## 🎨 設計風格指引

### 色彩方案
```css
/* 主色調（科技感 + 專業） */
--primary: #2563eb;      /* 藍色 - 科技/信任 */
--secondary: #8b5cf6;    /* 紫色 - 創新/AI */
--accent: #10b981;       /* 綠色 - 成功/成長 */

/* 中性色 */
--gray-dark: #1f2937;    /* 深灰 - 文字 */
--gray-medium: #6b7280;  /* 中灰 - 次要文字 */
--gray-light: #f3f4f6;   /* 淺灰 - 背景 */

/* 語義色 */
--success: #10b981;      /* 成功 */
--warning: #f59e0b;      /* 警告 */
--error: #ef4444;        /* 錯誤 */
```

### 字型設計
- **中文**：Noto Sans TC（思源黑體）- Google Fonts
- **英文**：Inter - Google Fonts
- **等寬**：JetBrains Mono（程式碼展示）

### UI 元件風格
- **按鈕**：圓角（8px）、陰影、Hover 動畫
- **卡片**：白底、細邊框、輕微陰影
- **輸入框**：清晰邊框、Focus 狀態高亮
- **圖示**：Heroicons（與 Tailwind 完美配合）

---

## 📄 頁面優先級與時程

### Phase 1: 核心頁面（第 1 週）
- [x] 專案初始化
- [ ] 🏠 **Home** - 最重要，先完成
- [ ] 💰 **Pricing** - 第二優先
- [ ] 🚀 **Doc Engine** - 產品詳細頁

### Phase 2: 品牌頁面（第 2 週）
- [ ] 📖 **About** - 建立信任
- [ ] 📧 **Contact** - 諮詢入口
- [ ] 🦶 **Footer** - 全站完善

### Phase 3: 優化與整合（第 3 週）
- [ ] SEO 優化
- [ ] 效能優化
- [ ] 表單整合（使用 Web3Forms 或類似服務）
- [ ] Google Analytics 設定

---

## 🔗 域名與路由規劃

### 主站（smartsequence.tech）
```
/                    → Home
/doc-engine          → Doc Engine 產品頁
/pricing             → 定價方案
/about               → 關於我們
/contact             → 聯絡我們
/blog                → 部落格（未來）
/sitemap.xml         → 網站地圖
/robots.txt          → SEO 配置
```

### SaaS 平台（分離域名）
```
app.docengine.com    → DocEngine SaaS 登入/使用
api.docengine.com    → API 端點（SignalR Hub）
```

---

## 📊 CTA（Call To Action）策略

### 首頁 4 大 CTA
1. **試閱範例報告** 👉 `/doc-engine#demo`（低門檻）
2. **查看定價方案** 👉 `/pricing`（商業意圖）
3. **商務合作諮詢** 👉 `/contact?type=partnership`（企業客戶）
4. **訂閱最新消息** 👉 Email 訂閱表單（建立名單）

### 定價頁 CTA
1. **立即購買** 👉 綠界/PayPal 付款（直接轉換）
2. **先看試用報告** 👉 降低決策門檻（間接轉換）

### 產品頁 CTA
1. **免費試用 14 天** 👉 `app.docengine.com/trial`
2. **觀看 Demo 影片** 👉 YouTube/內嵌影片
3. **聯絡業務** 👉 `/contact?type=sales`

---

## 📦 必要整合服務

### 表單服務
- **推薦**: Web3Forms（免費、無後端、Email 通知）
- 備選: Formspree, Netlify Forms

### 金流展示
- **綠界金流**: 台灣主流，顯示 LOGO 建立信任
- **PayPal**: 國際客戶備選

### 分析工具
- **Google Analytics 4**: 流量分析
- **Google Search Console**: SEO 監控
- **Microsoft Clarity**: 使用者行為（免費 Heatmap）

### Email 服務（訂閱功能）
- **Mailchimp**: 免費 2000 訂閱者
- 或 **ConvertKit**: 更專業的 Email 行銷

---

## 🎯 SEO 關鍵字策略

### 目標關鍵字（台灣市場）
- 文件自動生成
- 程式碼文件工具
- .NET 系統文件
- AI 自動化文件
- 遺留系統維護
- 舊系統文件重建

### 頁面 SEO
- **Title**: 智序資訊工作室 | AI 智能文件生成解決方案
- **Description**: 專業的 .NET 系統文件自動生成服務，節省 80% 文件撰寫時間，支援 C#/VB.NET/ASPX，提供完整商業登記與發票服務
- **Keywords**: 智序資訊, DocEngine, AI文件生成, .NET文件, 程式碼分析

---

## 💡 信任建立元素

### 必須顯示（建立合法性）
- ✅ 統一編號（每頁 Footer）
- ✅ 商業登記資訊（About 頁）
- ✅ 發票開立說明（Pricing/FAQ）
- ✅ 金流安全標章（綠界/PayPal LOGO）
- ✅ 隱私政策（法律合規）
- ✅ 服務條款（保障雙方）

### 加分元素
- ✅ 創辦人真實照片與故事
- ✅ LinkedIn 專業檔案連結
- ✅ 技術部落格/文章（展示專業）
- ✅ GitHub 開源貢獻（可選）
- ✅ 客戶案例/評價（累積後）

---

## 📱 響應式設計

### 斷點（Tailwind 預設）
```
sm:  640px  → 手機橫向
md:  768px  → 平板
lg:  1024px → 筆電
xl:  1280px → 桌機
2xl: 1536px → 大螢幕
```

### 優先支援
1. **Desktop** (1920x1080) - 主要目標客戶
2. **Laptop** (1366x768) - 商務筆電
3. **Mobile** (375x667) - iPhone SE/8
4. **Tablet** (768x1024) - iPad

---

## 🚀 效能目標

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Lighthouse 分數
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

---

## 📝 內容撰寫原則

### 語調（Tone of Voice）
- **專業但友善**: 不過度技術性，易懂
- **解決方案導向**: 強調價值，非功能列表
- **可信賴**: 事實為基礎，不誇大
- **行動導向**: 清晰的 CTA，引導下一步

### 文案長度
- **Hero 標題**: 10-15 字
- **Hero 副標題**: 20-30 字
- **功能描述**: 50-100 字/功能
- **FAQ 回答**: 100-200 字/問題

---

**建立日期**: 2026-01-25  
**維護者**: 智序資訊工作室  
**狀態**: 📋 架構規劃完成，待逐頁實作

**下一步**: 等待各頁面內容素材，開始實作開發
