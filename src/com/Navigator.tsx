import {StateButton} from 'ygdrassil'


export default function Navigator() {
  return <div>
    <StateButton to="devices">Devices</StateButton>
    <StateButton to="details">Details</StateButton>
    <StateButton to="settings">Settings</StateButton>
    <StateButton to="about">About</StateButton>
  </div>
}