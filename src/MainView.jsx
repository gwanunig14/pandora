import React from "react";
import RouteInput from "./subviews/RouteInput";
import MapView from "./subviews/MapView";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { busroute: "" };

    this.submitRoute = this.submitRoute.bind(this);
  }

  submitRoute(route) {
    this.setState({ busroute: route });
  }

  render() {
    return (
      <div>
        <RouteInput submitRoute={this.submitRoute} />
        <MapView route={this.state.busroute} />
      </div>
    );
  }
}

export default MainView;
