import { StateMachine, State } from 'ygdrassil'
import Navigator from './Navigator'
import { useDevice } from './DeviceContext'


export default function Main() {
  const { device, services, connect } = useDevice()
  return <div>
    <StateMachine name="wbt" initial="devices">
      <Navigator />

      <State name="devices">
        <>
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
      </State>

      <State name="details">
        <h2>Device Details</h2>
      </State>
    </StateMachine>
  </div>
}