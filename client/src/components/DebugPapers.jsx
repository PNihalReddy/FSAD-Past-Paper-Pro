import { useState, useEffect } from 'react'

export default function DebugPapers() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('🔍 Starting to fetch papers...')
    fetch('/api/papers')
      .then(response => {
        console.log('📡 Response received:', response.status, response.ok)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        return response.json()
      })
      .then(papers => {
        console.log('✅ Papers loaded:', papers.length, papers)
        setData(papers)
        setLoading(false)
      })
      .catch(err => {
        console.error('❌ Error:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div style={{padding: 20, fontSize: 20}}>Loading...</div>
  if (error) return <div style={{padding: 20, fontSize: 20, color: 'red'}}>Error: {error}</div>

  return (
    <div style={{padding: 20, backgroundColor: 'white'}}>
      <h1 style={{fontSize: 24, marginBottom: 20, color: 'black'}}>Debug: Papers Found: {data?.length || 0}</h1>
      {data && data.slice(0, 5).map((paper, i) => (
        <div key={i} style={{border: '1px solid black', padding: 10, marginBottom: 10, color: 'black'}}>
          <p><strong>ID:</strong> {paper._id}</p>
          <p><strong>Title:</strong> {paper.paperTitle}</p>
          <p><strong>Branch:</strong> {paper.branch}</p>
          <p><strong>Subject:</strong> {paper.subject}</p>
        </div>
      ))}
    </div>
  )
}
