# 🔥 Quick Firebase Setup (5 Minutes)

## ⚠️ Current Issue
You're seeing "request access is invalid" because Firebase credentials are not configured yet.

## ✅ Quick Fix (Follow These Steps)

### Step 1: Create Firebase Project (2 minutes)

1. Go to: https://console.firebase.google.com/
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `Past-Paper-Pro`
4. Click **Continue**
5. Disable Google Analytics (optional)
6. Click **Create project**
7. Wait for it to finish, then click **Continue**

### Step 2: Enable Google Sign-In (1 minute)

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"** button
3. Click on **"Google"** in the Sign-in providers list
4. Toggle the **Enable** switch to ON
5. Select your **support email** from dropdown
6. Click **Save**

### Step 3: Get Your Firebase Config (1 minute)

1. Click the **gear icon** (⚙️) next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** (`</>`)
5. Enter app nickname: `Past-Paper-Pro-Web`
6. Click **"Register app"**
7. **COPY** the firebaseConfig object (it looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### Step 4: Add Config to Your Project (1 minute)

1. Open file: `client/.env.local` (create it if it doesn't exist)
2. Add these lines (replace with YOUR values from Step 3):

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

3. **Save the file**

### Step 5: Restart Your Dev Server

1. Stop your current dev server (Ctrl+C in terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

### Step 6: Test Google Sign-In

1. Go to http://localhost:5173
2. Click **"Login"** or **"Sign Up"**
3. Click **"Sign in with Google"**
4. Select your Google account
5. ✅ **It should work now!**

---

## 🎯 What This Does

- **Students** can sign in with Google using their college email (2XXXXXXXXX@klh.edu.in)
- **Faculty** can sign in with Google using institutional email (@klh.edu.in) or Gmail
- All authentication is handled securely by Firebase
- No passwords stored on your server

---

## 🔧 Troubleshooting

### "Popup blocked"
- Allow popups for localhost in your browser

### "Unauthorized domain"
1. Go to Firebase Console → Authentication → Settings → Authorized domains
2. Add `localhost` to the list

### Still not working?
1. Check browser console for errors (F12)
2. Make sure `.env.local` file is in the `client` folder
3. Make sure you restarted the dev server
4. Check that all Firebase config values are correct (no quotes, no spaces)

---

## 📝 Example .env.local File

Create this file at: `client/.env.local`

```env
VITE_API_BASE=http://localhost:4000/api
VITE_API_URL=http://localhost:5000

# Firebase Configuration (REPLACE WITH YOUR VALUES)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=past-paper-pro.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=past-paper-pro
VITE_FIREBASE_STORAGE_BUCKET=past-paper-pro.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ No "request access is invalid" error
- ✅ Google popup appears when clicking "Sign in with Google"
- ✅ You can select your Google account
- ✅ You get redirected to the dashboard (once implemented)

---

## 🚀 Next Steps After Setup

Once Firebase is working:
1. ✅ Google Sign-in works
2. 🔄 Build Student Dashboard
3. 🔄 Build Faculty Dashboard
4. 🔄 Connect to backend API
5. 🔄 Add paper upload/download features

---

**Need help?** Check the browser console (F12) for detailed error messages!
