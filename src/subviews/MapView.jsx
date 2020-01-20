import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import fetch from "node-fetch";

const mapStyles = {
  width: "100%",
  height: "100%"
};

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { buses: [] };
  }

  fetchBuses() {
    fetch(
      "http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetBusByRoute/" +
        this.props.route
    )
      .then(res => res.json())
      .then(json => this.formatData(json));
  }

  formatData(data) {
    const formatedData = data.map(datum => {
      return {
        route: datum["ROUTE"],
        lat: datum["LATITUDE"],
        lon: datum["LONGITUDE"],
        timepoint: datum["TIMEPOINT"]
      };
    });
    this.setState({ buses: formatedData });
  }

  componentDidUpdate() {
    if (
      (this.props.route &&
        this.state.buses[0] &&
        this.props.route !== this.state.buses[0].route) ||
      (this.props.route && !this.state.buses.length)
    ) {
      this.fetchBuses();
    }
  }

  busPositions() {
    debugger;
    return this.state.buses.forEach(bus => (
      <Marker position={{ lat: bus.lat, lng: bus.lon }} />
    ));
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 33.749, lng: -84.388 }}
      >
        {this.state.buses.map(bus => (
          <Marker position={{ lat: bus.lat, lng: bus.lon }} />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_Z9lTIAzbW2VBkebVJWWjGgTvJZLQk8o"
})(MapView);
