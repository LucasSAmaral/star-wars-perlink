import React, { Component } from 'react';
import './App.scss';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      select: ''
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Star Wars</h1>
        
        <input type="text" placeholder="Type here" name="search" id="search"/>

        <select value={this.state.select} onChange={(e)=>this.setState({select: e.target.value})} name="selector" id="select">
          <option value="n/a" defaultValue>Select an option</option>
          <option value="Character">Character</option>
          <option value="Film">Film</option>
        </select>
      </div>
    );
  }
}

export default App;
