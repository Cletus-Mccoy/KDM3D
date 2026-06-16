import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import './index.css'
import App from './App.tsx'

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  </StrictMode>,
)
