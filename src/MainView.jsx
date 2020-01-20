import React from "react";
import RouteSelect from "./subviews/RouteSelect";
import MapView from "./subviews/MapView";
import fetch from "node-fetch";
import FlexView from "react-flexview";

const styles = {
  width: "400px",
  height: "400px"
};

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allBuses: [], selectedBuses: [] };

    this.selectRoute = this.selectRoute.bind(this);
  }

  fetchBuses() {
    if (!this.state.allBuses.length) {
      fetch(
        "http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus"
      )
        .then(res => res.json())
        .then(json => this.formatData(json));
    }
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
    this.setState({ allBuses: formatedData, selectedBuses: formatedData });
  }

  selectRoute(route) {
    if (route === "All") {
      this.setState({ selectedBuses: this.state.allBuses });
    } else {
      const buses = this.state.allBuses.filter(bus => bus.route === route);
      this.setState({ selectedBuses: buses });
    }
  }

  render() {
    this.fetchBuses();
    return (
      <div style={styles}>
        <FlexView hAlignContent="left">
          <RouteSelect
            selectRoute={this.selectRoute}
            buses={this.state.allBuses}
          />
          <div>
            <MapView buses={this.state.selectedBuses} />
          </div>
        </FlexView>
      </div>
    );
  }
}

export default MainView;
