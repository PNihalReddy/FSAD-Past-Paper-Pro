# 🚀 Complete Google Sign-In Setup Guide for Render

## 📋 Overview
This guide will help you configure Google Sign-In authentication for your deployed application on Render.

---

## ✅ Part 1: Configure Firebase Environment Variables on Render

### Step 1: Access Your Render Dashboard
1. Go to: https://dashboard.render.com/
2. Log in to your account
3. Find and click on your **past-paper-pro-1** web service

### Step 2: Add Environment Variables
1. Click on **"Environment"** in the left sidebar
2. Click **"Add Environment Variable"** button
3. Add each of the following variables one by one:

```plaintext
VITE_FIREBASE_API_KEY=AIzaSyBtHn-PpyBToyp8SxcO5g5Q2t8CLUXDZD8
VITE_FIREBASE_AUTH_DOMAIN=past-paper-pro-cb5cb.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=past-paper-pro-cb5cb
VITE_FIREBASE_STORAGE_BUCKET=past-paper-pro-cb5cb.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=866030256691
VITE_FIREBASE_APP_ID=1:866030256691:web:a0a6d81155f6a12ce5d946
```

### Step 3: Save and Deploy
1. Click **"Save Changes"** at the bottom
2. Render will automatically trigger a new deployment
3. Wait 3-5 minutes for the deployment to complete
4. Check the deployment logs to ensure it succeeds

---

## ✅ Part 2: Add Render Domain to Firebase

### Step 1: Open Firebase Console
1. Go to: https://console.firebase.google.com/
2. Select your project: **past-paper-pro-cb5cb**

### Step 2: Navigate to Authorized Domains
1. Click **"Authentication"** in the left sidebar
2. Click the **"Settings"** tab at the top
3. Scroll down to **"Authorized domains"** section

### Step 3: Add Your Render Domain
1. Click **"Add domain"** button
2. Enter: `past-paper-pro-1.onrender.com`
3. Click **"Add"**

### Step 4: Verify Current Domains
Your authorized domains list should now include:
- ✅ `localhost` (for local development)
- ✅ `127.0.0.1` (for local development)
- ✅ `past-paper-pro-cb5cb.firebaseapp.com` (Firebase hosting)
- ✅ `past-paper-pro-cb5cb.web.app` (Firebase hosting)
- ✅ `past-paper-pro-1.onrender.com` (Your Render deployment)

---

## ✅ Part 3: Test Google Sign-In

### Step 1: Wait for Deployment
- Make sure your Render deployment is complete
- Check at: https://dashboard.render.com/

### Step 2: Clear Browser Cache
1. Press `Ctrl + Shift + Delete`
2. Select "Cookies" and "Cached images and files"
3. Click "Clear data"

### Step 3: Test the Application
1. Go to: https://past-paper-pro-1.onrender.com
2. Click **"Login"** (Student or Faculty)
3. Click **"Sign in with Google"**
4. ✅ You should see the Google account selection popup
5. Select your Google account
6. Sign in successfully

---

## 🔍 Troubleshooting

### Issue 1: Still Seeing Mock Authentication Prompt
**Symptoms:** Dialog asking "Enter email to test..."

**Solution:**
1. Verify environment variables are saved on Render
2. Check deployment logs for any build errors
3. Make sure deployment completed successfully
4. Hard refresh browser: `Ctrl + F5`

### Issue 2: "This domain is not authorized" Error
**Symptoms:** Firebase error about unauthorized domain

**Solution:**
1. Double-check you added `past-paper-pro-1.onrender.com` to Firebase
2. Make sure there are no typos in the domain name
3. Wait 1-2 minutes for Firebase to propagate changes
4. Try again

### Issue 3: "Configuration Error" or Firebase Not Initialized
**Symptoms:** Console errors about Firebase not configured

**Solution:**
1. Check environment variables in Render dashboard
2. Make sure variable names start with `VITE_`
3. Verify no extra spaces in variable values
4. Redeploy: Click "Manual Deploy" → "Deploy latest commit"

### Issue 4: Popup Blocked
**Symptoms:** Nothing happens when clicking "Sign in with Google"

**Solution:**
1. Check if browser blocked the popup (look for icon in address bar)
2. Click the icon and allow popups for this site
3. Try signing in again

---

## 📊 How to Verify It's Working

### Check Browser Console (F12)
Look for these messages:
```
✅ Firebase initialized successfully
🔑 Auth Domain: past-paper-pro-cb5cb.firebaseapp.com
🌐 Current Origin: https://past-paper-pro-1.onrender.com
```

### You Should NOT See:
```
⚠️ Firebase not configured. Using MOCK authentication for development.
🔧 Using MOCK Authentication (Development Mode)
```

If you see mock authentication messages, Firebase environment variables are not properly configured.

---

## 🎯 Expected User Flow

### For Students:
1. Click "Sign in with Google"
2. Select Google account
3. **Email validation:** Must be `2XXXXXXXXX@klh.edu.in` format
4. ✅ Redirected to Student Dashboard

### For Faculty:
1. Click "Sign in with Google"
2. Select Google account
3. **Email validation:** Must be `faculty@klh.edu.in` or similar
4. ✅ See "Account Created - Awaiting Admin Approval"
5. ⏳ Wait for admin to approve account
6. ✅ After approval, can access Faculty Dashboard

---

## 🔐 Security Notes

### Environment Variables Safety
- ✅ Firebase API keys are safe to expose in client-side code
- ✅ They are restricted by domain in Firebase Console
- ✅ Only authorized domains can use these credentials

### Domain Restrictions
- Only domains listed in Firebase "Authorized domains" can authenticate
- This prevents unauthorized use of your Firebase project

---

## 📝 Quick Checklist

Before deploying, ensure:
- [ ] All 6 Firebase environment variables added to Render
- [ ] Render domain added to Firebase authorized domains
- [ ] Deployment completed successfully on Render
- [ ] Browser cache cleared
- [ ] Tested with real Google account

---

## 🆘 Still Having Issues?

### Check Render Logs
1. Go to Render Dashboard
2. Click on your service
3. Click "Logs" tab
4. Look for any errors during build or runtime

### Check Firebase Console
1. Go to Firebase Console → Authentication
2. Check if you see any sign-in attempts
3. Look for error messages

### Test Locally First
1. Make sure Google Sign-In works on `localhost`
2. If it doesn't work locally, fix that first
3. Then deploy to Render

---

## ✨ Success!

Once everything is configured:
- ✅ Real Google Sign-In popup appears
- ✅ No mock authentication prompts
- ✅ Users can sign in with their Google accounts
- ✅ Email validation works correctly
- ✅ Users are redirected to appropriate dashboards

**Your application is now production-ready!** 🎉
