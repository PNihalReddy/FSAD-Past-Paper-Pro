import { useState } from 'react'
import { signInWithEmail } from '../services/authService'
import { isAllowedStudentEmail } from '../config/authRules'
import { isFirebaseConfigured } from '../config/firebase'

export default function StudentLogin({ onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)


  // Validate student email format: 2XXXXXXXXX@klh.edu.in
  const validateStudentEmail = (email) => {
    const studentEmailRegex = /^2\d{9}@klh\.edu\.in$/i
    return studentEmailRegex.test(email.trim())
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateStudentEmail(formData.email)) {
      newErrors.email = 'Email must be in format: 2XXXXXXXXX@klh.edu.in'
    } else if (!isAllowedStudentEmail(formData.email)) {
      newErrors.email = 'This account is not allowed. Please use your approved student email.'
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      // Mock authentication - accepts any valid email/password
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
      
      // Generate mock token
      const mockToken = 'mock-token-' + Date.now()
      const mockUser = {
        email: formData.email,
        name: formData.email.split('@')[0],
        role: 'student'
      }
      
      // Store credentials
      localStorage.setItem('token', mockToken)
      localStorage.setItem('role', 'student')
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      // Redirect to student dashboard
      onNavigate('student-dashboard')
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const result = await signInWithGoogle()
      
      if (result.success && !result.redirect) {
        // Validate student email format
        if (!validateStudentEmail(result.user.email)) {
          setErrors({ general: 'Please use your college student email (2XXXXXXXXX@klh.edu.in)' })
          setLoading(false)
          return
        }
        
        // Store user data
        localStorage.setItem('token', result.token)
        localStorage.setItem('role', 'student')
        localStorage.setItem('user', JSON.stringify(result.user))
        
        // Redirect to student dashboard
        onNavigate('student-dashboard')
      } else if (result.redirect) {
        // Redirect flow initiated; nothing else to do here.
        return
      } else {
        setErrors({ general: result.error || 'Google Sign-in failed' })
      }
    } catch (error) {
      setErrors({ general: 'Google Sign-in failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-100 to-pink-100 relative overflow-hidden">
      {/* Soft Cloud Background */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="cloud-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            </filter>
          </defs>
          <ellipse cx="15%" cy="20%" rx="120" ry="50" fill="white" filter="url(#cloud-blur)" opacity="0.7"/>
          <ellipse cx="65%" cy="15%" rx="140" ry="60" fill="white" filter="url(#cloud-blur)" opacity="0.6"/>
          <ellipse cx="85%" cy="35%" rx="100" ry="45" fill="white" filter="url(#cloud-blur)" opacity="0.5"/>
          <ellipse cx="25%" cy="75%" rx="110" ry="50" fill="white" filter="url(#cloud-blur)" opacity="0.6"/>
          <ellipse cx="70%" cy="80%" rx="130" ry="55" fill="white" filter="url(#cloud-blur)" opacity="0.6"/>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/20 via-transparent to-pink-50/30"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(to bottom right, #38bdf8, #1e3a8a)' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#1e3a8a' }}>Student Login</h2>
            <p className="text-slate-600">Access your academic resources</p>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {errors.general}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                College Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="2XXXXXXXXX@klh.edu.in"
                className={`w-full px-4 py-3 rounded-lg border bg-white ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-blue-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-lg border bg-white ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-blue-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-white font-medium rounded-lg transition-colors shadow-md hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#1e3a8a' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>


          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('signup-student')}
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Sign up here
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate('landing')}
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
