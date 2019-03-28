import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      select: '',
      films: [],
      resultMovies: [],
      people: []
    }
  }

  renderData(e) {
    axios.get(`https://swapi.co/api/films/`)
      .then(response => {
        this.setState({films: response.data.results})
        let resultFilms = this.state.films.map(film=>{return film.title});
        this.setState({resultMovies: resultFilms.filter(resultFilm => resultFilm.toLowerCase().includes(e))});
        console.log(resultFilms.filter(resultFilm => resultFilm.toLowerCase().includes(e)));
        console.log(this.state.resultMovies);
      })
      .catch(function (error){
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Star Wars</h1>
        
        <input onKeyUp={(e)=>this.renderData(e.target.value)} type="text" placeholder="Type here" name="search" id="search"/>

        <select value={this.state.select} onChange={(e)=>this.setState({select: e.target.value})} name="selector" id="select">
          <option value="n/a" defaultValue>Select an option</option>
          <option value="people">People</option>
          <option value="films">Films</option>
        </select>

        {this.state.resultMovies.map(resultMovie=>{
          return <p>{resultMovie}</p>
        })}

      </div>
    );
  }
}

export default App;
