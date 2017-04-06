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
      .map(m => {
        var infowindow = new google.maps.InfoWindow({
          content: m.ustanova + ' : ' + m.label + ' C'
        })
        let marker = new google.maps.Marker({
          position: { lat: parseFloat(m.lat, 10), lng: parseFloat(m.lng, 10) },
          label: '' + m.label,
          map
        })

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        })

        return marker
      })

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