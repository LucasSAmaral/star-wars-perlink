import React, { Component } from 'react';

class SelectSearch extends Component {
    render() {
        return (
            <select value={this.props.stateValue} onChange={this.props.changeState} name="selector" id="select">
                <option value="" defaultValue>Select an option</option>
                <option value="people">People</option>
                <option value="films">Films</option>
            </select>
        )
    }
}

export default SelectSearch