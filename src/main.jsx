import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white '>
    <App />
    </div>
  </StrictMode>,
)
