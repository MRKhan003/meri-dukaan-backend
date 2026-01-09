# Swagger API Documentation Access

## ✅ Swagger UI is Now Enabled!

### How to Access

1. **Start the backend server:**
   ```bash
   npm run start:dev
   ```

2. **Open Swagger UI in browser:**
   ```
   http://localhost:3001/api-docs
   ```

3. **That's it!** You'll see the complete API documentation with:
   - All endpoints
   - Request/response schemas
   - Try it out functionality
   - Authentication support

---

## 🔐 Using Swagger UI

### Step 1: Login First
1. Go to **Authentication** section
2. Click on `POST /auth/login`
3. Click **"Try it out"**
4. Enter credentials:
   ```json
   {
     "email": "admin@meridukaan.com",
     "password": "password123"
   }
   ```
5. Click **"Execute"**
6. Copy the `access_token` from response

### Step 2: Authorize
1. Click the **"Authorize"** button (top right)
2. Enter: `Bearer {your_access_token}`
   - Example: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. Click **"Authorize"**
4. Click **"Close"**

### Step 3: Test Endpoints
Now you can test any endpoint:
- All endpoints will automatically include the token
- Click **"Try it out"** on any endpoint
- Fill in the parameters
- Click **"Execute"**
- See the response!

---

## 📋 Features

- ✅ **Interactive API Testing** - Test endpoints directly from browser
- ✅ **JWT Authentication** - Token persists after page refresh
- ✅ **Complete Schemas** - See all request/response formats
- ✅ **Try It Out** - Execute requests and see responses
- ✅ **Organized by Tags** - Authentication, POS, Admin

---

## 🌐 Access URLs

### Local Development
- **Swagger UI:** `http://localhost:3001/api-docs`
- **API Base:** `http://localhost:3001`

### For Frontend Developers
- Just start the backend: `npm run start:dev`
- Open: `http://localhost:3001/api-docs`
- No additional setup needed!

---

## 📝 Notes

- Swagger UI is automatically available when backend is running
- No need to install anything separately
- Works on same port as API (3001)
- Token persists in browser (you don't need to re-authorize on refresh)

---

## 🎯 Quick Test Flow

1. Start server: `npm run start:dev`
2. Open: `http://localhost:3001/api-docs`
3. Login: `POST /auth/login` → Get token
4. Authorize: Click "Authorize" → Paste token
5. Test: Try any endpoint!

---

**That's it! Swagger is ready to use! 🚀**

