import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EmailSender from './components/EmailSender'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

         <EmailSender/>
    </>
  )
}

export default App
