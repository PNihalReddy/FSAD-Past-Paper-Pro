# Firebase Google Authentication Setup Guide

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or select an existing project
3. Enter your project name (e.g., "Past Paper Pro")
4. Follow the setup wizard

## Step 2: Enable Google Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Google** provider
3. Toggle **Enable**
4. Add your **support email**
5. Click **Save**

## Step 3: Register Your Web App

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click the **Web icon** (`</>`)
4. Register your app with a nickname (e.g., "Past Paper Pro Web")
5. Copy the Firebase configuration object

## Step 4: Add Firebase Config to Your Project

1. Copy `.env.example` to `.env.local`:
   ```bash
   cd client
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## Step 5: Configure Authorized Domains

1. In Firebase Console, go to **Authentication** → **Settings** → **Authorized domains**
2. Add your domains:
   - `localhost` (for development)
   - Your production domain (e.g., `pastpaperpro.com`)

## Step 6: Test Google Sign-in

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to any login/signup page
3. Click "Sign in with Google"
4. Select your Google account
5. You should be authenticated successfully!

## Features Implemented

### ✅ Student Login
- Email/Password login
- Google Sign-in with student email validation (2XXXXXXXXX@klh.edu.in)
- Automatic redirect to student dashboard

### ✅ Faculty Login
- Email/Password login
- Google Sign-in with institutional email validation (@klh.edu.in or Gmail)
- Automatic redirect to faculty dashboard

### ✅ Student Sign Up
- Email/Password registration
- Google Sign-up with student email validation
- Account creation confirmation

### ✅ Faculty Sign Up
- Email/Password registration
- Google Sign-up with institutional email validation
- Admin approval workflow

## Email Validation Rules

### Students
- Must use college email: `2XXXXXXXXX@klh.edu.in`
- Format: Starts with `2`, followed by 9 digits, ends with `@klh.edu.in`

### Faculty
- Institutional email: `anything@klh.edu.in`
- OR verified Gmail: `anything@gmail.com`

## Security Features

- ✅ Firebase Authentication
- ✅ JWT tokens stored in localStorage
- ✅ Role-based access control (student/faculty)
- ✅ Email validation before authentication
- ✅ Secure password handling (Firebase manages this)
- ✅ Google OAuth 2.0

## Troubleshooting

### "Firebase: Error (auth/popup-blocked)"
- Allow popups in your browser for localhost
- Or use redirect instead of popup (modify authService.js)

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to Authorized domains in Firebase Console

### "Email validation failed"
- Ensure you're using the correct email format
- Students: 2XXXXXXXXX@klh.edu.in
- Faculty: name@klh.edu.in or verified Gmail

## Next Steps

1. ✅ Firebase is configured
2. ✅ Google Sign-in is working
3. 🔄 Create student/faculty dashboards
4. 🔄 Implement backend API integration
5. 🔄 Add password reset functionality
6. 🔄 Add email verification

## Files Modified

- `client/src/config/firebase.js` - Firebase configuration
- `client/src/services/authService.js` - Authentication service
- `client/src/components/StudentLogin.jsx` - Student login with Google
- `client/src/components/FacultyLogin.jsx` - Faculty login with Google
- `client/src/components/StudentSignup.jsx` - Student signup with Google
- `client/src/components/FacultySignup.jsx` - Faculty signup with Google
- `client/.env.example` - Environment variables template

## Support

For issues or questions:
- Check Firebase Console logs
- Review browser console for errors
- Verify environment variables are set correctly
