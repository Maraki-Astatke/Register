import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './locales' // Import i18n configuration

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)