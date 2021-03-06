import React, { Component } from "react";
import { Link } from "react-router-dom";

class Links extends Component {
  render() {
    return (
      <Link
        onMouseEnter={this.props.selectIndex}
        className="result__links"
        to={this.props.path}
      >
        {this.props.text}
      </Link>
    );
  }
}

export default Links;
