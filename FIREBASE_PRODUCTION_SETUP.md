# 🔥 Firebase Production Setup - Complete Guide

## 🎯 What This Guide Does
This guide ensures your Firebase project is properly configured for production use with Google Sign-In authentication.

---

## ✅ Step 1: Verify Firebase Project

### Access Firebase Console
1. Go to: https://console.firebase.google.com/
2. Select project: **past-paper-pro-cb5cb**

### Check Project Status
- ✅ Project should be in **Spark Plan (Free)** or higher
- ✅ Authentication should be enabled
- ✅ Google Sign-In provider should be enabled

---

## ✅ Step 2: Configure Authentication Providers

### Enable Google Sign-In
1. Click **"Authentication"** in left sidebar
2. Click **"Sign-in method"** tab
3. Find **"Google"** in the list
4. If not enabled:
   - Click on "Google"
   - Toggle **"Enable"** switch to ON
   - Add support email (your email)
   - Click **"Save"**

### Verify Email/Password (Optional)
If you want email/password authentication:
1. Find **"Email/Password"** in the list
2. Enable it if needed
3. Click **"Save"**

---

## ✅ Step 3: Add Authorized Domains

### Why This Matters
Firebase only allows authentication from domains you explicitly authorize. This is a security feature.

### Required Domains

#### For Local Development:
1. Click **"Authentication"** → **"Settings"** tab
2. Scroll to **"Authorized domains"**
3. Click **"Add domain"** and add:
   - `localhost`
   - `127.0.0.1`

#### For Production (Render):
1. Click **"Add domain"**
2. Add: `past-paper-pro-1.onrender.com`
3. Click **"Add"**

#### If You Have Custom Domain:
1. Add your custom domain (e.g., `yourdomain.com`)
2. Add `www.yourdomain.com` if applicable

### Final List Should Include:
```
✅ localhost
✅ 127.0.0.1
✅ past-paper-pro-cb5cb.firebaseapp.com (default)
✅ past-paper-pro-cb5cb.web.app (default)
✅ past-paper-pro-1.onrender.com (your Render deployment)
```

---

## ✅ Step 4: Configure OAuth Consent Screen (Google Cloud)

### Why This Matters
Google requires you to configure an OAuth consent screen for your application.

### Access Google Cloud Console
1. Go to: https://console.cloud.google.com/
2. Select project: **past-paper-pro-cb5cb**
3. Navigate to: **APIs & Services** → **OAuth consent screen**

### Configure Consent Screen
1. **User Type:**
   - Choose "External" for public apps
   - Click **"Create"**

2. **App Information:**
   - App name: `Past Paper Pro`
   - User support email: Your email
   - App logo: (Optional) Upload your logo

3. **App Domain:**
   - Application home page: `https://past-paper-pro-1.onrender.com`
   - Privacy policy: (If you have one)
   - Terms of service: (If you have one)

4. **Developer Contact:**
   - Add your email address

5. **Scopes:**
   - Click **"Add or Remove Scopes"**
   - Select these scopes:
     - `email`
     - `profile`
     - `openid`
   - Click **"Update"**

6. **Test Users (During Development):**
   - Click **"Add Users"**
   - Add email addresses that can test the app
   - Click **"Save and Continue"**

7. **Summary:**
   - Review your configuration
   - Click **"Back to Dashboard"**

### Publishing Status
- **Testing:** Only test users can sign in (limit: 100 users)
- **In Production:** Anyone can sign in
- To publish: Click **"Publish App"** (requires verification for large-scale apps)

---

## ✅ Step 5: Security Rules & Best Practices

### Email Domain Restrictions
Your app validates emails in the code:
- **Students:** Must be `2XXXXXXXXX@klh.edu.in`
- **Faculty:** Must be `faculty@klh.edu.in` or similar college domain

### Additional Security (Optional)

#### Restrict to Specific Domains
In your `firebase.js`, you can add domain restrictions:
```javascript
googleProvider.setCustomParameters({
  prompt: 'select_account',
  hd: 'klh.edu.in' // Only allow @klh.edu.in emails
});
```

#### Enable Email Verification
Require users to verify their email before accessing the app.

---

## ✅ Step 6: Monitor Usage & Quotas

### Check Firebase Usage
1. Go to Firebase Console → **Usage and billing**
2. Monitor:
   - Authentication sign-ins
   - Storage usage
   - Function calls (if using Cloud Functions)

### Free Tier Limits (Spark Plan)
- **Authentication:** 10,000 verifications/month
- **Realtime Database:** 1 GB storage, 10 GB/month transfer
- **Cloud Storage:** 5 GB storage, 1 GB/day transfer
- **Hosting:** 10 GB storage, 360 MB/day transfer

### Upgrade if Needed
- **Blaze Plan (Pay as you go):** Only pay for what you use beyond free tier

---

## ✅ Step 7: Environment Variables Configuration

### For Render Deployment

Add these environment variables in Render Dashboard:
```plaintext
VITE_FIREBASE_API_KEY=AIzaSyBtHn-PpyBToyp8SxcO5g5Q2t8CLUXDZD8
VITE_FIREBASE_AUTH_DOMAIN=past-paper-pro-cb5cb.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=past-paper-pro-cb5cb
VITE_FIREBASE_STORAGE_BUCKET=past-paper-pro-cb5cb.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=866030256691
VITE_FIREBASE_APP_ID=1:866030256691:web:a0a6d81155f6a12ce5d946
```

### For Local Development

Create `.env.local` in `client/` folder:
```plaintext
VITE_API_BASE=http://localhost:4000/api
VITE_API_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=AIzaSyBtHn-PpyBToyp8SxcO5g5Q2t8CLUXDZD8
VITE_FIREBASE_AUTH_DOMAIN=past-paper-pro-cb5cb.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=past-paper-pro-cb5cb
VITE_FIREBASE_STORAGE_BUCKET=past-paper-pro-cb5cb.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=866030256691
VITE_FIREBASE_APP_ID=1:866030256691:web:a0a6d81155f6a12ce5d946
```

---

## ✅ Step 8: Testing Checklist

### Test Authentication Flow

#### Local Testing:
1. ✅ Run dev server: `npm run dev`
2. ✅ Click "Sign in with Google"
3. ✅ Google popup appears
4. ✅ Can select Google account
5. ✅ Successfully signs in
6. ✅ Redirected to dashboard

#### Production Testing:
1. ✅ Go to: https://past-paper-pro-1.onrender.com
2. ✅ Click "Sign in with Google"
3. ✅ Google popup appears
4. ✅ Can select Google account
5. ✅ Successfully signs in
6. ✅ Redirected to dashboard

### Test Email Validation

#### Student Login:
1. ✅ Try with valid student email: `2021506789@klh.edu.in`
2. ✅ Should succeed
3. ❌ Try with invalid email: `test@gmail.com`
4. ❌ Should show error: "Please use your college student email"

#### Faculty Login:
1. ✅ Try with valid faculty email: `faculty@klh.edu.in`
2. ✅ Should show "Account Created - Awaiting Approval"
3. ❌ Try with invalid email: `test@gmail.com`
4. ❌ Should show error

---

## 🔧 Troubleshooting

### Error: "This domain is not authorized"
**Fix:** Add the domain to Firebase → Authentication → Settings → Authorized domains

### Error: "Popup blocked"
**Fix:** Allow popups in browser settings for your domain

### Error: "Configuration error"
**Fix:** Check environment variables are correctly set

### Mock Authentication Still Showing
**Fix:** 
1. Verify environment variables are set
2. Rebuild and redeploy
3. Clear browser cache
4. Hard refresh (Ctrl + F5)

---

## 📊 Monitoring & Analytics

### Firebase Authentication Dashboard
1. Go to Firebase Console → **Authentication** → **Users**
2. See all authenticated users
3. Monitor sign-in activity

### Check Sign-In Methods Usage
1. Go to **Authentication** → **Sign-in method**
2. See usage statistics for each provider

---

## 🔐 Security Best Practices

### ✅ DO:
- Keep Firebase config in environment variables
- Validate user emails in your application
- Use authorized domains feature
- Monitor unusual sign-in activity
- Implement rate limiting if needed

### ❌ DON'T:
- Commit `.env.local` to git (already in `.gitignore`)
- Share Firebase credentials publicly
- Disable domain restrictions
- Allow unrestricted email domains in production

---

## 🆘 Getting Help

### Firebase Documentation
- Authentication: https://firebase.google.com/docs/auth
- Google Sign-In: https://firebase.google.com/docs/auth/web/google-signin

### Common Issues
- Check Firebase Status: https://status.firebase.google.com/
- Community Support: https://firebase.google.com/support

---

## ✨ Production Readiness Checklist

Before going live, ensure:
- [ ] Google Sign-In provider enabled in Firebase
- [ ] All production domains added to authorized domains
- [ ] OAuth consent screen configured
- [ ] Environment variables set on Render
- [ ] Email validation working correctly
- [ ] Test users can successfully authenticate
- [ ] Error handling implemented
- [ ] Loading states work properly
- [ ] Logout functionality works
- [ ] Session management tested

---

## 🎉 You're Ready!

Once all steps are complete:
- ✅ Users can sign in with Google
- ✅ Email validation works
- ✅ Application is secure
- ✅ Ready for production use

**Happy deploying!** 🚀
