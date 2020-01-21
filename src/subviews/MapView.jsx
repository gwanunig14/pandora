import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

const mapStyles = {
  height: "100vh"
};

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: null,
      activeMarker: null,
      showingInfoWindow: false
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  busInfoString(bus) {
    return (
      "Bus number " +
      bus["busNumber"] +
      " is currently at or approaching " +
      bus["timepoint"]
    );
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{ lat: 33.749, lng: -84.388 }}
        onClick={this.onMapClicked}
      >
        {this.props.buses.map(bus => (
          <Marker
            position={{ lat: bus.lat, lng: bus.lon }}
            name={this.busInfoString(bus)}
            onClick={this.onMarkerClick}
          />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>
              {this.state.selectedPlace ? this.state.selectedPlace.name : ""}
            </h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_Z9lTIAzbW2VBkebVJWWjGgTvJZLQk8o"
})(MapView);
