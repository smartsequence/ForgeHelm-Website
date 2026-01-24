# GitHub Repository 建立與推送指南

## 📅 建立日期
2026-01-25

## ✅ 已完成
- [x] 本地 Git 倉庫初始化
- [x] 所有變更已提交
- [x] 分支已重命名為 `main`

## 📋 待辦事項

### Step 1: 在 GitHub 建立 Repository

#### 方式 A：透過 GitHub 網頁介面（推薦）

1. 開啟瀏覽器，前往：https://github.com/smartsequence
2. 點擊 **"New"** 按鈕（右上角綠色按鈕）
3. 填寫 Repository 資訊：
   - **Repository name**: `DocEngine-Website`
   - **Description**: `DocEngine 官方網站 - 使用 Astro 建立，部署在 Azure Static Web Apps`
   - **Visibility**: `Public` ✅（推薦，因為是官網）
   - **Initialize this repository with**:
     - ❌ **不要**勾選 "Add a README file"
     - ❌ **不要**勾選 "Add .gitignore"
     - ❌ **不要**勾選 "Choose a license"
     - （因為本地已有這些檔案）
4. 點擊 **"Create repository"** 按鈕

#### 方式 B：使用 GitHub CLI（如已安裝）

```bash
# 確認已登入 GitHub CLI
gh auth status

# 建立 repository
gh repo create smartsequence/DocEngine-Website --public --description "DocEngine 官方網站 - 使用 Astro 建立，部署在 Azure Static Web Apps"
```

### Step 2: 添加遠端倉庫並推送

完成 GitHub Repository 建立後，執行以下指令：

```bash
# 確認在正確的目錄
cd C:\charleen\DocEngine-Website

# 添加遠端倉庫
git remote add origin https://github.com/smartsequence/DocEngine-Website.git

# 確認遠端倉庫已添加
git remote -v

# 推送到 GitHub
git push -u origin main
```

### Step 3: 驗證推送成功

1. 開啟瀏覽器，前往：https://github.com/smartsequence/DocEngine-Website
2. 確認所有檔案已正確上傳
3. 確認 README.md 顯示正常
4. 確認 `.github/workflows/azure-static-web-apps.yml` 存在

## 🔐 如果使用 SSH（可選）

如果您偏好使用 SSH 連接：

```bash
# 添加遠端倉庫（SSH）
git remote add origin git@github.com:smartsequence/DocEngine-Website.git

# 推送到 GitHub
git push -u origin main
```

## 🚀 下一步：Azure Static Web Apps 設定

Repository 推送成功後，請參考 [DEPLOYMENT.md](./DEPLOYMENT.md) 完成 Azure 部署。

### 快速步驟預覽

1. **登入 Azure Portal**: https://portal.azure.com
2. **建立資源** → 搜尋 "Static Web Apps"
3. **基本資訊**：
   - 訂閱：選擇您的訂閱
   - 資源群組：`DocEngine-Resources`（新建或選擇現有）
   - 名稱：`docengine-website`
   - 計畫類型：`Free`
   - 區域：`East Asia`
4. **部署詳細資料**：
   - 來源：`GitHub`
   - 組織：`smartsequence`
   - 存放庫：`DocEngine-Website`
   - 分支：`main`
5. **建置詳細資料**：
   - 建置預設：`Astro`
   - 應用程式位置：`/`
   - API 位置：（留空）
   - 輸出位置：`dist`
6. 點擊 **"檢閱 + 建立"** → **"建立"**

## 📊 預期結果

### GitHub Repository
- ✅ URL: https://github.com/smartsequence/DocEngine-Website
- ✅ 分支：main
- ✅ 檔案數：~20+ 個檔案
- ✅ CI/CD：GitHub Actions workflow 已就緒

### Azure Static Web Apps（完成設定後）
- ✅ 預設 URL: `https://<generated-name>.azurestaticapps.net`
- ✅ 自動部署：每次 push 到 main 自動部署
- ✅ PR 預覽：每個 Pull Request 自動建立預覽環境

### 自訂域名（稍後設定）
- ✅ 主要域名：www.docengine.com

## 🔧 故障排除

### 問題 1：推送被拒絕（rejected）

```bash
# 如果遇到「failed to push some refs」錯誤
# 通常是因為遠端有本地沒有的 commit

# 先拉取遠端變更
git pull origin main --rebase

# 再推送
git push -u origin main
```

### 問題 2：權限不足（Permission denied）

確認您有 `smartsequence` 組織的寫入權限：
1. 前往：https://github.com/smartsequence
2. 確認您是組織成員
3. 確認您有足夠的權限建立 repository

### 問題 3：需要設定 Git 使用者資訊

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## 📝 檢查清單

完成以下步驟後，打勾確認：

- [ ] GitHub Repository 已建立
- [ ] 遠端倉庫已添加到本地
- [ ] 程式碼已推送到 GitHub
- [ ] GitHub Actions workflow 顯示正常
- [ ] Azure Static Web App 已建立
- [ ] 首次自動部署成功
- [ ] 可以透過 Azure URL 訪問網站

## 🔗 相關資源

### GitHub
- **Organization**: https://github.com/smartsequence
- **Repository** (待建立): https://github.com/smartsequence/DocEngine-Website

### Azure
- **Azure Portal**: https://portal.azure.com
- **Static Web Apps 文檔**: https://docs.microsoft.com/azure/static-web-apps/

### 相關專案
- [DocEngine-SaaS](https://github.com/smartsequence/DocEngine-SaaS)
- [DocEngine-Agent](https://github.com/smartsequence/DocEngine-Agent)
- [DocEngine-Contracts](https://github.com/smartsequence/DocEngine-Contracts)

## 📧 需要協助？

如果遇到任何問題，請：
1. 檢查上方的「故障排除」章節
2. 參考 [DEPLOYMENT.md](./DEPLOYMENT.md) 詳細說明
3. 查看 GitHub/Azure 官方文檔

---

**建立日期**: 2026-01-25  
**維護者**: DocEngine Team  
**狀態**: 🟡 等待建立 GitHub Repository
