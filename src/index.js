import React from 'react';
import ReactDOM from 'react-dom'
import Rx from 'rxjs/Rx'
import createRecycle from 'recyclejs/react'
import io from 'socket.io-client'
import App from './components/App'

const Recycle = createRecycle(React, Rx)

function socketDriver (recycle, Rx) {
  const response$ = new Rx.Subject()
  Rx.Observable.ajax('http://207.154.248.171/status')
    .subscribe(function (res) {
      response$.next(res.response)
    })

  var socket = io('http://207.154.248.171:8000');
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

