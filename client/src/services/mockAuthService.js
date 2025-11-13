// Mock Authentication Service for Development/Testing
// This simulates Firebase authentication without requiring Firebase setup

// Simulate Google Sign-in
export const mockGoogleSignIn = async (email = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate user selection
      const mockEmail = email || prompt('Enter email to test (e.g., 2021506789@klh.edu.in for student or faculty@klh.edu.in for faculty):');
      
      if (!mockEmail) {
        resolve({
          success: false,
          error: 'Sign-in cancelled'
        });
        return;
      }

      // Generate mock user data
      const mockUser = {
        uid: 'mock-' + Date.now(),
        email: mockEmail,
        displayName: mockEmail.split('@')[0],
        photoURL: `https://ui-avatars.com/api/?name=${mockEmail.split('@')[0]}&background=random`
      };

      // Generate mock token
      const mockToken = 'mock-jwt-token-' + Date.now();

      resolve({
        success: true,
        user: mockUser,
        token: mockToken
      });
    }, 500); // Simulate network delay
  });
};

// Mock Email/Password Sign-in
export const mockEmailSignIn = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple validation
      if (!email || !password) {
        resolve({
          success: false,
          error: 'Email and password are required'
        });
        return;
      }

      if (password.length < 6) {
        resolve({
          success: false,
          error: 'Password must be at least 6 characters'
        });
        return;
      }

      // Mock successful login
      const mockUser = {
        uid: 'mock-' + Date.now(),
        email: email,
        displayName: email.split('@')[0]
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      resolve({
        success: true,
        user: mockUser,
        token: mockToken
      });
    }, 500);
  });
};

// Mock Email/Password Sign-up
export const mockEmailSignUp = async (email, password, displayName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple validation
      if (!email || !password) {
        resolve({
          success: false,
          error: 'Email and password are required'
        });
        return;
      }

      if (password.length < 6) {
        resolve({
          success: false,
          error: 'Password must be at least 6 characters'
        });
        return;
      }

      // Mock successful signup
      const mockUser = {
        uid: 'mock-' + Date.now(),
        email: email,
        displayName: displayName || email.split('@')[0]
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      resolve({
        success: true,
        user: mockUser,
        token: mockToken
      });
    }, 500);
  });
};

console.log('🔧 Using MOCK Authentication (Development Mode)');
console.log('⚠️ This is for testing only. Set up Firebase for production.');
