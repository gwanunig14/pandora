import React from "react";
import _ from "lodash";

const scrollStyles = {
  height: "500px",
  overflowY: "scroll"
};

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
      <div style={{ width: "130px" }}>
        <h3>Select Route</h3>
        <div style={scrollStyles}>
          <li value={"all"} onClick={this.onClick} style={{ height: "30px" }}>
            All
          </li>
          {busRoutes.map(busRoute => (
            <li
              key={busRoute.route.toString()}
              onClick={this.onClick}
              style={{ height: "30px" }}
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
