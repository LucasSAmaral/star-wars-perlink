import React, { Component } from 'react';

class InputText extends Component {
    render() {
        return(
            <input onKeyUp={this.props.searchText} type="text" placeholder={this.props.placeholderText} name="search" id="search" />
        )
    }
}

export default InputText