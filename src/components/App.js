import React from 'react'
import SplitPane from 'react-split-pane'
import GoogleMap from './Map'
import devicesProps from '../data'

export default function DeviceMap () {
  return {
    initialState: {
      devicesState: []
    },

    actions (sources) {
      
    },

    reducers (sources) {
      return [
        sources.devicesState
          .reducer((state, data) => {
            state.devicesState = Object.keys(devicesProps)
              .filter(id => data[id] && data[id].payload && data[id].payload.percent)
              .map(id => {
                return {
                  deviceId: id,
                  lat: devicesProps[id].lat,
                  lng: devicesProps[id].lng,
                  label: data[id].payload.percent
                }
              })
            return state
          })
      ]
    },

    view (props, state) {
      return (
        <SplitPane split="vertical" defaultSize={800} primary="first">
            <GoogleMap markers={state.devicesState} />
            <div></div>            
        </SplitPane>
      )
    }
  }
}