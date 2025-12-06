import React from 'react'
import { Button } from '../components/ui/button'
import { ModeToggle } from '../components/ui/mode-toggle'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ThemeChanger from '../components/ui/theme-color-toggler'

export default function Nav() {
  const navigate = useNavigate()
  return (
    <div className='w-full h-[50px] bg-gray-300'>

      <Button onClick={() => navigate('/')}><ArrowLeft className="mr-2" /> Back</Button>
      
      <ModeToggle/>
      <ThemeChanger/>

    </div>
  )
}
