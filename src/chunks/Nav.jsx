import React from 'react'
import { Button } from '../components/ui/button'
import { ModeToggle } from '../components/ui/mode-toggle'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ThemeChanger from '../components/ui/theme-color-toggler'

export default function Nav() {
  const navigate = useNavigate()
  return (
    <div className='w-full h-[60px] flex items-center justify-between px-6 shadow-md bg-[var(--bg)] text-[var(--text)]'>

      <div className="flex items-center gap-3">
        <Button onClick={() => navigate('/')} variant="ghost" className="flex items-center px-4 py-2 text-lg">
          <ArrowLeft className="mr-2 w-6 h-6" />
          Back
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <ModeToggle />
        <ThemeChanger />
      </div>

    </div>
  )
}
