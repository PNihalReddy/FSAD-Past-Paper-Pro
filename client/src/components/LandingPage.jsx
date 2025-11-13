import { useState } from 'react'

export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-100 to-pink-100 relative overflow-hidden">
      {/* Soft Anime Sky Background with Clouds */}
      <div className="absolute inset-0">
        {/* Soft Cloud Patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="cloud-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            </filter>
          </defs>
          {/* Faint white clouds */}
          <ellipse cx="15%" cy="20%" rx="120" ry="50" fill="white" filter="url(#cloud-blur)" opacity="0.7"/>
          <ellipse cx="18%" cy="22%" rx="80" ry="35" fill="white" filter="url(#cloud-blur)" opacity="0.6"/>
          
          <ellipse cx="65%" cy="15%" rx="140" ry="60" fill="white" filter="url(#cloud-blur)" opacity="0.6"/>
          <ellipse cx="68%" cy="18%" rx="90" ry="40" fill="white" filter="url(#cloud-blur)" opacity="0.5"/>
          
          <ellipse cx="85%" cy="35%" rx="100" ry="45" fill="white" filter="url(#cloud-blur)" opacity="0.5"/>
          
          <ellipse cx="25%" cy="75%" rx="110" ry="50" fill="white" filter="url(#cloud-blur)" opacity="0.6"/>
          <ellipse cx="28%" cy="77%" rx="70" ry="30" fill="white" filter="url(#cloud-blur)" opacity="0.5"/>
          
          <ellipse cx="70%" cy="80%" rx="130" ry="55" fill="white" filter="url(#cloud-blur)" opacity="0.6"/>
          <ellipse cx="73%" cy="82%" rx="85" ry="38" fill="white" filter="url(#cloud-blur)" opacity="0.5"/>
        </svg>
        
        {/* Soft gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/20 via-transparent to-pink-50/30"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 bg-white/90 backdrop-blur-sm shadow-sm border-b border-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Text Based */}
            <div className="flex items-center gap-3">
              {/* Text-based logo placeholder */}
              <div className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(to bottom right, #38bdf8, #1e3a8a)' }}>
                <span className="text-white font-bold text-xl">PP</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold" style={{color: '#1e3a8a'}}>Past Paper Pro</span>
                <span className="text-xs text-slate-600">Previous Year Question Papers</span>
              </div>
            </div>
            
            {/* Auth Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => onNavigate('student-login')}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => onNavigate('signup-student')}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-colors shadow-sm"
                style={{backgroundColor: '#1e3a8a'}}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Hero Text */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight" style={{color: '#1e3a8a'}}>
              Access Previous Year Papers
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                Easily & Efficiently
              </span>
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              A comprehensive platform for students and faculty to share and access academic resources
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-8 py-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3" style={{backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)'}}>
                <svg className="w-8 h-8" style={{color: '#38bdf8'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-700">Organized</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3" style={{backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)'}}>
                <svg className="w-8 h-8" style={{color: '#38bdf8'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-700">Searchable</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3" style={{backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)'}}>
                <svg className="w-8 h-8" style={{color: '#38bdf8'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-700">Secure</span>
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-8">
            {/* Student Card */}
            <div 
              onClick={() => onNavigate('student-login')}
              className="group cursor-pointer bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-white/50 hover:border-blue-400 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold" style={{color: '#1e3a8a'}}>Student</h3>
                <p className="text-slate-700 text-center">
                  Access and download previous year question papers for your courses
                </p>
                <button className="mt-4 px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-colors shadow-md group-hover:shadow-lg" style={{backgroundColor: '#1e3a8a'}}>
                  Login / Sign Up
                </button>
              </div>
            </div>

            {/* Faculty Card */}
            <div 
              onClick={() => onNavigate('faculty-login')}
              className="group cursor-pointer bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-white/50 hover:border-teal-400 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold" style={{color: '#1e3a8a'}}>Faculty</h3>
                <p className="text-slate-700 text-center">
                  Upload and manage question papers for your students
                </p>
                <button className="mt-4 px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md group-hover:shadow-lg">
                  Login / Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 bg-white/70 backdrop-blur-sm border-t border-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-slate-600">
            <p>© 2024 Past Paper Pro. All rights reserved.</p>
            <p className="mt-1">Developed for academic excellence</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
