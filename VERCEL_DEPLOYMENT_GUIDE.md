# Vercel 部署指南

## ✅ GitHub 推送完成

您的程式碼已成功推送到：
**https://github.com/smartsequence/DocEngine-Website**

---

## 🚀 在 Vercel 部署網站

瀏覽器應該已經打開 https://vercel.com/new

### 步驟 1：連接 GitHub Repository

1. 如果還沒登入，請先登入 Vercel（建議使用 GitHub 帳號登入）
2. 在 "Import Git Repository" 區域，點擊 **"Continue with GitHub"**
3. 授權 Vercel 存取您的 GitHub 帳號
4. 搜尋或選擇 `DocEngine-Website` repository
5. 點擊 **"Import"**

---

### 步驟 2：配置專案設定

Vercel 會自動偵測到這是 Astro 專案，通常會自動配置好。請確認以下設定：

#### 基本設定
- **Project Name**: `docengine-website`（或您喜歡的名稱）
- **Framework Preset**: `Astro`（應該自動偵測）
- **Root Directory**: `./`（預設）

#### Build & Development Settings
- **Build Command**: `npm run build`（或 `astro build`）
- **Output Directory**: `dist`（Astro 預設）
- **Install Command**: `npm install`（預設）

#### Environment Variables（環境變數）
目前不需要設定任何環境變數。

---

### 步驟 3：部署

1. 確認所有設定無誤後，點擊 **"Deploy"** 按鈕
2. 等待 2-3 分鐘，Vercel 會：
   - 下載您的程式碼
   - 安裝依賴套件
   - 建置專案
   - 部署到全球 CDN

---

## 🎉 部署完成後

部署完成後，Vercel 會提供：

1. **預覽 URL**（格式）：
   ```
   https://docengine-website-xxxx.vercel.app
   ```

2. **專案儀表板**：可以查看部署狀態、日誌、分析等

---

## 🌐 配置自訂域名（可選）

如果您已經擁有 `smartsequence.tech` 域名：

### 在 Vercel 中設定

1. 進入專案的 **Settings** → **Domains**
2. 輸入 `smartsequence.tech`
3. 點擊 **Add**
4. Vercel 會提供 DNS 設定指引

### 在域名註冊商設定 DNS

需要在您的域名註冊商（如 Namecheap、GoDaddy 等）設定：

**A Record**:
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record** (for www):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

DNS 變更通常需要 24-48 小時生效。

---

## 📊 專案資訊

- **本地專案位置**: `C:\charleen\DocEngine-Website`
- **GitHub Repository**: https://github.com/smartsequence/DocEngine-Website
- **Vercel 專案**: 部署後會提供 URL

---

## 🔄 自動部署

配置完成後，每次您推送程式碼到 GitHub main 分支，Vercel 都會自動重新部署！

```bash
# 未來更新網站的流程
git add .
git commit -m "更新內容"
git push
# Vercel 會自動部署！
```

---

## 💡 需要幫助？

如果部署過程中遇到任何問題，請告訴我：
- 錯誤訊息
- 部署日誌
- 當前進行到哪個步驟

我會協助您解決！

---

## ✅ 檢查清單

- [x] 程式碼推送到 GitHub
- [ ] 在 Vercel 連接 GitHub repository
- [ ] 配置專案設定
- [ ] 部署專案
- [ ] 取得預覽 URL
- [ ] （可選）配置自訂域名
