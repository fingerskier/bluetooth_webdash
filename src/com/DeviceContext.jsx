import { createContext, useContext, useState } from 'react'

// Standard Bluetooth GATT Service UUIDs
// These are declared upfront so getPrimaryServices() can access them
// See: https://www.bluetooth.com/specifications/assigned-numbers/
const STANDARD_GATT_SERVICES = [
  // Generic Services
  'generic_access',                    // 0x1800
  'generic_attribute',                 // 0x1801
  'immediate_alert',                   // 0x1802
  'link_loss',                         // 0x1803
  'tx_power',                          // 0x1804
  'current_time',                      // 0x1805
  'reference_time_update',             // 0x1806
  'next_dst_change',                   // 0x1807
  'glucose',                           // 0x1808
  'health_thermometer',                // 0x1809
  'device_information',                // 0x180A
  'heart_rate',                        // 0x180D
  'phone_alert_status',                // 0x180E
  'battery_service',                   // 0x180F
  'blood_pressure',                    // 0x1810
  'alert_notification',                // 0x1811
  'human_interface_device',            // 0x1812
  'scan_parameters',                   // 0x1813
  'running_speed_and_cadence',         // 0x1814
  'automation_io',                     // 0x1815
  'cycling_speed_and_cadence',         // 0x1816
  'cycling_power',                     // 0x1818
  'location_and_navigation',           // 0x1819
  'environmental_sensing',             // 0x181A
  'body_composition',                  // 0x181B
  'user_data',                         // 0x181C
  'weight_scale',                      // 0x181D
  'bond_management',                   // 0x181E
  'continuous_glucose_monitoring',     // 0x181F
  'internet_protocol_support',         // 0x1820
  'indoor_positioning',                // 0x1821
  'pulse_oximeter',                    // 0x1822
  'http_proxy',                        // 0x1823
  'transport_discovery',               // 0x1824
  'object_transfer',                   // 0x1825
  'fitness_machine',                   // 0x1826
  'mesh_provisioning',                 // 0x1827
  'mesh_proxy',                        // 0x1828
  'reconnection_configuration',        // 0x1829
  // Additional common 128-bit UUIDs for popular devices
  '0000ffe0-0000-1000-8000-00805f9b34fb', // HM-10/HM-11 BLE modules
  '0000fff0-0000-1000-8000-00805f9b34fb', // Common custom service
  '6e400001-b5a3-f393-e0a9-e50e24dcca9e', // Nordic UART Service (NUS)
]

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
    const dev = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: STANDARD_GATT_SERVICES,
    })
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
