import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBus: null,
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

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedBus: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = () => {
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
        style={{
          height: "100vh"
        }}
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
            <h4>{this.state.selectedBus ? this.state.selectedBus.name : ""}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_Z9lTIAzbW2VBkebVJWWjGgTvJZLQk8o"
})(MapView);
