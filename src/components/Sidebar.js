import React from 'react'

export default function Sidebar (props) {
  return (
    <div className="sidebar">
      Izmjerene temperature:
      <ul>
        {props.devices.map(device => (
          <li key={device.deviceId}>
            {device.ustanova}: {device.label} C
          </li>
        ))}
      </ul>
    </div>
  )
}
