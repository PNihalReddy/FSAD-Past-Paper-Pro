import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

console.log('main.jsx loaded')
console.log('root element:', document.getElementById('root'))

try {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  console.log('React app rendered successfully')
} catch (error) {
  console.error('Error rendering React app:', error)
  document.body.innerHTML = '<div style="color: white; padding: 20px;">Error: ' + error.message + '</div>'
}
