import React from 'react'
import { useDevice } from './DeviceContext'


export default function Devices() {
  const { device, services, connect } = useDevice()
  
  
  return <>
    <h2>Devices</h2>
    <button onClick={connect}>Connect</button>
    {device && (
      <div>
        <h3>{device.name ?? device.id}</h3>
        <ul>
          {services.map(s => (
            <li key={s.uuid}>
              <strong>{s.uuid}</strong>
              <ul>
                {s.characteristics.map(c => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
}