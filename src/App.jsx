
import './App.css'
import { Button } from './components/ui/button'
// import { SelectDemo } from './components/ui/select'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Page from './pages/Page'
import Home from './pages/Home'

function App() {


  return (
  <BrowserRouter>
    <Routes>
     <Route path="/page" element={<Page />} />

      <Route path="/" element={<Home/>} />
      <Route path="/contact" element={<h1>Contact Page</h1>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
