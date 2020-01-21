import React from "react";
import _ from "lodash";
import "./RouteSelect.css";

class RouteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { busroute: "", buses: props.buses, selectedRoute: null };

    this.onClick = this.onClick.bind(this);
  }

  fetchBuses() {
    if (!this.state.buses.length) {
      fetch(
        "http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus"
      )
        .then(res => res.json())
        .then(json => this.props.formatBuses(json));
    }
  }

  onClick(event) {
    event.preventDefault();
    this.props.selectRoute(event.target.outerText);
    if (this.state.selectedRoute) {
      this.state.selectedRoute.classList.remove("selectedRoute");
    }
    event.target.classList.add("selectedRoute");
    this.setState({ selectedRoute: event.target });
  }

  render() {
    let busRoutes = [];
    if (this.props.buses.length) {
      busRoutes = _.sortBy(_.uniqBy(this.props.buses, "route"), bus => {
        return parseInt(bus.route, 10);
      });
    } else {
      this.fetchBuses();
    }
    return (
      <div className="listView">
        <h3 className="listHeader">Select Route</h3>
        <div className="scrollView">
          <ul
            value={"all"}
            onClick={this.onClick}
            className="busRoute"
            tabindex="1"
          >
            All
          </ul>
          {busRoutes.map(busRoute => (
            <ul
              key={busRoute.route.toString()}
              onClick={this.onClick}
              className="busRoute"
              tabindex="1"
            >
              {String(busRoute.route)}
            </ul>
          ))}
        </div>
      </div>
    );
  }
}

export default RouteSelect;
