import { useState, useEffect } from 'react'
import { logOut } from '../services/authService'
import { getPapers } from '../services/paperService'

export default function StudentDashboard({ onNavigate }) {
  const [user, setUser] = useState(null)
  const [filters, setFilters] = useState({
    branch: '',
    year: '',
    semesterType: '', // 'odd' or 'even'
    semester: '', // Actual semester number (1-8)
    examType: '',
    subject: ''
  })
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(false)

  const loadAllPapers = async () => {
    console.log('🔄 loadAllPapers called')
    setLoading(true)
    try {
      console.log('📡 Fetching papers from API...')
      const papersData = await getPapers({})
      console.log('✅ Papers received:', papersData.length, papersData)
      const formattedPapers = papersData.map((paper, index) => ({
        id: paper._id || paper.id || `paper-${index}`,
        subject: paper.subject,
        semester: paper.semester,
        examType: paper.examType,
        year: paper.paperYear,
        uploadedBy: paper.facultyName || 'Faculty',
        fileUrl: paper.driveUrl || (paper.fileUrl ? `http://localhost:4000/${paper.fileUrl}` : '#'),
        paperTitle: paper.paperTitle,
        branch: paper.branch,
        studentYear: paper.studentYear
      }))
      console.log('✅ Formatted papers:', formattedPapers.length)
      setPapers(formattedPapers)
    } catch (error) {
      console.error('❌ Error loading papers:', error)
      setPapers([])
    } finally {
      setLoading(false)
    }
  }

  // Subject data based on branch, year, and semester
  const subjectData = {
    CSE: {
      1: {
        odd: ['Engineering Mathematics – I', 'Engineering Physics', 'Basic Electrical & Electronics Engineering', 'Programming for Problem Solving (C)', 'Engineering Graphics & Design', 'Environmental Studies'],
        even: ['Engineering Mathematics – II', 'Engineering Chemistry', 'Basic Mechanical Engineering', 'Data Structures', 'Engineering Workshop', 'English for Communication']
      },
      2: {
        odd: ['Discrete Mathematics', 'Computer Organization', 'Object Oriented Programming', 'Database Management Systems', 'Operating Systems', 'Software Engineering'],
        even: ['Probability & Statistics', 'Computer Networks', 'Web Technologies', 'Design & Analysis of Algorithms', 'Microprocessors', 'Theory of Computation']
      },
      3: {
        odd: ['Compiler Design', 'Machine Learning', 'Computer Graphics', 'Cryptography & Network Security', 'Cloud Computing', 'Artificial Intelligence'],
        even: ['Big Data Analytics', 'Internet of Things', 'Mobile Application Development', 'Blockchain Technology', 'Natural Language Processing', 'Deep Learning']
      },
      4: {
        odd: ['Advanced Algorithms', 'Distributed Systems', 'Software Testing', 'Cyber Security', 'Project Work – I'],
        even: ['DevOps', 'Quantum Computing', 'Edge Computing', 'Project Work – II']
      }
    },
    ECE: {
      1: {
        odd: ['Engineering Mathematics – I', 'Engineering Physics', 'Basic Electrical Engineering', 'Electronic Devices', 'Engineering Graphics', 'Environmental Studies'],
        even: ['Engineering Mathematics – II', 'Engineering Chemistry', 'Circuit Theory', 'Signals & Systems', 'Electronic Circuits', 'English for Communication']
      },
      2: {
        odd: ['Network Analysis', 'Electromagnetic Fields', 'Analog Communication', 'Digital Electronics', 'Microprocessors', 'Control Systems'],
        even: ['Digital Communication', 'VLSI Design', 'Embedded Systems', 'Digital Signal Processing', 'Antennas & Wave Propagation', 'Linear IC Applications']
      },
      3: {
        odd: ['Microwave Engineering', 'Optical Communication', 'Wireless Communication', 'ARM Microcontrollers', 'Information Theory & Coding', 'Digital Image Processing'],
        even: ['Satellite Communication', 'Mobile Communication', 'FPGA Design', 'Radar Systems', 'IoT Systems', 'RF Circuit Design']
      },
      4: {
        odd: ['5G Networks', 'Advanced Communication Systems', 'MEMS', 'Nanoelectronics', 'Project Work – I'],
        even: ['Optical Networks', 'Cognitive Radio', 'Biomedical Electronics', 'Project Work – II']
      }
    },
    AIDS: {
      1: {
        odd: ['Engineering Mathematics – I', 'Engineering Physics', 'Programming for Problem Solving (Python)', 'Introduction to AI', 'Engineering Graphics', 'Environmental Studies'],
        even: ['Engineering Mathematics – II', 'Statistics for Data Science', 'Data Structures', 'Database Management Systems', 'Web Technologies', 'English for Communication']
      },
      2: {
        odd: ['Discrete Mathematics', 'Machine Learning', 'Data Visualization', 'Object Oriented Programming', 'Operating Systems', 'Linear Algebra'],
        even: ['Probability & Statistics', 'Deep Learning', 'Big Data Analytics', 'Computer Networks', 'Natural Language Processing', 'Data Mining']
      },
      3: {
        odd: ['Artificial Intelligence', 'Neural Networks', 'Computer Vision', 'Cloud Computing', 'Reinforcement Learning', 'Time Series Analysis'],
        even: ['Advanced Machine Learning', 'Generative AI', 'MLOps', 'Explainable AI', 'Edge AI', 'Recommender Systems']
      },
      4: {
        odd: ['Advanced Deep Learning', 'AI Ethics', 'Quantum Machine Learning', 'AI for Healthcare', 'Project Work – I'],
        even: ['AI in Business', 'Automated Machine Learning', 'Federated Learning', 'Project Work – II']
      }
    }
  }

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    // Load papers directly with fetch
    console.log('🚀 Component mounted, fetching papers...')
    setLoading(true)
    fetch('/api/papers')
      .then(res => {
        console.log('📡 Response:', res.status, res.ok)
        return res.json()
      })
      .then(data => {
        console.log('✅ Papers received:', data.length)
        const formattedPapers = data.map((paper, index) => ({
          id: paper._id || paper.id || `paper-${index}`,
          subject: paper.subject,
          semester: paper.semester,
          examType: paper.examType,
          year: paper.paperYear,
          uploadedBy: paper.facultyName || 'Faculty',
          fileUrl: paper.driveUrl || (paper.fileUrl ? `http://localhost:4000/${paper.fileUrl}` : '#'),
          paperTitle: paper.paperTitle,
          branch: paper.branch,
          studentYear: paper.studentYear
        }))
        setPapers(formattedPapers)
        setLoading(false)
      })
      .catch(err => {
        console.error('❌ Error:', err)
        setLoading(false)
      })
  }, [])

  const handleLogout = async () => {
    await logOut()
    localStorage.clear()
    onNavigate('landing')
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [field]: value }
      
      // Calculate actual semester number based on year and semester type
      if (field === 'semesterType' && value && prev.year) {
        // Map: Year 1 Odd = Sem 1, Year 1 Even = Sem 2, Year 2 Odd = Sem 3, etc.
        const yearNum = parseInt(prev.year)
        const semesterNum = value === 'odd' ? (yearNum * 2 - 1) : (yearNum * 2)
        newFilters.semester = semesterNum.toString()
      } else if (field === 'year' && prev.semesterType) {
        // Recalculate semester when year changes
        const yearNum = parseInt(value)
        const semesterNum = prev.semesterType === 'odd' ? (yearNum * 2 - 1) : (yearNum * 2)
        newFilters.semester = semesterNum.toString()
      }
      
      // Reset dependent filters
      if (field === 'branch') {
        newFilters.year = ''
        newFilters.semesterType = ''
        newFilters.semester = ''
        newFilters.examType = ''
        newFilters.subject = ''
      } else if (field === 'year') {
        newFilters.semesterType = ''
        newFilters.semester = ''
        newFilters.examType = ''
        newFilters.subject = ''
      } else if (field === 'semesterType') {
        newFilters.examType = ''
        newFilters.subject = ''
      } else if (field === 'examType') {
        newFilters.subject = ''
      }
      
      return newFilters
    })
  }

  const getSubjects = () => {
    if (!filters.branch || !filters.year || !filters.semesterType) return []
    return subjectData[filters.branch]?.[filters.year]?.[filters.semesterType] || []
  }

  const searchPapers = async () => {
    setLoading(true)
    try {
      // Build filter object - only include non-empty filters
      const filterParams = {}
      if (filters.branch) filterParams.branch = filters.branch
      // Convert year number to format "1st Year", "2nd Year", etc.
      if (filters.year) {
        const yearNum = parseInt(filters.year)
        const suffix = yearNum === 1 ? 'st' : yearNum === 2 ? 'nd' : yearNum === 3 ? 'rd' : 'th'
        filterParams.studentYear = `${yearNum}${suffix} Year`
      }
      if (filters.semester) filterParams.semester = filters.semester
      if (filters.subject) filterParams.subject = filters.subject
      if (filters.examType) filterParams.examType = filters.examType

      console.log('🔍 Search filters:', filterParams)
      
      // Use paperService to fetch papers with correct parameters
      const papersData = await getPapers(filterParams)
      console.log('📄 Papers found:', papersData.length)
      
      // Transform papers data to match display format
      const formattedPapers = papersData.map((paper, index) => ({
        id: paper._id || paper.id || `paper-${index}`,
        subject: paper.subject,
        semester: paper.semester,
        examType: paper.examType,
        year: paper.paperYear,
        uploadedBy: paper.facultyName || 'Faculty',
        fileUrl: paper.driveUrl || (paper.fileUrl ? `http://localhost:4000/${paper.fileUrl}` : '#'),
        paperTitle: paper.paperTitle,
        branch: paper.branch,
        studentYear: paper.studentYear
      }))
      
      setPapers(formattedPapers)
    } catch (error) {
      console.error('Error fetching papers:', error)
      setPapers([])
      alert('Failed to fetch papers. Please try again.')
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

      {/* Navbar */}
      <nav className="relative z-10 bg-white/90 backdrop-blur-sm shadow-sm border-b border-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(to bottom right, #38bdf8, #1e3a8a)' }}>
                <span className="text-white font-bold text-xl">PP</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold" style={{color: '#1e3a8a'}}>Student Dashboard</span>
                <span className="text-xs text-black">Welcome, {user?.displayName || user?.email?.split('@')[0]}</span>
              </div>
            </div>
            
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-colors shadow-sm"
              style={{backgroundColor: '#1e3a8a'}}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Action Button */}
        <div className="mb-6 text-center">
          <button
            onClick={loadAllPapers}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Loading...' : '📚 Show All Papers'}
          </button>
          <p className="text-sm text-black mt-2">Click to view all {papers.length} available papers</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-slate-200">
          <h2 className="text-2xl font-bold mb-6 text-black">Find Question Papers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Branch */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Branch</label>
              <select
                value={filters.branch}
                onChange={(e) => handleFilterChange('branch', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-blue-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select Branch</option>
                <option value="CSE">Computer Science Engineering</option>
                <option value="ECE">Electronics & Communication</option>
                <option value="AIDS">AI & Data Science</option>
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Year</label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                disabled={!filters.branch}
                className="w-full px-4 py-3 rounded-lg border border-blue-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            {/* Semester Type */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Semester Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange('semesterType', 'odd')}
                  disabled={!filters.year}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                    filters.semesterType === 'odd'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-blue-400 text-black hover:bg-blue-50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Odd Sem
                </button>
                <button
                  onClick={() => handleFilterChange('semesterType', 'even')}
                  disabled={!filters.year}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                    filters.semesterType === 'even'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-blue-400 text-black hover:bg-blue-50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Even Sem
                </button>
              </div>
            </div>

            {/* Exam Type */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Exam Type</label>
              <select
                value={filters.examType}
                onChange={(e) => handleFilterChange('examType', e.target.value)}
                disabled={!filters.semesterType}
                className="w-full px-4 py-3 rounded-lg border border-blue-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Exam Type</option>
                <option value="In-Sem 1">In-Sem 1</option>
                <option value="In-Sem 2">In-Sem 2</option>
                <option value="End-Sem">End-Sem</option>
                <option value="Quiz">Quiz</option>
                <option value="Assignment">Assignment</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Subject</label>
              <select
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
                disabled={!filters.examType}
                className="w-full px-4 py-3 rounded-lg border border-blue-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Subject</option>
                {getSubjects().map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={searchPapers}
                disabled={!filters.subject || loading}
                className="w-full px-6 py-3 text-white font-medium rounded-lg transition-colors shadow-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{backgroundColor: '#1e3a8a'}}
              >
                {loading ? 'Searching...' : 'Search Papers'}
              </button>
            </div>
          </div>
        </div>

        {/* Papers List */}
        {papers.length > 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200">
            <h3 className="text-xl font-bold mb-4 text-black">
              Available Papers ({papers.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {papers.map((paper) => (
                <div key={paper.id} className="bg-white border border-blue-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg mb-2 text-black">{paper.paperTitle || paper.subject}</h4>
                  <div className="space-y-1 text-sm text-black mb-4">
                    <p><strong>Subject:</strong> {paper.subject}</p>
                    <p><strong>Branch:</strong> {paper.branch}</p>
                    <p><strong>Year:</strong> {paper.studentYear}</p>
                    <p><strong>Semester:</strong> {paper.semester}</p>
                    <p><strong>Exam Type:</strong> {paper.examType}</p>
                    <p><strong>Paper Year:</strong> {paper.year}</p>
                    <p><strong>Uploaded by:</strong> {paper.uploadedBy}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (paper.fileUrl && paper.fileUrl !== '#') {
                        window.open(paper.fileUrl, '_blank')
                      }
                    }}
                    className="w-full px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                    style={{backgroundColor: '#1e3a8a', ':hover': {backgroundColor: '#1e40af'}}}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View & Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !loading && filters.subject && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-slate-200 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-bold text-black mb-2">No Papers Found</h3>
              <p className="text-black">No question papers available for the selected filters. Try different options or check back later.</p>
            </div>
          )
        )}
      </main>
    </div>
  )
}

