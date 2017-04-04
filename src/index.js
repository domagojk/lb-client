import React from 'react';
import ReactDOM from 'react-dom'
import Rx from 'rxjs/Rx'
import createRecycle from 'recyclejs/react'
import io from 'socket.io-client'
import App from './components/App'
import './index.css'

const Recycle = createRecycle(React, Rx)

window.devicesProps = {}

function socketDriver (recycle, Rx) {
  const response$ = new Rx.Subject()
  Rx.Observable.ajax('http://207.154.248.171/devicelist?rand='+Math.random())
    .subscribe(function (res) {
      window.devicesProps = res.response

      Rx.Observable.ajax('http://207.154.248.171/status?rand='+Math.random())
        .subscribe(function (res) {
          response$.next(res.response)
        })
    })

  var socket = io('http://207.154.248.171');
  socket.on('state', function (data) {
    response$.next(data)
  })

  recycle.on('componentInit', (component) => {
    component.setSource('devicesState', response$)
  })
}

const Root = Recycle(socketDriver)(App)

ReactDOM.render((
  <Root />
), document.getElementById('root'))

