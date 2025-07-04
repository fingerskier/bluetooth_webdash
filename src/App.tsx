import { useState } from 'react'
import Main from './com/Main'

import './App.css'


function App() {
  const [count, setCount] = useState(0)
  
  return <>
    <header>
      <h1>Bluetooth Web Dashboard</h1>
    </header>

    <Main />

    <footer>
      <p>fingerskier</p>
    </footer>
  </>
}

export default App
