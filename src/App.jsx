import Main from './com/Main'
import { DeviceProvider } from './com/DeviceContext'

import './App.css'


function App() {
  return <>
    <header>
      <h1>Bluetooth Web Dashboard</h1>
    </header>

    <DeviceProvider>
      <Main />
    </DeviceProvider>

    <footer>
      <p>fingerskier</p>
    </footer>
  </>
}

export default App
