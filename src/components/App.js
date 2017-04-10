import React from 'react'
import SplitPane from 'react-split-pane'
import GoogleMap from './Map'
import Sidebar from './Sidebar'
import Rx from 'rxjs/Rx'

export default function DeviceMap () {
  return {
    initialState: {
      devicesState: []
    },

    actions (sources) {
      return [
        sources.selectClass('turnon')
          .on('click')
          .switchMap(() => Rx.Observable.ajax({
            method: 'POST',
            url: 'http://207.154.248.171/turnon'
          })),
        
        sources.selectClass('turnoff')
          .on('click')
          .switchMap(() => Rx.Observable.ajax({
            method: 'POST',
            url: 'http://207.154.248.171/turnoff'
          }))
      ]
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
          <SplitPane split="vertical" defaultSize={300} primary="first" className="header-bar">
              <div className="top-left">
                <div className="logo">
                  
                </div>
              </div>
              <div className="top-right">
                <div className="main-header">
                  <p>Kolaboracijski projekt</p>
                  <p>Croatian Makers i HT: Zajedno smo jači</p>
                </div>
              </div>
          </SplitPane>
          <SplitPane split="vertical" defaultSize={350} primary="first" className="sideBar">
              <div className="bottom-left">
                <SplitPane split="horizontal" defaultSize={115} primary="second">
                  <Sidebar devices={state.devicesState} />
                  <div className="sidebar-bottom">
                    <div><button className='turnon'>Uključi svijetlo!</button></div>
                    <div><button className='turnoff'>Isključi svijetlo!</button></div>
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