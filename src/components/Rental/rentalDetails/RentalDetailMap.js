import React, { Component } from 'react';
import { MapWithGeocode } from '../../map/GoogleMap';

export default class RentalDetailMap extends Component {
  render() {
    const { location } = this.props;
    return (
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBx0N9J7tmXqY4XVAd1vwdrcMRDLlTf1mQ&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    );
  }
}
