import React from 'react';
import {Gmaps, Marker} from 'react-gmaps';

const coords = {
  lat: 45.813594,
  lng: 15.974650
};

const params = {v: '3.exp', key: '123'};

const App = React.createClass({

  onMapCreated(map) {
    /*map.setOptions({
      disableDefaultUI: true
    });*/
  },

  onCloseClick() {
    console.log('onCloseClick');
  },

  onClick(e) {
    console.log('onClick', e);
  },

  render() {
    return (
      <Gmaps
        width={'100%'}
        height={'97%'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={12}
        params={params}
        onMapCreated={this.onMapCreated}>
          {this.props.markers.map(m => <Marker
            lat={m.lat}
            lng={m.lng}
            key={m.deviceId}
            label={'' + m.label}
            onClick={this.onClick.bind(this, m)} />
        )}
          
      </Gmaps>
    );
  }

});

export default App