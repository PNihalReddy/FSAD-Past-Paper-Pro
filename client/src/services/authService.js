import { 
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../config/firebase';
import { mockGoogleSignIn, mockEmailSignIn, mockEmailSignUp } from './mockAuthService';

// Sign in with Google
export const signInWithGoogle = async () => {
  // Check if Firebase is configured
  if (!isFirebaseConfigured()) {
    console.warn('⚠️ Firebase not configured. Using MOCK authentication for development.');
    return await mockGoogleSignIn();
  }

  if (!auth || !googleProvider) {
    return {
      success: false,
      error: 'Authentication service is not available. Please try again later.'
    };
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Get the ID token
    const token = await user.getIdToken();
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      },
      token
    };
  } catch (error) {
    console.error('Google Sign-in Error:', error);
    
    // Provide user-friendly error messages
    let errorMessage = error.message;
    
    // If popup is blocked or environment doesn't support popups, fallback to redirect flow
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/operation-not-supported-in-this-environment') {
      try {
        // This will navigate the browser to Google and back
        await signInWithRedirect(auth, googleProvider);
        // Not returned in normal flow because the browser navigates away.
        return { success: true, redirect: true };
      } catch (redirectErr) {
        console.error('Google Redirect Sign-in Error:', redirectErr);
        errorMessage = 'Popup was blocked and redirect failed. Please allow popups or try a different browser.';
      }
    } else if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Sign-in cancelled. Please try again.';
    } else if (error.code === 'auth/popup-blocked') {
      errorMessage = 'Popup was blocked. Please allow popups for this site.';
    } else if (error.code === 'auth/unauthorized-domain') {
      errorMessage = `Domain not authorized. Please add "${window.location.hostname}" to Firebase Console → Authentication → Settings → Authorized domains`;
      console.error('🔴 Unauthorized Domain Error');
      console.error('Current domain:', window.location.hostname);
      console.error('Current origin:', window.location.origin);
      console.error('Fix: Go to Firebase Console → Authentication → Settings → Authorized domains');
      console.error('Add:', window.location.hostname);
    } else if (error.code === 'auth/invalid-api-key') {
      errorMessage = 'Firebase configuration error. Please contact the administrator.';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Handle result after signInWithRedirect completes and returns to the app
export const getGoogleRedirectResult = async () => {
  if (!isFirebaseConfigured()) {
    return null;
  }
  try {
    const result = await getRedirectResult(auth);
    if (!result) return null;
    const user = result.user;
    const token = await user.getIdToken();
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      },
      token
    };
  } catch (error) {
    console.error('Get Redirect Result Error:', error);
    let errorMessage = error.message || 'Google Sign-in failed after redirect.';
    return { success: false, error: errorMessage };
  }
};

// Sign in with Email and Password
export const signInWithEmail = async (email, password) => {
  // Use mock if Firebase not configured
  if (!isFirebaseConfigured()) {
    console.warn('⚠️ Firebase not configured. Using MOCK authentication for development.');
    return await mockEmailSignIn(email, password);
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    
    return {
      success: true,
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName
      },
      token
    };
  } catch (error) {
    console.error('Email Sign-in Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Sign up with Email and Password
export const signUpWithEmail = async (email, password, displayName) => {
  // Use mock if Firebase not configured
  if (!isFirebaseConfigured()) {
    console.warn('⚠️ Firebase not configured. Using MOCK authentication for development.');
    return await mockEmailSignUp(email, password, displayName);
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name
    if (displayName) {
      await updateProfile(result.user, {
        displayName: displayName
      });
    }
    
    const token = await result.user.getIdToken();
    
    return {
      success: true,
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: displayName || result.user.email
      },
      token
    };
  } catch (error) {
    console.error('Email Sign-up Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Sign out
export const logOut = async () => {
  // Use mock if Firebase not configured
  if (!isFirebaseConfigured()) {
    console.warn('⚠️ Firebase not configured. Using MOCK authentication for development.');
    // Clear local storage for mock auth
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    return { success: true };
  }

  if (!auth) {
    return {
      success: false,
      error: 'Authentication service is not available. Please try again later.'
    };
  }

  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Sign-out Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  // Use mock if Firebase not configured
  if (!isFirebaseConfigured()) {
    console.warn('⚠️ Firebase not configured. Using MOCK authentication for development.');
    // Mock password reset - just return success
    return { success: true };
  }

  if (!auth) {
    return {
      success: false,
      error: 'Authentication service is not available. Please try again later.'
    };
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Password Reset Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get current user
export const getCurrentUser = () => {
  if (!isFirebaseConfigured() || !auth) {
    // Return mock user from localStorage if available
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  if (!isFirebaseConfigured() || !auth) {
    // Return a mock unsubscribe function
    return () => {};
  }
  return auth.onAuthStateChanged(callback);
};
