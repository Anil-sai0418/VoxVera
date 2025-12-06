import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "./components/ui/theme-provider.jsx"
import { ActiveThemeProvider } from "./components/ui/active-theme.jsx"
import './index.css'
import App from './App.jsx'



createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
      <ActiveThemeProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App/>
          
        </ThemeProvider>
      </ActiveThemeProvider>
)
