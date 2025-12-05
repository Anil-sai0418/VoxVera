import React from 'react'
import { AlertDialogDemo } from '../components/ui/Alert Dialog'
import { AlertDialog } from '../components/ui/alert-dialog'
import Translator from '../chunks/Translator'

function Page() {
  return (
    <div className=' w-full h-screen font-bold text-2xl'>this is the palce where the user intract with the 
   <AlertDialogDemo/>
   <Translator/>
    </div>
  )
}

export default Page