import React from 'react'
import SplitPane from 'react-split-pane'
import GoogleMap from './Map'
import Sidebar from './Sidebar'

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
            state.devicesState = Object.keys(window.devicesProps)
              .filter(id => data[id] && data[id].payload && data[id].payload.percent)
              .map(id => {
                return {
                  ...window.devicesProps[id],
                  deviceId: id,
                  label: data[id].payload.percent
                }
              })
            return state
          })
      ]
    },

    view (props, state) {
      return (
        <SplitPane split="horizontal" defaultSize={100} primary="first">
          <SplitPane split="vertical" defaultSize={300} primary="first">
              <div className="top-left">Logo</div>
              <div className="top-right">
                <p>Kolaboracijski projekt</p>
                <p>Croatian Makers i HT: Zajedno smo jači</p>
              </div>      
          </SplitPane>
          <SplitPane split="vertical" defaultSize={300} primary="first">
              <div className="bottom-left">
                <SplitPane split="horizontal" defaultSize={50} primary="second">
                  <Sidebar devices={state.devicesState} />
                  <div className="sidebar-bottom">
                    <button>Uključi svijetlo!</button>
                  </div>
              </SplitPane>
              </div>
              <div className="bottom-right">
                <GoogleMap markers={state.devicesState} />        
              </div>
          </SplitPane>
      </SplitPane>
      )
    }
  }
}