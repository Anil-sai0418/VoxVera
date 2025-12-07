import React from 'react'
import { AlertDialogDemo } from '../components/ui/Alert Dialog'
import { AlertDialog } from '../components/ui/alert-dialog'
import Translator from '../chunks/Translator'
import Nav from '../chunks/Nav'
import Footer from '../chunks/Footer'

function Page() {
  return (
    <div className=' w-full h-screen '>
   <Nav/>
   <Translator/>
   <Footer/>
    </div>
  )
}

export default Page