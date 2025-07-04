import React from 'react'
import {StateMachine, State} from 'ygdrassil'
import Navigator from './Navigator'


export default function Main() {
  return <div>
    <StateMachine name="wbt" initial="devices">
      <Navigator />

      <State name="devices">
        <h2>Devices</h2>
      </State>

      <State name="details">
        <h2>Device Details</h2>
      </State>
    </StateMachine>
  </div>
}