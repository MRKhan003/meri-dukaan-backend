# Git Push Guide - Meri Dukaan Backend

## ✅ Remote Already Configured

Your remote is already set:
```
origin: git@github.com:MRKhan003/meri-dukaan-backend.git
```

---

## 🚀 Push to GitHub (Step-by-Step)

### Step 1: Check Status
```bash
git status
```

### Step 2: Add Files
```bash
# All files add karein
git add .

# Ya specific files
git add file1 file2
```

### Step 3: Commit
```bash
git commit -m "Initial commit: Meri Dukaan POS + Admin Analytics Backend"
```

### Step 4: Push to GitHub
```bash
# Pehli baar push (main branch)
git push -u origin main

# Ya agar branch name different hai
git push -u origin master
```

---

## 🔧 Common Commands

### Check Current Branch
```bash
git branch
```

### Create/Switch Branch
```bash
# Create new branch
git checkout -b main

# Switch branch
git checkout main
```

### Rename Branch
```bash
# Master se main
git branch -M main
```

### Check Remote
```bash
git remote -v
```

---

## ⚠️ If Remote Already Exists

Agar remote already hai aur change karna ho:
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin git@github.com:MRKhan003/meri-dukaan-backend.git
```

---

## 📝 Quick Push Commands

```bash
# Complete flow
git add .
git commit -m "Your commit message"
git push -u origin main
```

---

## 🔍 Verify Before Push

### Check What Will Be Pushed
```bash
# See staged files
git status

# See what will be committed
git diff --cached
```

### Make Sure These Are NOT Included:
- ❌ `.env` file
- ❌ `node_modules/` folder
- ❌ `dist/` folder
- ❌ `storage/` folder
- ❌ `*.log` files

---

## ✅ After Push

1. GitHub repository check karein
2. Files verify karein
3. README.md visible hai?
4. Swagger.json uploaded hai?

---

**Ready to push! 🚀**

