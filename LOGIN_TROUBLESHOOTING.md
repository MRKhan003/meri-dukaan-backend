# Login Troubleshooting Guide

## ❌ Error: "Invalid credentials" (401)

### Common Causes & Solutions:

---

## ✅ Solution 1: Database Not Seeded (Most Common)

### Problem:
Database mein users nahi hain.

### Check:
```bash
psql -d meri_dukaan -c "SELECT email FROM users;"
# Agar empty hai, to seed run karein
```

### Fix:
```bash
npm run prisma:seed
```

### Verify:
```bash
# Users check karein
psql -d meri_dukaan -c "SELECT email, role FROM users;"
```

---

## ✅ Solution 2: Wrong Email/Password

### Correct Credentials:

| Email | Password | Role |
|-------|----------|------|
| `admin@meridukaan.com` | `password123` | ADMIN |
| `sales1@meridukaan.com` | `password123` | SALES |
| `sales2@meridukaan.com` | `password123` | SALES |
| `inventory@meridukaan.com` | `password123` | INVENTORY |
| `purchase@meridukaan.com` | `password123` | PURCHASE |

### Test Request:
```json
POST /auth/login
{
  "email": "admin@meridukaan.com",
  "password": "password123"
}
```

---

## ✅ Solution 3: Database Connection Issue

### Check:
```bash
# Database running hai?
psql -d meri_dukaan -c "SELECT 1;"
```

### Fix:
```bash
# PostgreSQL start karein
brew services start postgresql@15  # macOS
# OR
sudo systemctl start postgresql     # Linux
```

---

## ✅ Solution 4: Prisma Client Not Generated

### Check:
```bash
ls node_modules/.prisma/client
```

### Fix:
```bash
npm run prisma:generate
```

---

## ✅ Solution 5: Migrations Not Run

### Check:
```bash
psql -d meri_dukaan -c "\dt"
# Tables dikhne chahiye
```

### Fix:
```bash
npm run prisma:migrate
npm run prisma:seed
```

---

## 🔍 Debug Steps

### Step 1: Check Users Exist
```bash
psql -d meri_dukaan -c "SELECT email, role FROM users;"
```

### Step 2: Check Password Hash
```bash
psql -d meri_dukaan -c "SELECT email, LEFT(password_hash, 20) as hash_preview FROM users WHERE email = 'admin@meridukaan.com';"
```

### Step 3: Test Login via Swagger
1. Open: http://localhost:3001/api-docs
2. `POST /auth/login` try karein
3. Check response

### Step 4: Check Server Logs
```bash
# Server logs mein error dekhein
# Terminal mein server logs check karein
```

---

## ✅ Quick Fix Checklist

- [ ] Database seeded? (`npm run prisma:seed`)
- [ ] Correct email? (`admin@meridukaan.com`)
- [ ] Correct password? (`password123`)
- [ ] PostgreSQL running?
- [ ] Prisma Client generated? (`npm run prisma:generate`)
- [ ] Migrations run? (`npm run prisma:migrate`)

---

## 🧪 Test Login

### Via Swagger:
1. Open: http://localhost:3001/api-docs
2. `POST /auth/login`
3. Try it out
4. Enter:
   ```json
   {
     "email": "admin@meridukaan.com",
     "password": "password123"
   }
   ```
5. Execute

### Via curl:
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@meridukaan.com",
    "password": "password123"
  }'
```

---

## 📝 Expected Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@meridukaan.com",
    "role": "ADMIN",
    "storeId": null
  }
}
```

---

## 🆘 Still Not Working?

1. **Check server logs** - Error details dekhein
2. **Verify database** - Users exist karte hain?
3. **Re-seed database**:
   ```bash
   npm run prisma:migrate reset
   npm run prisma:seed
   ```
4. **Restart server** - `npm run start:dev`

---

**Most Common Issue:** Database not seeded! Run `npm run prisma:seed` ✅

