import { useState, useEffect } from 'react'
import { signInWithGoogle, signUpWithEmail, getGoogleRedirectResult } from '../services/authService'
import { isFirebaseConfigured } from '../config/firebase'

export default function FacultySignup({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Handle Google redirect result (when popup is blocked)
  useEffect(() => {
    (async () => {
      const result = await getGoogleRedirectResult()
      if (!result) return
      if (result.success) {
        if (!validateFacultyEmail(result.user.email)) {
          setErrors({ general: 'Please use your institutional email (@klh.edu.in) or verified Gmail' })
          return
        }
        localStorage.setItem('token', result.token)
        localStorage.setItem('role', 'faculty')
        localStorage.setItem('user', JSON.stringify(result.user))
        onNavigate('faculty-dashboard')
      } else if (result.error) {
        setErrors({ general: result.error })
      }
    })()
  }, [])

  // Validate faculty email format
  const validateFacultyEmail = (email) => {
    const facultyEmailRegex = /^[a-zA-Z0-9._%+-]+@klh\.edu\.in$/i
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i
    return facultyEmailRegex.test(email.trim()) || gmailRegex.test(email.trim())
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateFacultyEmail(formData.email)) {
      newErrors.email = 'Email must be institutional (@klh.edu.in) or verified Gmail'
    }

    // Validate department
    if (!formData.department) {
      newErrors.department = 'Department is required'
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name,
          email: formData.email,
          password: formData.password,
          department: formData.department,
          role: 'faculty'
        })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', 'faculty')
        onNavigate('faculty-dashboard')
      } else {
        const error = await response.json()
        setErrors({ general: error.message || 'Signup failed' })
      }
    } catch (error) {
      setErrors({ general: 'Signup failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setLoading(true)
    try {
      const result = await signInWithGoogle()
      
      if (result.success && !result.redirect) {
        // Validate faculty email format
        if (!validateFacultyEmail(result.user.email)) {
          setErrors({ general: 'Please use your institutional email (@klh.edu.in) or verified Gmail' })
          setLoading(false)
          return
        }
        
        // Store user data
        localStorage.setItem('token', result.token)
        localStorage.setItem('role', 'faculty')
        localStorage.setItem('user', JSON.stringify(result.user))
        
        // Directly redirect to dashboard (no approval needed)
        onNavigate('faculty-dashboard')
      } else if (result.redirect) {
        // Redirect flow initiated; nothing else to do here
        return
      } else {
        setErrors({ general: result.error || 'Google Sign-up failed' })
      }
    } catch (error) {
      setErrors({ general: 'Google Sign-up failed. Please try again.' })
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

      {/* Signup Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-teal-500 to-teal-600">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#1e3a8a' }}>Faculty Sign Up</h2>
            <p className="text-slate-600">Create your faculty account</p>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {errors.general}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-lg border bg-white ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-teal-400'
                } focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Institutional Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="faculty@klh.edu.in"
                className={`w-full px-4 py-3 rounded-lg border bg-white ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-teal-400'
                } focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border bg-white ${
                  errors.department ? 'border-red-300 bg-red-50' : 'border-teal-400'
                } focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors`}
              >
                <option value="">Select your department</option>
                <option value="CSE">Computer Science Engineering</option>
                <option value="ECE">Electronics & Communication</option>
                <option value="EEE">Electrical & Electronics</option>
                <option value="MECH">Mechanical Engineering</option>
                <option value="CIVIL">Civil Engineering</option>
                <option value="IT">Information Technology</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">{errors.department}</p>
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
                placeholder="At least 6 characters"
                className={`w-full px-4 py-3 rounded-lg border bg-white ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-teal-400'
                } focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`w-full px-4 py-3 rounded-lg border bg-white ${
                  errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-teal-400'
                } focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Google Sign Up - only when Firebase is configured */}
          {isFirebaseConfigured() ? (
            <>
              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or sign up with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full py-3 px-4 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>
            </>
          ) : (
            <div className="mt-6 text-center text-sm text-slate-600">
              Google sign-up is disabled on this deployment. Please use email & password.
            </div>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login-faculty')}
              className="font-medium text-teal-600 hover:text-teal-800 transition-colors"
            >
              Login here
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
