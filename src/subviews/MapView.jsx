import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "1000px",
  height: "100%"
};

class MapView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{ lat: 33.749, lng: -84.388 }}
      >
        {this.props.buses.map(bus => (
          <Marker position={{ lat: bus.lat, lng: bus.lon }} />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_Z9lTIAzbW2VBkebVJWWjGgTvJZLQk8o"
})(MapView);
