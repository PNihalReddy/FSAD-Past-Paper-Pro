# 🔧 Fix "This domain is not authorized" Error

## 🎯 The Problem
When you click "Sign in with Google", you see:
> "This domain is not authorized. Please contact the administrator."

This happens because Firebase doesn't recognize your development domain.

---

## ✅ SOLUTION (Step-by-Step)

### **Step 1: Open Firebase Console**
1. Go to: https://console.firebase.google.com/
2. Click on your project: **past-paper-pro-cb5cb**

### **Step 2: Navigate to Authorized Domains**
1. Click **"Authentication"** in the left sidebar
2. Click **"Settings"** tab at the top
3. Scroll down to **"Authorized domains"** section

### **Step 3: Check What's There**
You should see something like:
```
✓ past-paper-pro-cb5cb.firebaseapp.com
✓ past-paper-pro-cb5cb.web.app
```

### **Step 4: Add localhost**
1. Click the **"Add domain"** button
2. Type exactly: `localhost`
3. Click **"Add"**

### **Step 5: Also Add 127.0.0.1** (Important!)
1. Click **"Add domain"** again
2. Type exactly: `127.0.0.1`
3. Click **"Add"**

### **Step 6: Final List Should Look Like:**
```
✓ localhost
✓ 127.0.0.1
✓ past-paper-pro-cb5cb.firebaseapp.com
✓ past-paper-pro-cb5cb.web.app
```

### **Step 7: Clear Browser Cache**
1. Press `Ctrl + Shift + Delete`
2. Select "Cookies" and "Cached images"
3. Click "Clear data"
4. Close browser completely
5. Reopen browser

### **Step 8: Restart Dev Server**
In your terminal:
```bash
# Stop the server (Ctrl + C)
# Then restart:
npm run dev
```

### **Step 9: Test Again**
1. Go to http://localhost:5173
2. Click "Login"
3. Click "Sign in with Google"
4. ✅ Should work now!

---

## 🔍 How to Check Console for More Info

I've added better error logging. Now when you get the error:

1. Press `F12` to open browser console
2. Look for these messages:
   ```
   ✅ Firebase initialized successfully
   🔑 Auth Domain: past-paper-pro-cb5cb.firebaseapp.com
   🌐 Current Origin: http://localhost:5173
   ```

3. If you see the unauthorized error, it will show:
   ```
   🔴 Unauthorized Domain Error
   Current domain: localhost
   Current origin: http://localhost:5173
   Fix: Go to Firebase Console → Authentication → Settings → Authorized domains
   Add: localhost
   ```

---

## 🎯 Alternative: Try Different URL

If `localhost` doesn't work, try accessing via:
```
http://127.0.0.1:5173
```

Sometimes browsers treat these differently.

---

## ⚠️ Common Mistakes

### ❌ **Mistake 1: Added wrong domain**
Make sure you added exactly `localhost` (not `localhost:5173`)

### ❌ **Mistake 2: Didn't restart**
You MUST restart the dev server after adding domains

### ❌ **Mistake 3: Browser cache**
Old authorization settings might be cached. Clear cache!

### ❌ **Mistake 4: Wrong project**
Make sure you're in the correct Firebase project

---

## 📸 Visual Guide

**Where to find Authorized Domains:**

```
Firebase Console
└── past-paper-pro-cb5cb (your project)
    └── 🔐 Authentication
        └── ⚙️ Settings (tab)
            └── Scroll down
                └── 📋 Authorized domains
                    └── [Add domain] button
```

**What to add:**
```
Input field: [localhost          ]
             [Add]

Input field: [127.0.0.1          ]
             [Add]
```

---

## ✅ Success Indicators

You'll know it's working when:
1. ✅ No error message appears
2. ✅ Google account selection popup opens
3. ✅ You can select your Google account
4. ✅ You get redirected to the dashboard

---

## 🆘 Still Not Working?

If you've done all the above and it still doesn't work:

### **Check Browser Console (F12)**
Look for the exact error and send me:
1. The error code (e.g., `auth/unauthorized-domain`)
2. The "Current domain" shown
3. The "Current origin" shown

### **Verify Firebase Config**
Check if these values are correct in `.env.local`:
```
VITE_FIREBASE_AUTH_DOMAIN=past-paper-pro-cb5cb.firebaseapp.com
```

### **Try Incognito Mode**
Open browser in incognito/private mode and test there.

---

## 🎉 After It Works

Once Google Sign-in works:
- ✅ You can login as student or faculty
- ✅ Email validation will work
- ✅ You'll be redirected to the dashboard
- ✅ Mock authentication will be disabled

---

**Follow these steps carefully and it will work!** 🚀
