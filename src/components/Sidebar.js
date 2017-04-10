import React from 'react'

export default function Sidebar (props) {
  return (
    <div className="sidebar">
      <b>Izmjerene temperature:</b>
      <ul>
        {props.devices.map(device => (
          <li key={device.deviceId}>
            <span className="ustanova">{device.ustanova}:</span> <span className="label">{device.label} °C</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
