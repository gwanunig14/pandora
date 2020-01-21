import React from "react";
import _ from "lodash";
import "./RouteSelect.css";

class RouteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { busroute: "", buses: props.buses };

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.props.selectRoute(event.target.outerText);
  }

  render() {
    const busRoutes = _.sortBy(_.uniqBy(this.props.buses, "route"), bus => {
      return parseInt(bus.route, 10);
    });
    return (
      <div className="listView">
        <h3 className="listHeader">Select Route</h3>
        <div className="scrollView">
          <li value={"all"} onClick={this.onClick} className="busRoute">
            All
          </li>
          {busRoutes.map(busRoute => (
            <li
              key={busRoute.route.toString()}
              onClick={this.onClick}
              className="busRoute"
            >
              {String(busRoute.route)}
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default RouteSelect;
