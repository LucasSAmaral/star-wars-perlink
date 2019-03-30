import React, { Component } from 'react';
import img from '../assets/Star-Wars.png';

class Logo extends Component {
    render(){
        return(
            <img src={img} alt="Star Wars Logo" />
        )
    }
}

export default Logo