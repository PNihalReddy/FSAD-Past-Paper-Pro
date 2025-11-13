import { useState } from 'react'
import LandingPage from './components/LandingPage'
import StudentLogin from './components/StudentLogin'
import FacultyLogin from './components/FacultyLogin'
import StudentSignup from './components/StudentSignup'
import FacultySignup from './components/FacultySignup'
import StudentDashboard from './components/StudentDashboard'
import FacultyDashboard from './components/FacultyDashboard'
import DevModeBanner from './components/DevModeBanner'
import DebugPapers from './components/DebugPapers'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const handleNavigate = (page) => {
    setCurrentPage(page)
    console.log('Navigating to:', page)
  }

  // Route to different pages
  switch (currentPage) {
    case 'landing':
      return (
        <>
          <DevModeBanner />
          <LandingPage onNavigate={handleNavigate} />
        </>
      )
    
    case 'student-login':
    case 'login-student':
      return (
        <>
          <DevModeBanner />
          <StudentLogin onNavigate={handleNavigate} />
        </>
      )
    
    case 'faculty-login':
    case 'login-faculty':
      return (
        <>
          <DevModeBanner />
          <FacultyLogin onNavigate={handleNavigate} />
        </>
      )
    
    case 'signup-student':
      return (
        <>
          <DevModeBanner />
          <StudentSignup onNavigate={handleNavigate} />
        </>
      )
    
    case 'signup-faculty':
      return (
        <>
          <DevModeBanner />
          <FacultySignup onNavigate={handleNavigate} />
        </>
      )
    
    case 'student-dashboard':
      return <StudentDashboard onNavigate={handleNavigate} />
    
    case 'faculty-dashboard':
      return <FacultyDashboard onNavigate={handleNavigate} />
    
    default:
      // Placeholder for other pages
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              {currentPage.toUpperCase()} Page
            </h1>
            <p className="text-slate-600 mb-4">This page will be implemented next</p>
            <button 
              onClick={() => handleNavigate('landing')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      )
  }
}
