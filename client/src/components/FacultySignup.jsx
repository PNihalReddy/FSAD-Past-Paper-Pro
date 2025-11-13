import { useState, useEffect } from 'react'
import { signUpWithEmail, getGoogleRedirectResult } from '../services/authService'

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

  // Allow any valid email for faculty
  const validateFacultyEmail = (email) => {
    const basicEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return basicEmail.test((email || '').trim())
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
