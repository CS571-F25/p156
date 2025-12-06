import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './custom.scss'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="73379868212-abfhbq16da23u5lvah76it9j4vkio04a.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
