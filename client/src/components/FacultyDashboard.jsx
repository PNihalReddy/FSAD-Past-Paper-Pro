import { useState, useEffect } from 'react'
import { logOut } from '../services/authService'
import { uploadPaper, getMyPapers, getPapers, updatePaper, deletePaper, bulkDeletePapers } from '../services/paperService'
import DevModeBanner from './DevModeBanner'

export default function FacultyDashboard({ onNavigate }) {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('upload') // 'upload', 'mypapers', 'allpapers', 'admin'
  const [uploadForm, setUploadForm] = useState({
    examType: '',
    subject: '',
    studentYear: '',
    paperYear: new Date().getFullYear(),
    branch: '',
    semester: '',
    semesterType: '', // Even Sem or Odd Sem
    academicYear: '',
    paperTitle: '',
    driveUrl: '',
    file: null
  })
  const [myPapers, setMyPapers] = useState([])
  const [allPapers, setAllPapers] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [editingPaper, setEditingPaper] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    branch: '',
    year: '',
    subject: '',
    semester: ''
  })

  const branches = ['CSE', 'ECE', 'AIDS', 'EEE', 'MECH', 'CIVIL']
  const examTypes = ['In-Sem 1', 'In-Sem 2', 'End-Sem', 'Quiz', 'Assignment']
  const years = [
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' }
  ]
  const semesterTypes = ['Even Sem', 'Odd Sem']
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8']

  // Subject lists by branch
  const subjectsByBranch = {
    CSE: ['Engineering Mathematics', 'Data Structures', 'Algorithms', 'Database Management Systems', 'Operating Systems', 'Computer Networks', 'Machine Learning', 'Artificial Intelligence', 'Cloud Computing', 'Web Technologies'],
    ECE: ['Circuit Theory', 'Electronic Devices', 'Digital Electronics', 'Signals & Systems', 'Communication Systems', 'Microprocessors', 'VLSI Design', 'Embedded Systems', 'Wireless Communication', 'Optical Communication'],
    AIDS: ['Python Programming', 'Statistics', 'Machine Learning', 'Deep Learning', 'Data Visualization', 'Big Data Analytics', 'Natural Language Processing', 'Computer Vision', 'Neural Networks', 'AI Ethics'],
    EEE: ['Electrical Circuits', 'Power Systems', 'Control Systems', 'Electrical Machines', 'Power Electronics', 'Renewable Energy', 'High Voltage Engineering'],
    MECH: ['Thermodynamics', 'Fluid Mechanics', 'Manufacturing Technology', 'Machine Design', 'Heat Transfer', 'Automobile Engineering'],
    CIVIL: ['Structural Analysis', 'Concrete Technology', 'Geotechnical Engineering', 'Transportation Engineering', 'Environmental Engineering', 'Surveying']
  }

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      fetchMyPapers()
      fetchAllPapers()
    }
  }, [])

  const fetchMyPapers = async () => {
    try {
      if (user?.uid) {
        const data = await getMyPapers(user.uid)
        setMyPapers(data)
      } else {
        setMyPapers([])
      }
    } catch (error) {
      console.error('Error fetching papers:', error)
      setMyPapers([])
    }
  }

  const handleLogout = async () => {
    await logOut()
    localStorage.clear()
    onNavigate('landing')
  }

  const handleFormChange = (field, value) => {
    setUploadForm(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setUploadForm(prev => ({ ...prev, file }))
    } else {
      alert('Please select a PDF file')
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!uploadForm.file && !uploadForm.driveUrl) {
      alert('Please either upload a PDF file or provide a Google Drive URL')
      return
    }

    // Field name mapping for user-friendly error messages
    const fieldNames = {
      'examType': 'Exam Type',
      'subject': 'Subject',
      'studentYear': 'Student Year',
      'branch': 'Branch',
      'semester': 'Semester',
      'semesterType': 'Semester Type',
      'academicYear': 'Academic Year',
      'paperTitle': 'Paper Title'
    }

    const requiredFields = ['examType', 'subject', 'studentYear', 'branch', 'semester', 'semesterType', 'academicYear', 'paperTitle']
    const missingFields = requiredFields.filter(field => !uploadForm[field])
    
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(field => fieldNames[field] || field).join(', ')
      alert(`Please fill all required fields. Missing: ${missingFieldNames}`)
      return
    }

    setLoading(true)
    try {
      console.log('📤 Starting paper upload...')
      console.log('📋 Form data:', {
        paperTitle: uploadForm.paperTitle,
        branch: uploadForm.branch,
        studentYear: uploadForm.studentYear,
        semester: uploadForm.semester,
        semesterType: uploadForm.semesterType,
        subject: uploadForm.subject,
        examType: uploadForm.examType,
        paperYear: uploadForm.paperYear,
        academicYear: uploadForm.academicYear,
        hasFile: !!uploadForm.file,
        hasDriveUrl: !!uploadForm.driveUrl,
        facultyId: user?.uid
      })

      const formData = new FormData()
      if (uploadForm.file) {
        formData.append('file', uploadForm.file)
        console.log('📎 File attached:', uploadForm.file.name, `(${(uploadForm.file.size / 1024 / 1024).toFixed(2)} MB)`)
      }
      formData.append('paperTitle', uploadForm.paperTitle)
      formData.append('examType', uploadForm.examType)
      formData.append('subject', uploadForm.subject)
      formData.append('studentYear', uploadForm.studentYear)
      formData.append('paperYear', uploadForm.paperYear)
      formData.append('branch', uploadForm.branch)
      formData.append('semester', uploadForm.semester)
      formData.append('semesterType', uploadForm.semesterType)
      formData.append('academicYear', uploadForm.academicYear)
      formData.append('driveUrl', uploadForm.driveUrl || '')
      formData.append('facultyId', user?.uid || '')
      formData.append('facultyName', user?.displayName || user?.email || '')
      formData.append('facultyEmail', user?.email || '')

      let result
      if (editingPaper) {
        console.log('✏️ Updating paper:', editingPaper.id || editingPaper._id)
        result = await updatePaper(editingPaper.id || editingPaper._id, formData)
      } else {
        console.log('📤 Uploading new paper...')
        result = await uploadPaper(formData)
      }

      console.log('✅ Upload successful:', result)

      setUploadSuccess(true)
      setEditingPaper(null)
      // Reset form
      setUploadForm({
        examType: '',
        subject: '',
        studentYear: '',
        paperYear: new Date().getFullYear(),
        branch: '',
        semester: '',
        semesterType: '',
        academicYear: '',
        paperTitle: '',
        driveUrl: '',
        file: null
      })
      // Refresh papers list
      fetchMyPapers()
      fetchAllPapers()
      setTimeout(() => setUploadSuccess(false), 3000)
    } catch (error) {
      console.error('❌ Upload error:', error)
      
      // Extract detailed error message
      let errorMessage = 'Upload failed. Please try again.'
      
      if (error.message) {
        errorMessage = error.message
      } else if (error.error) {
        errorMessage = error.error
      } else if (typeof error === 'string') {
        errorMessage = error
      }

      // Check for network errors
      if (error.message && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
        errorMessage = 'Network error: Could not connect to server. Please check if the server is running on http://localhost:4000'
      }

      // Check for MongoDB errors
      if (errorMessage.includes('MongoDB') || errorMessage.includes('connection')) {
        errorMessage = 'Database connection error: Please ensure MongoDB is connected. Check server logs for details.'
      }

      alert(`${editingPaper ? 'Update' : 'Upload'} failed: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllPapers = async () => {
    try {
      const data = await getPapers()
      setAllPapers(data)
    } catch (error) {
      console.error('Error fetching all papers:', error)
      setAllPapers([])
    }
  }

  const handleEdit = (paper) => {
    setEditingPaper(paper)
    setUploadForm({
      examType: paper.examType,
      subject: paper.subject,
      studentYear: paper.studentYear,
      paperYear: paper.paperYear,
      branch: paper.branch,
      semester: paper.semester,
      semesterType: paper.semesterType || '',
      academicYear: paper.academicYear,
      paperTitle: paper.paperTitle || '',
      driveUrl: paper.driveUrl || '',
      file: null
    })
    setActiveTab('upload')
  }

  const cancelEdit = () => {
    setEditingPaper(null)
    setUploadForm({
      examType: '',
      subject: '',
      studentYear: '',
      paperYear: new Date().getFullYear(),
      branch: '',
      semester: '',
      semesterType: '',
      academicYear: '',
      paperTitle: '',
      driveUrl: '',
      file: null
    })
  }

  const handleDelete = async (paperId) => {
    if (!confirm('Are you sure you want to delete this paper?')) return

    try {
      await deletePaper(paperId)
      setMyPapers(prev => prev.filter(p => (p.id || p._id) !== paperId))
      setAllPapers(prev => prev.filter(p => (p.id || p._id) !== paperId))
      alert('Paper deleted successfully')
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete paper')
    }
  }

  const [selectedPapers, setSelectedPapers] = useState([])

  const togglePaperSelection = (paperId) => {
    setSelectedPapers(prev => 
      prev.includes(paperId) 
        ? prev.filter(id => id !== paperId)
        : [...prev, paperId]
    )
  }

  const handleBulkDelete = async () => {
    if (selectedPapers.length === 0) {
      alert('Please select papers to delete')
      return
    }

    if (!confirm(`Are you sure you want to delete ${selectedPapers.length} paper(s)?`)) return

    try {
      await bulkDeletePapers(selectedPapers)
      setAllPapers(prev => prev.filter(p => !selectedPapers.includes(p.id || p._id)))
      setMyPapers(prev => prev.filter(p => !selectedPapers.includes(p.id || p._id)))
      setSelectedPapers([])
      alert('Papers deleted successfully')
    } catch (error) {
      console.error('Bulk delete error:', error)
      alert('Failed to delete papers')
    }
  }

  const getFilteredPapers = (papers) => {
    return papers.filter(paper => {
      const matchesSearch = searchQuery === '' || 
        (paper.paperTitle && paper.paperTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (paper.uploadedBy && paper.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesBranch = filters.branch === '' || paper.branch === filters.branch
      const matchesYear = filters.year === '' || paper.studentYear === filters.year
      const matchesSubject = filters.subject === '' || paper.subject === filters.subject
      const matchesSemester = filters.semester === '' || paper.semester === filters.semester

      return matchesSearch && matchesBranch && matchesYear && matchesSubject && matchesSemester
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-100 to-pink-100 relative overflow-hidden">
      {/* Testing Mode Banner */}
      <DevModeBanner />
      
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
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-800 to-blue-900">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold" style={{color: '#1e3a8a'}}>Faculty Dashboard</span>
                <span className="text-xs text-slate-600">Welcome, {user?.displayName || user?.email?.split('@')[0]}</span>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-colors shadow-sm bg-blue-900"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'bg-blue-900 text-white shadow-lg'
                : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {editingPaper ? 'Edit Paper' : 'Upload Paper'}
          </button>
          <button
            onClick={() => setActiveTab('mypapers')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'mypapers'
                ? 'bg-blue-900 text-white shadow-lg'
                : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            My Papers ({myPapers.length})
          </button>
          <button
            onClick={() => setActiveTab('allpapers')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'allpapers'
                ? 'bg-blue-900 text-white shadow-lg'
                : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            All Papers ({allPapers.length})
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'admin'
                ? 'bg-blue-900 text-white shadow-lg'
                : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin Tools
          </button>
        </div>

        {/* Upload Form */}
        {activeTab === 'upload' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{color: '#1e3a8a'}}>
                {editingPaper ? '✏️ Edit Question Paper' : '📤 Upload Question Paper'}
              </h2>
              {editingPaper && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 text-sm bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>
            
            {uploadSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {editingPaper ? 'Paper updated successfully!' : 'Paper uploaded successfully!'}
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Paper Title */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Paper Title *</label>
                  <input
                    type="text"
                    value={uploadForm.paperTitle}
                    onChange={(e) => handleFormChange('paperTitle', e.target.value)}
                    placeholder="e.g., Machine Learning End Semester Exam 2023"
                    className="w-full px-4 py-3 rounded-lg border border-blue-900 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  />
                </div>
                {/* Branch */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Branch *</label>
                  <select
                    value={uploadForm.branch}
                    onChange={(e) => handleFormChange('branch', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-blue-900 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  >
                    <option value="" className="text-black">Select Branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch} className="text-black">{branch}</option>
                    ))}
                  </select>
                </div>

                {/* Student Year */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Student Year *</label>
                  <select
                    value={uploadForm.studentYear}
                    onChange={(e) => handleFormChange('studentYear', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-blue-900 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  >
                    <option value="" className="text-black">Select Year</option>
                    {years.map(year => (
                      <option key={year.value} value={year.value} className="text-black">{year.label}</option>
                    ))}
                  </select>
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Semester *</label>
                  <select
                    value={uploadForm.semester}
                    onChange={(e) => handleFormChange('semester', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-blue-900 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  >
                    <option value="" className="text-black">Select Semester</option>
                    {semesters.map(sem => (
                      <option key={sem} value={sem} className="text-black">Semester {sem}</option>
                    ))}
                  </select>
                </div>

                {/* Semester Type (Even/Odd) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Semester Type *</label>
                  <select
                    value={uploadForm.semesterType}
                    onChange={(e) => handleFormChange('semesterType', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-blue-900 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  >
                    <option value="" className="text-black">Select Semester Type</option>
                    {semesterTypes.map(type => (
                      <option key={type} value={type} className="text-black">{type}</option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
                  <select
                    value={uploadForm.subject}
                    onChange={(e) => handleFormChange('subject', e.target.value)}
                    disabled={!uploadForm.branch}
                    className="w-full px-4 py-3 rounded-lg border border-blue-900 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-900 disabled:opacity-50"
                    required
                  >
                    <option value="" className="text-black">Select Subject</option>
                    {uploadForm.branch && subjectsByBranch[uploadForm.branch]?.map(subject => (
                      <option key={subject} value={subject} className="text-black">{subject}</option>
                    ))}
                  </select>
                </div>

                {/* Exam Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Exam Type *</label>
                  <select
                    value={uploadForm.examType}
                    onChange={(e) => handleFormChange('examType', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-blue-900 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  >
                    <option value="" className="text-black">Select Exam Type</option>
                    {examTypes.map(type => (
                      <option key={type} value={type} className="text-black">{type}</option>
                    ))}
                  </select>
                </div>

                {/* Paper Year */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Question Paper Year *</label>
                  <input
                    type="number"
                    value={uploadForm.paperYear}
                    onChange={(e) => handleFormChange('paperYear', e.target.value)}
                    min="2000"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-3 rounded-lg border border-blue-900 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  />
                </div>

                {/* Academic Year */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Academic Year *</label>
                  <input
                    type="text"
                    value={uploadForm.academicYear}
                    onChange={(e) => handleFormChange('academicYear', e.target.value)}
                    placeholder="e.g., 2023-24"
                    className="w-full px-4 py-3 rounded-lg border border-blue-900 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  />
                </div>

                {/* Google Drive URL */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Google Drive URL (Optional - if not uploading file)
                  </label>
                  <input
                    type="url"
                    value={uploadForm.driveUrl}
                    onChange={(e) => handleFormChange('driveUrl', e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full px-4 py-3 rounded-lg border border-blue-900 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    💡 Provide a shareable Google Drive link OR upload a PDF file below
                  </p>
                </div>

                {/* File Upload */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload PDF {!uploadForm.driveUrl && '*'}
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 rounded-lg border border-blue-900 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                  {uploadForm.file && (
                    <p className="mt-2 text-sm text-blue-900 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {uploadForm.file.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (editingPaper ? 'Updating...' : 'Uploading...') : (editingPaper ? 'Update Paper' : 'Upload Paper')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* My Papers List */}
        {activeTab === 'mypapers' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200">
            <h2 className="text-2xl font-bold mb-6" style={{color: '#1e3a8a'}}>My Uploaded Papers</h2>
            
            {myPapers.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-slate-600">No papers uploaded yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-300">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Paper Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Branch</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Year</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Subject</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Exam Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Upload Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPapers.map((paper) => (
                      <tr key={paper.id || paper._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-slate-800">{paper.paperTitle || paper.subject}</td>
                        <td className="py-3 px-4">{paper.branch}</td>
                        <td className="py-3 px-4">{paper.studentYear}</td>
                        <td className="py-3 px-4">{paper.subject}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {paper.examType}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600">{paper.uploadedAt}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(paper)}
                              className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors flex items-center gap-1"
                              title="Edit Paper"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            {paper.driveUrl && (
                              <button
                                onClick={() => window.open(paper.driveUrl, '_blank')}
                                className="px-3 py-1 text-sm bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors flex items-center gap-1"
                                title="View/Download"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(paper.id || paper._id)}
                              className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors flex items-center gap-1"
                              title="Delete Paper"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* All Papers Tab */}
        {activeTab === 'allpapers' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200">
            <h2 className="text-2xl font-bold mb-6" style={{color: '#1e3a8a'}}>All Papers (Admin View)</h2>
            
            {/* Search & Filter */}
            <div className="mb-6 space-y-4">
              {/* Search Bar */}
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search by title, subject, or faculty name..."
                  className="w-full px-4 py-3 rounded-lg border border-blue-900 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <select
                  value={filters.branch}
                  onChange={(e) => setFilters(prev => ({ ...prev, branch: e.target.value }))}
                  className="px-4 py-2 rounded-lg border border-blue-900 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="" className="text-black">All Branches</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch} className="text-black">{branch}</option>
                  ))}
                </select>

                <select
                  value={filters.year}
                  onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                  className="px-4 py-2 rounded-lg border border-blue-900 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="" className="text-black">All Years</option>
                  {years.map(year => (
                    <option key={year.value} value={year.value} className="text-black">{year.label}</option>
                  ))}
                </select>

                <select
                  value={filters.semester}
                  onChange={(e) => setFilters(prev => ({ ...prev, semester: e.target.value }))}
                  className="px-4 py-2 rounded-lg border border-blue-900 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="" className="text-black">All Semesters</option>
                  {semesters.map(sem => (
                    <option key={sem} value={sem} className="text-black">Semester {sem}</option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    setFilters({ branch: '', year: '', subject: '', semester: '' })
                    setSearchQuery('')
                  }}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Clear Filters
                </button>
              </div>

              {/* Bulk Actions */}
              {selectedPapers.length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <span className="text-sm font-medium text-amber-800">
                    {selectedPapers.length} paper(s) selected
                  </span>
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Delete Selected
                  </button>
                  <button
                    onClick={() => setSelectedPapers([])}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm"
                  >
                    Deselect All
                  </button>
                </div>
              )}
            </div>

            {/* Papers Table */}
            {getFilteredPapers(allPapers).length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-slate-600">No papers found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-300">
                      <th className="text-left py-3 px-4">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPapers(getFilteredPapers(allPapers).map(p => p.id || p._id))
                            } else {
                              setSelectedPapers([])
                            }
                          }}
                          checked={selectedPapers.length === getFilteredPapers(allPapers).length && getFilteredPapers(allPapers).length > 0}
                          className="w-4 h-4"
                        />
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Paper Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Branch</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Year</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Subject</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Exam Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Uploaded By</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredPapers(allPapers).map((paper) => {
                      const paperId = paper.id || paper._id
                      return (
                      <tr key={paperId} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedPapers.includes(paperId)}
                            onChange={() => togglePaperSelection(paperId)}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800">{paper.paperTitle || paper.subject}</td>
                        <td className="py-3 px-4">{paper.branch}</td>
                        <td className="py-3 px-4">{paper.studentYear}</td>
                        <td className="py-3 px-4">{paper.subject}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {paper.examType}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600">{paper.uploadedBy}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(paper)}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                              title="Edit"
                            >
                              ✏️
                            </button>
                            {paper.driveUrl && (
                              <button
                                onClick={() => window.open(paper.driveUrl, '_blank')}
                                className="px-2 py-1 text-xs bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors"
                                title="View"
                              >
                                👁️
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(paperId)}
                              className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Admin Tools Tab */}
        {activeTab === 'admin' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200">
            <h2 className="text-2xl font-bold mb-6" style={{color: '#1e3a8a'}}>🛠️ Admin Tools</h2>
            
            {/* Statistics */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-slate-700">📊 Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600">{allPapers.length}</div>
                  <div className="text-sm text-blue-700">Total Papers</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600">{allPapers.filter(p => p.branch === 'CSE').length}</div>
                  <div className="text-sm text-green-700">CSE Papers</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600">{allPapers.filter(p => p.branch === 'ECE').length}</div>
                  <div className="text-sm text-purple-700">ECE Papers</div>
                </div>
              </div>
            </div>

            {/* Demo Paper Scanner */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-700">🔍 Demo Paper Scanner</h3>
              <p className="text-sm text-slate-600 mb-4">
                Scan for papers with "demo", "test", or "sample" in the title
              </p>
              <button
                onClick={() => {
                  const demoKeywords = ['demo', 'test', 'sample']
                  const demoPapers = allPapers.filter(paper => 
                    demoKeywords.some(keyword => 
                      paper.paperTitle?.toLowerCase().includes(keyword) ||
                      paper.subject?.toLowerCase().includes(keyword)
                    )
                  )
                  if (demoPapers.length > 0) {
                    setSelectedPapers(demoPapers.map(p => p.id || p._id))
                    setActiveTab('allpapers')
                    alert(`Found ${demoPapers.length} demo paper(s). They are now selected in the All Papers tab.`)
                  } else {
                    alert('No demo papers found!')
                  }
                }}
                className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Scan for Demo Papers
              </button>
            </div>

            {/* System Info */}
            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-700 mb-2">ℹ️ System Information</h4>
              <div className="text-sm text-slate-600 space-y-1">
                <p>• Total Papers: {allPapers.length}</p>
                <p>• Your Papers: {myPapers.length}</p>
                <p>• Last Updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
