# 智序資訊工作室官網架構規劃

**專案名稱**: 智序資訊工作室官方網站  
**域名**: smartsequence.tech  
**建立日期**: 2026-01-25  
**最後更新**: 2026-01-25  

---

## 🌐 網站定位

**智序資訊工作室 (SmartSequence Tech Studio)**  
系統交付風險分析與評估專家

**主域名**: smartsequence.tech  
**產品線**: Doc Engine（風險評估報告服務）

---

## 📁 網站架構

```
智序資訊工作室 (smartsequence.tech)
│
├─ 🏠 Home (/) ★ 80% 流量入口
│  ├─ Hero Section
│  │  ├─ 一句痛點（系統交付風險難以掌握）
│  │  └─ 雙 CTA：「立即試閱」/「開始試用」
│  │
│  ├─ Doc Engine 4 步驟流程
│  │  ├─ 步驟 1：填寫問卷
│  │  ├─ 步驟 2：上傳文件
│  │  ├─ 步驟 3：AI 分析
│  │  └─ 步驟 4：產出報告
│  │  （圖文對照，視覺化呈現）
│  │
│  ├─ CTA 卡片區（4 張卡片）
│  │  ├─ 📖 試閱範例報告
│  │  ├─ 💰 查看定價方案
│  │  ├─ ⚙️ 功能介紹
│  │  └─ ❓ 常見問題
│  │
│  ├─ 信任標示區
│  │  ├─ ✅ 可開立合法發票
│  │  ├─ 🔒 支援綠界與 PayPal
│  │  └─ 🛡️ 資料隱私保護
│  │
│  └─ 引導導流
│     ├─ 「深入了解功能」→ /features
│     └─ 「查看定價方案」→ /pricing
│
├─ ⚙️ Features (/features) ★ 導航第 2
│  ├─ Doc Engine 定位
│  │  ├─ 一句話價值主張
│  │  ├─ 適用對象（.NET / 舊系統維護團隊）
│  │  └─ 解決的核心問題
│  │
│  ├─ 核心功能 6 大模組
│  │  ├─ 🤖 AI 智慧分析（OpenAI 驅動）
│  │  ├─ 🌐 多語言支援（C# / VB.NET / ASPX）
│  │  ├─ 🗄️ 資料庫分析（Oracle / SQL Server）
│  │  ├─ 🔌 Agent 架構（企業防火牆友善）
│  │  ├─ ⚡ 即時同步（SignalR 雙向通訊）
│  │  └─ 📄 專業報告（PDF / Word 匯出）
│  │
│  ├─ 實際畫面 Demo
│  │  ├─ 產品截圖（主要功能畫面）
│  │  ├─ 操作流程影片（2-3 分鐘）
│  │  └─ 報告範例展示
│  │
│  └─ CTA：前往試用
│     └─ 「開始使用 Doc Engine」→ app.docengine.com
│
├─ 💰 Pricing (/pricing) ★ 導航第 1 優先
│  ├─ 4 種方案
│  │  ├─ 免費試用（填問卷 + 預覽報告）
│  │  ├─ 單次購買（NT$ 990 / 完整報告）
│  │  ├─ 月付方案（NT$ 2,490 / 月）⭐ 最受歡迎
│  │  └─ 年付方案（NT$ 24,900 / 年，省 17%）
│  │
│  ├─ 功能對照表
│  │  ├─ 報告數量
│  │  ├─ 技術支援
│  │  ├─ 樣板調整
│  │  ├─ PDF 下載
│  │  └─ 發票開立
│  │
│  ├─ 金流信任標章
│  │  ├─ 綠界金流 LOGO
│  │  ├─ PayPal LOGO
│  │  └─ SSL 安全加密
│  │
│  ├─ FAQ 專區
│  │  ├─ 付款方式說明
│  │  ├─ 發票開立流程
│  │  ├─ 客製化需求
│  │  └─ 退款政策
│  │
│  └─ CTA 區
│     ├─ 「立即購買」→ 付款頁面
│     └─ 「看範例報告」→ Demo 下載
│
├─ 👤 About (/about)
│  ├─ 工作室介紹
│  │  ├─ 成立宗旨
│  │  ├─ 統一編號（商業登記）
│  │  └─ 營業項目
│  │
│  ├─ 創辦人理念
│  │  ├─ 技術背景（.NET 10+ 年經驗）
│  │  ├─ 為何要做這件事（解決真實痛點）
│  │  ├─ 創辦人照片
│  │  └─ 願景與使命
│  │
│  └─ 社群連結
│     ├─ LinkedIn 專業檔案
│     ├─ YouTube 技術頻道
│     └─ Notion 公開筆記
│
├─ 📩 Contact (/contact)
│  ├─ 簡單表單
│  │  ├─ 姓名（必填）
│  │  ├─ Email（必填）
│  │  └─ 詢問內容（必填）
│  │
│  ├─ 聯絡方式
│  │  ├─ Email: support@smartsequence.tech
│  │  ├─ LINE 官方帳號（ID + QR Code）
│  │  └─ 地址（如有實體辦公室）
│  │
│  └─ 快速連結
│     ├─ 定價方案
│     ├─ 範例報告
│     ├─ 立即購買
│     └─ 常見問題
│
├─ 🚀 Get Started (/get-started) ★ 統一 CTA 目標
│  ├─ 用途說明
│  │  ├─ 所有 CTA 按鈕的統一目標頁面
│  │  ├─ 未來接 SaaS app 最方便
│  │  └─ 可自動跳轉或顯示體驗頁
│  │
│  ├─ 功能選項
│  │  ├─ 方案 A：直接跳轉 app.docengine.com
│  │  ├─ 方案 B：選擇方案後跳轉（帶參數）
│  │  └─ 方案 C：引導頁（試用 vs 購買）
│  │
│  └─ 實作建議
│     ├─ 初期：簡單的引導頁面
│     └─ 未來：智慧路由（根據來源導流）
│
├─ 📜 Terms (/terms) ★ 金流必要
│  ├─ 使用條款
│  │  ├─ 服務說明
│  │  ├─ 使用者責任
│  │  ├─ 智慧財產權
│  │  ├─ 付款與退款政策
│  │  └─ 服務變更與終止
│  │
│  └─ 重要性
│     ├─ PayPal 審核可能檢查
│     ├─ 綠界金流要求
│     └─ 法律合規必要文件
│
├─ 🔒 Privacy (/privacy) ★ 金流必要
│  ├─ 隱私權政策
│  │  ├─ 資料收集範圍
│  │  ├─ 資料使用方式
│  │  ├─ 資料保護措施
│  │  ├─ Cookie 使用說明
│  │  └─ 使用者權利
│  │
│  └─ 重要性
│     ├─ GDPR / PDPA 合規
│     ├─ 金流服務審核要求
│     └─ 建立使用者信任
│
└─ 🦶 Footer（全站共用）
   ├─ Logo + 工作室名稱
   │  └─ 統一編號：XXXXXXXX
   │
   ├─ 快速導航
   │  ├─ Home
   │  ├─ Features
   │  ├─ Pricing
   │  ├─ About
   │  └─ Contact
   │
   ├─ 社群連結
   │  ├─ LinkedIn
   │  ├─ YouTube
   │  └─ GitHub
   │
   ├─ 法律文件
   │  ├─ 使用條款
   │  └─ 隱私權政策
   │
   └─ 版權聲明
      └─ © 2026 智序資訊工作室. All rights reserved.
```

---

## 🎨 設計風格指引

### 色彩方案

```css
/* 主色調（專業顧問風格） */
--primary: #1e40af;      /* 深藍色 - 信任/專業 */
--secondary: #7c3aed;    /* 紫色 - 科技/創新 */
--accent: #059669;       /* 綠色 - 成功/安全 */

/* 中性色 */
--gray-dark: #1f2937;    /* 深灰 - 主要文字 */
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

- **按鈕**：圓角（8px）、輕微陰影、Hover 動畫
- **卡片**：白底、1px 邊框、hover 時提升
- **輸入框**：清晰邊框、Focus 高亮
- **圖示**：Heroicons（與 Tailwind 完美配合）

---

## 🔗 路由規劃

### 主站路由（smartsequence.tech）

```
/                    → Home（首頁）
/features            → Features（功能介紹）
/pricing             → Pricing（定價方案）
/about               → About（關於我們）
/contact             → Contact（聯絡我們）
/get-started         → Get Started（統一 CTA 目標）★ 重要
/terms               → Terms of Service（使用條款）★ 金流必要
/privacy             → Privacy Policy（隱私權政策）★ 金流必要
/sitemap.xml         → 網站地圖
/robots.txt          → SEO 配置
```

### SaaS 平台（分離域名）

```
app.docengine.com    → DocEngine SaaS 登入/使用
api.docengine.com    → API 端點（SignalR Hub）
```

---

## 📊 導航優先順序

### Header 導航順序（由左至右）

```
Logo | Pricing | Features | About | Contact | [開始試用]
     ★第1優先  ★第2優先
```

### 設計理由

1. **Pricing 第一優先**：直接帶來轉換
2. **Features 第二優先**：說服潛在客戶
3. **About / Contact**：建立信任
4. **[開始試用] 按鈕**：主要 CTA，視覺突出

---

## 🎯 CTA（Call To Action）策略

### 首頁 CTA

1. **Hero 主 CTA**：「立即試閱」（低門檻）
2. **Hero 次 CTA**：「開始試用」（高意願）
3. **卡片區 CTA**：
   - 試閱範例報告
   - 查看定價方案
   - 功能介紹
   - 常見問題

### Pricing 頁 CTA

1. **立即購買**（每個方案下方）
2. **看範例報告**（降低決策門檻）
3. **聯絡我們**（企業客製化）

### Features 頁 CTA

1. **開始使用 Doc Engine** → app.docengine.com
2. **查看定價** → /pricing
3. **下載範例報告**

---

## 📄 頁面優先級與時程

### Phase 1: 核心頁面（第 1 週）

- [x] 專案初始化
- [ ] 🏠 **Home** - 80% 流量入口，最優先
- [ ] 💰 **Pricing** - 導航第 1 優先
- [ ] ⚙️ **Features** - 導航第 2 優先

### Phase 2: 品牌與法律頁面（第 2 週）

- [ ] 👤 **About** - 建立信任
- [ ] 📩 **Contact** - 諮詢入口
- [ ] 🚀 **Get Started** - 統一 CTA 目標（重要）
- [ ] 📜 **Terms** - 使用條款（金流必要）
- [ ] 🔒 **Privacy** - 隱私權政策（金流必要）
- [ ] 🦶 **Footer** - 全站完善

### Phase 3: 優化與整合（第 3 週）

- [ ] SEO 優化（Meta tags, Sitemap）
- [ ] 效能優化（圖片壓縮, Lazy loading）
- [ ] 表單整合（Web3Forms）
- [ ] Google Analytics 設定
- [ ] 金流整合測試（綠界 + PayPal）

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

---

## 🎯 SEO 關鍵字策略

### 目標關鍵字（台灣市場）

- 系統交付風險分析
- 風險評估報告
- Doc Engine
- 系統文件產出
- .NET 系統分析
- 舊系統風險評估

### 頁面 SEO

- **Title**: 智序資訊工作室 | 系統交付風險分析與評估專家
- **Description**: 專業的系統交付風險評估服務，透過 Doc Engine 產生風險分析報告，協助團隊識別潛在風險、促進系統交接、評估改寫可行性。符合政府採購法規，可開立合法發票。
- **Keywords**: 智序資訊, Doc Engine, 風險評估, 系統分析, 交付風險

---

## 💡 信任建立元素

### 必須顯示（建立合法性）

- ✅ 統一編號（每頁 Footer）
- ✅ 商業登記資訊（About 頁）
- ✅ 發票開立說明（Pricing FAQ）
- ✅ 金流安全標章（綠界/PayPal LOGO）
- ✅ 隱私政策（法律合規）
- ✅ 服務條款（保障雙方）

### 加分元素

- ✅ 創辦人真實照片與故事
- ✅ LinkedIn 專業檔案連結
- ✅ 技術部落格/文章（展示專業）
- ✅ GitHub 專案（開源貢獻）
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

- **專業正式**: 適合公家機關與企業採購
- **解決方案導向**: 強調價值，非功能列表
- **可信賴**: 事實為基礎，不誇大
- **行動導向**: 清晰的 CTA，引導下一步

### 文案長度

- **Hero 標題**: 10-15 字
- **Hero 副標題**: 20-30 字
- **功能描述**: 50-100 字/功能
- **FAQ 回答**: 100-200 字/問題

---

---

## 🎯 特殊頁面說明

### `/get-started` - 統一 CTA 目標頁 ⭐ 重要

#### 為什麼需要？

```
問題：網站上有很多 CTA 按鈕，每個都指向不同地方
- 「立即試用」→ ?
- 「開始使用」→ ?
- 「免費體驗」→ ?

解決：統一指向 /get-started
好處：
✅ 未來修改目標只需改一個地方
✅ 可以做智慧路由（A/B 測試）
✅ 追蹤轉換更容易
✅ 接 SaaS app 時最方便
```

#### 實作方案

**方案 A：直接跳轉（最簡單）**

```astro
---
// src/pages/get-started.astro
export const prerender = false;

// 直接跳轉到 SaaS app
return Astro.redirect('https://app.docengine.com', 302);
---
```

**方案 B：引導頁（推薦）**

```astro
---
// src/pages/get-started.astro
---

<Layout title="開始使用 Doc Engine">
  <div class="container">
    <h1>選擇您的方案</h1>
    
    <div class="options">
      <!-- 免費試用 -->
      <Card>
        <h2>免費試用</h2>
        <p>填寫問卷，預覽部分報告</p>
        <a href="https://app.docengine.com/trial">開始試用</a>
      </Card>
      
      <!-- 直接購買 -->
      <Card>
        <h2>立即購買</h2>
        <p>查看定價方案，直接購買</p>
        <a href="/pricing">查看方案</a>
      </Card>
      
      <!-- 聯絡諮詢 -->
      <Card>
        <h2>企業方案</h2>
        <p>客製化需求，專人服務</p>
        <a href="/contact">聯絡我們</a>
      </Card>
    </div>
  </div>
</Layout>
```

**方案 C：智慧路由（進階）**

```typescript
// src/pages/get-started.ts
export async function GET({ request, redirect }) {
  const url = new URL(request.url);
  const source = url.searchParams.get('source');
  const plan = url.searchParams.get('plan');
  
  // 根據來源導流
  if (source === 'pricing' && plan) {
    return redirect(`https://app.docengine.com/checkout?plan=${plan}`);
  }
  
  if (source === 'hero') {
    return redirect('https://app.docengine.com/trial');
  }
  
  // 預設：顯示引導頁
  return redirect('/get-started/guide');
}
```

---

### `/terms` 和 `/privacy` - 法律合規頁 ⭐ 金流必要

#### 為什麼必要？

```
金流服務審核要求：
✅ PayPal - 可能檢查網站是否有 Terms & Privacy
✅ 綠界 - 商務審核時會要求合法文件
✅ Stripe - 必須有明確的條款與隱私政策

法律合規：
✅ 個資法（台灣）
✅ GDPR（歐盟，如果有國際客戶）
✅ 消費者保護法

建立信任：
✅ 讓使用者知道權利與義務
✅ 專業形象
```

#### 最小可行內容（MVP）

**`/terms` 使用條款基本結構**

```markdown
# 服務條款

**最後更新日期**: 2026-01-25

## 1. 服務說明
智序資訊工作室提供 Doc Engine 系統風險評估報告服務...

## 2. 使用者帳號與責任
- 使用者應提供正確資訊
- 帳號安全由使用者自行負責
- 禁止濫用服務

## 3. 付款與退款
- 接受綠界與 PayPal 付款
- 退款政策：7 天鑑賞期（依據消保法）
- 發票開立方式

## 4. 智慧財產權
- 報告內容屬使用者所有
- 平台軟體屬智序資訊工作室所有

## 5. 服務變更與終止
- 保留修改服務的權利
- 重大變更將提前通知

## 6. 責任限制
- 服務以「現狀」提供
- 不保證絕對無錯誤

## 7. 準據法與管轄
- 適用中華民國法律
- 台灣台北地方法院為第一審管轄法院

---

**聯絡資訊**
Email: support@smartsequence.tech
統一編號: XXXXXXXX
```

**`/privacy` 隱私權政策基本結構**

```markdown
# 隱私權政策

**最後更新日期**: 2026-01-25

## 1. 資料收集範圍
我們收集以下資料：
- 基本資料：姓名、Email
- 付款資訊：由綠界/PayPal 處理，我們不儲存信用卡資料
- 使用資料：登入紀錄、使用時間

## 2. 資料使用方式
- 提供服務
- 帳務處理
- 客戶支援
- 服務改進

## 3. 資料保護措施
- SSL/TLS 加密傳輸
- 資料庫加密儲存
- 定期安全性檢查
- 僅授權人員可存取

## 4. Cookie 使用
- 必要 Cookie：維持登入狀態
- 分析 Cookie：Google Analytics（可選退出）

## 5. 第三方服務
- Google Analytics：流量分析
- 綠界金流：付款處理
- PayPal：國際付款

## 6. 使用者權利
依據個資法，您有權：
- 查詢、閱覽您的個人資料
- 請求更正或補充
- 請求停止利用或刪除

## 7. 政策變更
如有重大變更，將於網站公告並 Email 通知

---

**聯絡資訊**
Email: privacy@smartsequence.tech
統一編號: XXXXXXXX
```

---

#### 快速建立策略

**初期（Phase 1）**

```bash
# 建立基本頁面（簡單版本）
src/pages/terms.astro     # 基本使用條款
src/pages/privacy.astro   # 基本隱私政策

目的：
✅ 讓金流審核通過
✅ 符合法律基本要求
✅ 快速上線
```

**未來優化（Phase 3）**

```bash
# 完善法律文件
- 請法律顧問審閱
- 加入更詳細條款
- 多語言版本
- 版本管理（顯示更新日期）
```

---

## 📋 CTA 按鈕統一策略

### 所有 CTA 都指向 `/get-started`

```astro
<!-- 首頁 Hero -->
<a href="/get-started?source=hero" class="btn-primary">
  立即試閱
</a>

<!-- 定價頁 -->
<a href="/get-started?source=pricing&plan=monthly" class="btn-primary">
  立即購買
</a>

<!-- Features 頁 -->
<a href="/get-started?source=features" class="btn-primary">
  開始使用
</a>

<!-- Header 導航 -->
<a href="/get-started" class="btn-cta">
  開始試用
</a>
```

### 好處

```
1. 集中管理
   - 修改目標只需改 /get-started 頁面
   - 不用到處找 CTA 按鈕

2. 追蹤方便
   - source 參數知道流量來源
   - plan 參數知道使用者意圖
   - Google Analytics 容易分析

3. 彈性路由
   - 可以做 A/B 測試
   - 可以根據時段導向不同頁面
   - 可以加入問卷或引導流程

4. 未來擴充
   - SaaS app 上線後，只需改 redirect 目標
   - 可以加入會員登入判斷
   - 可以串接 CRM 系統
```

---

**建立日期**: 2026-01-25  
**最後更新**: 2026-01-25  
**維護者**: 智序資訊工作室  
**狀態**: ✅ 架構規劃完成，包含特殊頁面說明

**下一步**: 開始實作首頁（Home）
