import React, { Component } from "react";
import { PERSON_SELECTED, FILMS_SELECTED } from "../app.reducer";

class SelectSearch extends Component {
  render() {
    return (
      <select
        value={this.props.stateValue}
        onChange={this.props.changeState}
        name="selector"
        id="select"
      >
        <option value="" defaultValue>
          Select an option
        </option>
        <option value={PERSON_SELECTED}>People</option>
        <option value={FILMS_SELECTED}>Films</option>
      </select>
    );
  }
}

export default SelectSearch;
