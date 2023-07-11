import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RunProvider } from './context/RunsContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { CodingProvider } from './context/CodingContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RunProvider>
        <CodingProvider>
          <App />
        </CodingProvider>
      </RunProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
