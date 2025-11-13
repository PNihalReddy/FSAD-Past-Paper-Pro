# 🏠 Local Development - Google Sign-In Setup

## 🎯 Quick Start Guide
Set up Google Sign-In for local development in under 5 minutes!

---

## ✅ Step 1: Verify Your .env.local File

### Check If File Exists
```powershell
cd client
Get-Content .env.local
```

### Your .env.local Should Contain:
```plaintext
# API Configuration
VITE_API_BASE=http://localhost:4000/api
VITE_API_URL=http://localhost:5000

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyBtHn-PpyBToyp8SxcO5g5Q2t8CLUXDZD8
VITE_FIREBASE_AUTH_DOMAIN=past-paper-pro-cb5cb.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=past-paper-pro-cb5cb
VITE_FIREBASE_STORAGE_BUCKET=past-paper-pro-cb5cb.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=866030256691
VITE_FIREBASE_APP_ID=1:866030256691:web:a0a6d81155f6a12ce5d946
```

✅ **Good! Your file is already configured.**

---

## ✅ Step 2: Add localhost to Firebase

### Quick Steps:
1. Go to: https://console.firebase.google.com/project/past-paper-pro-cb5cb/authentication/settings
2. Scroll to **"Authorized domains"**
3. Click **"Add domain"**
4. Add: `localhost`
5. Click **"Add domain"** again
6. Add: `127.0.0.1`
7. Click **"Save"**

### Verify Authorized Domains:
You should see:
```
✅ localhost
✅ 127.0.0.1
✅ past-paper-pro-cb5cb.firebaseapp.com
✅ past-paper-pro-cb5cb.web.app
```

---

## ✅ Step 3: Start Development Server

### Terminal 1 - Start Backend (if needed):
```powershell
cd server
npm install
npm start
```

The server should start on: http://localhost:5000

### Terminal 2 - Start Frontend:
```powershell
cd client
npm install
npm run dev
```

The app should start on: http://localhost:5173

---

## ✅ Step 4: Test Google Sign-In

### Open Your Browser:
1. Go to: http://localhost:5173
2. Click **"Login"** (Student or Faculty)
3. Click **"Sign in with Google"**

### Expected Behavior:
- ✅ Google popup window opens
- ✅ You see "Choose an account" screen
- ✅ Select your Google account
- ✅ Successfully redirected to dashboard

### Console Messages (F12):
```
✅ Firebase initialized successfully
🔑 Auth Domain: past-paper-pro-cb5cb.firebaseapp.com
🌐 Current Origin: http://localhost:5173
```

---

## 🔧 Troubleshooting

### Issue 1: Mock Authentication Prompt Appears
**Symptom:** Dialog asking "Enter email to test..."

**Cause:** Firebase environment variables not loaded

**Fix:**
```powershell
# 1. Stop the dev server (Ctrl + C)
# 2. Verify .env.local exists
cd client
ls .env.local

# 3. Check contents
Get-Content .env.local

# 4. Restart dev server
npm run dev
```

### Issue 2: "This domain is not authorized"
**Symptom:** Firebase error about unauthorized domain

**Fix:**
1. Add `localhost` to Firebase Console (see Step 2)
2. Also add `127.0.0.1`
3. Try accessing via: http://127.0.0.1:5173 instead

### Issue 3: Popup Blocked
**Symptom:** Nothing happens when clicking "Sign in with Google"

**Fix:**
1. Check browser address bar for popup blocker icon
2. Click and allow popups for localhost
3. Try again

### Issue 4: "Configuration Error"
**Symptom:** Error message about Firebase configuration

**Fix:**
1. Check if `.env.local` has all 6 Firebase variables
2. Ensure no extra spaces or quotes
3. Make sure variables start with `VITE_`
4. Restart dev server

---

## 🎯 Testing Different Users

### Test Student Login:
1. Click **"Student Login"**
2. Click **"Sign in with Google"**
3. Use email: `2021506789@klh.edu.in` format
4. ✅ Should redirect to Student Dashboard

**Note:** Email must match pattern `2XXXXXXXXX@klh.edu.in`

### Test Faculty Login:
1. Click **"Faculty Login"**
2. Click **"Sign in with Google"**
3. Use email: `faculty@klh.edu.in`
4. ✅ Should show "Account Created - Awaiting Approval"

**Note:** Faculty accounts need admin approval

---

## 🚀 Development Workflow

### Normal Development:
```powershell
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

### After Pulling Changes:
```powershell
# Update dependencies
cd client
npm install

cd ../server
npm install

# Restart servers
```

### Before Committing:
```bash
# Make sure .env.local is NOT committed
git status

# It should be in .gitignore
cat .gitignore | grep .env.local
```

---

## 📋 Browser Console Debugging

### Open Console (F12) and Look For:

#### ✅ Success Messages:
```
✅ Firebase initialized successfully
🔑 Auth Domain: past-paper-pro-cb5cb.firebaseapp.com
🌐 Current Origin: http://localhost:5173
```

#### ❌ Error Messages:
```
⚠️ Firebase not configured. Using MOCK authentication
```
**Fix:** Check `.env.local` file

```
🔴 Unauthorized Domain Error
Current domain: localhost
```
**Fix:** Add localhost to Firebase authorized domains

```
auth/popup-closed-by-user
```
**Fix:** User closed popup - normal behavior

```
auth/popup-blocked
```
**Fix:** Allow popups in browser settings

---

## 🔄 Quick Reset

### If Everything Fails:

```powershell
# 1. Stop all servers (Ctrl + C in both terminals)

# 2. Clear browser data
# Press Ctrl + Shift + Delete
# Clear cookies and cache for localhost

# 3. Verify environment file
cd client
Get-Content .env.local

# 4. Reinstall dependencies
npm install

# 5. Restart dev server
npm run dev

# 6. Open in incognito mode
# Test in a fresh browser session
```

---

## 🎨 Different Testing Scenarios

### Test with Different Ports:

#### Using Default Port (5173):
```powershell
npm run dev
# Opens at http://localhost:5173
```

#### Using Custom Port:
```powershell
npm run dev -- --port 3000
# Opens at http://localhost:3000
```

**Note:** If using custom port, add it to Firebase authorized domains!

---

## 📊 Verify Configuration

### Check Firebase is Loaded:
Open browser console (F12) and run:
```javascript
console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing');
console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing');
console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing');
```

All should show: ✅ Set

---

## 🔐 Security Note

### ✅ Safe to Use Locally:
- Firebase API keys in `.env.local` are safe
- They're restricted by domain in Firebase Console
- Only authorized domains can use them

### ⚠️ Never Commit:
- `.env.local` should NOT be in git
- It's already in `.gitignore`
- Each developer should have their own copy

---

## 🎉 Success Indicators

You know it's working when:
1. ✅ No mock authentication prompts
2. ✅ Google popup appears immediately
3. ✅ Can select Google account
4. ✅ Console shows "Firebase initialized successfully"
5. ✅ Email validation works
6. ✅ Redirected to correct dashboard

---

## 🆘 Still Not Working?

### Check These in Order:

1. **Environment File**
   ```powershell
   cd client
   Get-Content .env.local
   # Verify all 6 Firebase variables exist
   ```

2. **Firebase Console**
   - Check `localhost` is in authorized domains
   - Check Google Sign-In is enabled

3. **Dev Server**
   ```powershell
   # Stop and restart
   npm run dev
   ```

4. **Browser**
   - Clear cache (Ctrl + Shift + Delete)
   - Try incognito mode
   - Allow popups

5. **Network**
   - Check if port 5173 is accessible
   - Try http://127.0.0.1:5173 instead

---

## ✨ Ready to Develop!

Once working locally:
- ✅ Make your code changes
- ✅ Test with real Google Sign-In
- ✅ Commit changes (`.env.local` stays local)
- ✅ Push to GitHub
- ✅ Deploy to Render

**Happy coding!** 💻
