import { createContext, useContext, useState } from 'react'

const DeviceContext = createContext(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export function useDevice() {
  const ctx = useContext(DeviceContext)
  if (!ctx) throw new Error('useDevice must be used within DeviceProvider')
  return ctx
}

export function DeviceProvider({ children }) {
  const [device, setDevice] = useState(null)
  const [services, setServices] = useState([])

  async function connect() {
    const dev = await navigator.bluetooth.requestDevice({ acceptAllDevices: true })
    const server = await dev.gatt?.connect()
    const serviceInfos = []
    try {
      const primaryServices = await server?.getPrimaryServices()
      if (primaryServices) {
        for (const srv of primaryServices) {
          const chars = await srv.getCharacteristics()
          serviceInfos.push({ uuid: srv.uuid, characteristics: chars.map(c => c.uuid) })
        }
      }
    } catch (err) {
      console.error('Failed to read services', err)
    }
    setDevice(dev)
    setServices(serviceInfos)
  }

  return (
    <DeviceContext.Provider value={{ device, services, connect }}>
      {children}
    </DeviceContext.Provider>
  )
}
