
import './App.css'
import { Button } from './components/ui/button'
// import { SelectDemo } from './components/ui/select'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Page from './pages/Page'
import Home from './pages/Home'
import Null from './chunks/Null'
import About from './chunks/About'

function App() {
  return (
  // top-level wrapper uses CSS variables defined in src/index.css
  <div className="min-h-screen text-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/Translator" element={<Page />} />
           <Route path="/About" element={<About />} />
          <Route path="/" element={<Home/>} />
          <Route path="*" element={<Null/>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
