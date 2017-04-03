/* global google */
import React from 'react';
import {Gmaps} from 'react-gmaps';
import {MarkerClusterer} from './markercluster'

const coords = {
  lat: 44.83703969953403,
  lng: 16.373376649999955
};

const params = {v: '3.exp', key: 'AIzaSyCm9_wahM-GlBM4HDSeEF-r3VI61Tq3RYA'};

const App = React.createClass({

  mapUpdate() {
    if (!this.map) {
      return
    }

    let map = this.map
    
    const markers = this.props.markers
      .map(m => new google.maps.Marker({
        position: { lat: m.lat, lng: m.lng },
        label: '' + m.label,
        map
      }))

    if (this.markerCluster) {
      this.markerCluster.clearMarkers()
    }

    this.markerCluster = new MarkerClusterer(map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    })
  },

  onMapCreated(map) {
    this.map = map 
    this.mapUpdate()
  },

  onCloseClick() {
    console.log('onCloseClick');
  },

  onClick(e) {
    console.log('onClick', e);
  },

  render() {
    this.mapUpdate()
    return (
      <Gmaps
        width={'100%'}
        height={'97%'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={7}
        params={params}
        onMapCreated={this.onMapCreated}>
      </Gmaps>
    );
  }

});

export default App