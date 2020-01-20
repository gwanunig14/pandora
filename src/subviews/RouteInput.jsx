import React from "react";

class RouteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { busroute: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ busroute: event.target.value });
  }

  handleEnterKey(event) {
    if (event.key === "Enter") {
      this.handleSubmit(event);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitRoute(this.state.busroute);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          defaultValue={this.state.busroute}
          onChange={this.handleChange}
          onKeyDown={this.handleEnterKey}
        />
        <input type="submit" value="Submit" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default RouteInput;
