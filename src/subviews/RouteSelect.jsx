import React from "react";
import _ from "lodash";
import "./RouteSelect.css";

class RouteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { busroute: "", buses: props.buses, selectedRoute: null };

    this.onClick = this.onClick.bind(this);
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
    const busRoutes = _.sortBy(_.uniqBy(this.props.buses, "route"), bus => {
      return parseInt(bus.route, 10);
    });
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
