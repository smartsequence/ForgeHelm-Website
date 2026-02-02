# 部署方案建議比較（已歸檔）

> **狀態：已過時**：本文件為 2026-01-25 的歷史方案比較記錄。  
> 官網目前正式採用 **Azure Static Web Apps** 部署，請以 `DEPLOYMENT.md` 為準，本文件僅保留做決策背景參考。

## 建立日期
2026-01-25

## 🎯 結論：推薦使用 Vercel（官網）+ Azure（SaaS）

### 推薦架構

```
智序資訊工作室完整架構
│
├── 官網 (smartsequence.tech)
│   ├── 平台：Vercel ⭐ 推薦
│   ├── 框架：Astro
│   ├── 成本：$0/月
│   └── 部署：連接 GitHub，一鍵部署
│
├── DocEngine SaaS (app.docengine.com)
│   ├── 平台：Azure App Service
│   ├── 框架：ASP.NET Core
│   ├── 成本：$13+/月
│   └── 資料庫：PostgreSQL
│
└── DocEngine API (api.docengine.com)
    ├── 平台：Azure App Service
    ├── 框架：ASP.NET Core + SignalR
    └── 成本：包含在 SaaS 中
```

## 📊 詳細比較

### 方案 1：全部 Azure（原始計畫）

**優點：**
- ✅ 統一平台管理
- ✅ 相同的監控和日誌系統
- ✅ 企業級可靠性

**缺點：**
- ⚠️ 配置較複雜（需要設定 Azure Portal）
- ⚠️ 部署速度較慢
- ⚠️ 與 Azure 服務綁定

**適用場景：**
- 大型企業
- 需要統一管理所有服務
- 已有 Azure 技術團隊

### 方案 2：Vercel（官網）+ Azure（SaaS）⭐ 推薦

**優點：**
- ✅ **極簡部署**：連接 GitHub，自動完成
- ✅ **速度極快**：Vercel 對 Astro 優化完美
- ✅ **完全免費**：官網流量不會超過免費額度
- ✅ **開發體驗好**：即時預覽、自動優化
- ✅ **分離關注點**：官網（展示）和 SaaS（應用）分開

**缺點：**
- ⚠️ 需要管理兩個平台（但都很簡單）

**適用場景：**
- 🎯 **中小型團隊/個人開發者**（您的情況）
- 🎯 需要快速上線
- 🎯 預算有限
- 🎯 重視開發效率

### 方案 3：Netlify（官網）+ Azure（SaaS）

**優點：**
- ✅ 簡單部署
- ✅ 功能完整（表單、Functions）
- ✅ 免費額度大

**缺點：**
- ⚠️ 速度稍慢於 Vercel

**適用場景：**
- 需要內建表單處理
- 需要 Serverless Functions

## 🚀 推薦方案：Vercel

### 為什麼選擇 Vercel？

1. **一鍵部署**
   - 連接 GitHub repository
   - 自動檢測 Astro
   - 30 秒完成部署

2. **完美的 Astro 支援**
   - Vercel 團隊與 Astro 緊密合作
   - 零配置，開箱即用
   - 自動圖片優化

3. **極致效能**
   - 全球 Edge Network
   - 自動 CDN
   - 瞬間部署（< 1 分鐘）

4. **開發者體驗**
   - PR 自動預覽
   - 即時日誌
   - 視覺化部署狀態

5. **免費額度充足**
   - 無限網站
   - 100 GB 頻寬/月
   - 100 次建置/天
   - 足夠個人和小型團隊使用

## 📋 部署步驟對比

### Azure Static Web Apps

```bash
# 步驟較多
1. 登入 Azure Portal
2. 建立 Static Web App
3. 配置 GitHub 連接
4. 設定建置配置
5. 等待首次部署（5-10 分鐘）
6. 配置自訂域名
7. 設定 DNS
```

### Vercel（推薦）

```bash
# 超級簡單
1. 前往 vercel.com
2. 連接 GitHub
3. 選擇 repository
4. 點擊 Deploy（自動完成）
5. 配置自訂域名（內建 DNS）
```

## 💰 成本對比

### 免費階段（起步）

| 項目 | Azure | Vercel | Netlify |
|------|-------|--------|---------|
| 官網託管 | $0 | $0 | $0 |
| 頻寬 | 100 GB | 100 GB | 100 GB |
| 建置次數 | 無限 | 無限 | 300/月 |
| **總成本** | **$0** | **$0** | **$0** |

### 成長階段（流量增加）

如果官網每月流量超過 100 GB：

| 項目 | Azure | Vercel | Netlify |
|------|-------|--------|---------|
| 超額頻寬 | $0.15/GB | $0.20/GB | $0.20/GB |
| 200 GB/月成本 | $15 | $20 | $20 |

**實際情況**：一般官網很難超過 100 GB/月
- 假設每頁 2 MB
- 100 GB = 50,000 頁面瀏覽量
- 對於新創團隊，免費額度足夠使用 1-2 年

## 🎯 最終建議

### 立即行動：改用 Vercel

**原因：**
1. ✅ 您是個人/小型團隊
2. ✅ 需要快速上線
3. ✅ 重視開發效率
4. ✅ 預算考量（完全免費）
5. ✅ Astro 官方推薦

**不影響：**
- DocEngine SaaS 仍在 Azure（保持不變）
- DocEngine Agent 仍在客戶端（保持不變）
- 只有官網改用 Vercel

### 架構調整

```
原規劃：
├── www.docengine.com → Azure Static Web Apps ❌
├── app.docengine.com → Azure App Service ✅
└── api.docengine.com → Azure App Service ✅

新建議：
├── smartsequence.tech → Vercel ⭐ 官網
├── app.docengine.com → Azure App Service ✅ SaaS
└── api.docengine.com → Azure App Service ✅ API
```

## 📦 遷移步驟

### 從 Azure 方案改為 Vercel

1. **移除 Azure 特定配置**
   ```bash
   # 刪除或重命名
   rm .github/workflows/azure-static-web-apps.yml
   rm staticwebapp.config.json
   ```

2. **前往 Vercel 部署**
   - 網址：https://vercel.com
   - 連接 GitHub
   - Import `DocEngine-Website`
   - 一鍵部署

3. **配置自訂域名**
   - 在 Vercel 添加：smartsequence.tech
   - 設定 DNS（Vercel 提供簡單指引）

## 🔄 如果之後想改回 Azure

沒問題！檔案都還在，隨時可以：
1. 重新啟用 `.github/workflows/azure-static-web-apps.yml`
2. 建立 Azure Static Web App
3. 更改 DNS 指向

## 📊 其他團隊的選擇

### 使用 Vercel 的知名專案
- Next.js 官網
- Astro 官網
- Tailwind CSS 官網
- 無數新創公司

### 使用 Azure Static Web Apps 的場景
- Microsoft 內部專案
- 大型企業
- 已有 Azure 生態系統

## 結論

**對於智序資訊工作室，推薦使用 Vercel 部署官網。**

理由：
1. 極速部署（今天就能上線）
2. 完全免費
3. 開發體驗極佳
4. 不影響現有 Azure 架構
5. 隨時可以遷移

---

**建議**: 先在 GitHub 建立 repository，然後我們改用 Vercel 部署，會比 Azure 簡單 10 倍！
