import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RunProvider } from './context/RunsContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { CodingProvider } from './context/CodingContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { CaloriesProvider } from './context/CaloriesContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RunProvider>
          <CodingProvider>
            <CaloriesProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CaloriesProvider>
          </CodingProvider>
        </RunProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
