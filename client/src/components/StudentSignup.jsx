import { useState } from 'react'
import { signUpWithEmail } from '../services/authService'
import { isAllowedStudentEmail } from '../config/authRules'

export default function StudentSignup({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
          role: 'student'
        })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', 'student')
        localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email }))
        onNavigate('student-dashboard')
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
        // Redirect flow initiated
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
              <div className="h-16 w-16 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(to bottom right, #38bdf8, #1e3a8a)' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#1e3a8a' }}>Student Sign Up</h2>
            <p className="text-slate-600">Create your account</p>
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
                  errors.name ? 'border-red-300 bg-red-50' : 'border-blue-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

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
                placeholder="At least 6 characters"
                className={`w-full px-4 py-3 rounded-lg border bg-white ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-blue-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
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
                  errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-blue-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-white font-medium rounded-lg transition-colors shadow-md hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#1e3a8a' }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>


          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login-student')}
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
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
