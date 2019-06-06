import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Cacher } from './cacher';

const mapComponent = props => (
  <GoogleMap defaultZoom={8} defaultCenter={props.coordinates} center={props.coordinates}>
    {props.isLocationLoaded && !props.isError && <Marker center={props.coordinates} position={props.coordinates} />}
    {props.isLocationLoaded && props.isError && (
      <InfoWindow position={props.coordinates} options={{ maxWidth: 300 }}>
        <div>
          There has been a problem loading the location the map, we are trying to resolve problem as fast as possible.
          Contact host for additional informations if you are still interested in booking this place. We are sorry for
          inconvenience.
        </div>
      </InfoWindow>
    )}
  </GoogleMap>
);

const withGeocode = WrappedComponent =>
  class extends Component {
    cacher = new Cacher();

    state = {
      coordinates: {
        lat: 0,
        lng: 0
      },
      isError: false,
      isLocationLoaded: false
    };

    componentDidMount() {
      setInterval(() => {
        this.getGeocodedLocation();
      }, 100);
    }

    geocodeLocation = location => {
      const geocoder = new window.google.maps.Geocoder();
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (results, status) => {
          if (status === 'OK') {
            const geometry = results[0].geometry.location;
            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

            this.cacher.cacheValue(location, coordinates);
            resolve(coordinates);
          } else {
            reject('Error');
          }
        });
      });
    };
    getGeocodedLocation = async () => {
      const { location } = this.props;

      //if location is cached return cached values
      if (this.cacher.isValueCached(location)) {
        this.setState({
          coordinates: this.cacher.getCachedValue(location),
          isLocationLoaded: true
        });
      } else {
        try {
          await this.geocodeLocation(location);

          this.setState({
            coordinates: this.cacher.getCachedValue(location),
            isLocationLoaded: true
          });
        } catch (err) {
          this.setState({ isLocationLoaded: true, isError: true });
        }
      }
    };

    render() {
      return <WrappedComponent {...this.state} />;
    }
  };

export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(mapComponent)));
