import { StateMachine, State } from 'ygdrassil'
import Navigator from './Navigator'
import Devices from './Devices'


export default function Main() {
  return <div>
    <StateMachine name="wbt" initial="devices">
      <Navigator />

      <State name="devices">
        <Devices />
      </State>

      <State name="details">
        <h2>Device Details</h2>
      </State>
    </StateMachine>
  </div>
}