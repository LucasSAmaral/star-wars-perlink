import React, { Component } from 'react';
import axios from 'axios';
import logo from './assets/Star-Wars.png';
import './scss/Style.scss';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      select: '',
      films: [],
      personFilm: []
    }
  }

  renderFilms(e) {
    this.setState({personFilm: []});
    axios.get(`https://swapi.co/api/films/`)
      .then(response => {
        let responseFilms = response.data.results;
        let resultFilms = responseFilms.map(film=>{return film.title});
        this.setState({films: resultFilms.filter(resultFilm => resultFilm.toLowerCase().includes(e))});
        console.log(resultFilms.filter(resultFilm => resultFilm.toLowerCase().includes(e)));
      })
      .catch(function (error){
        console.log(error);
      });
  }

  renderPeople(e) {
    this.setState({films: []});
    axios.get(`https://swapi.co/api/people/`)
      .then(response => {
        let responsePeople = response.data.results;
        let resultPeople = responsePeople.filter(person => person.name.toLowerCase().includes(e));
        let peopleFilms = resultPeople[0].films;
        let peopleFilm = peopleFilms.map(film => {return(
          axios.get(film)
            .then(response=>{
              let peopleMovies = response.data.title;
              return peopleMovies;
            })
            .catch(function(error){
              console.log(error);
            })
        )});

        Promise.all(peopleFilm)
          .then(responses=>{
            this.setState({personFilm: responses});
              return console.log(this.state.personFilm);
          })
        

      })
      .catch(function(error){
        console.log(error)
      });
  }

  render() {
    return (
      <div className="container__App">

        <div className="container__logo">
          <img src={logo} alt="Star Wars Logo"/>
        </div>

        <div className="container__search">
          <input onKeyUp={this.state.select === 'films' ? (e)=>this.renderFilms(e.target.value) : (e)=>this.renderPeople(e.target.value)} type="text" placeholder="Type here" name="search" id="search"/>
          <select value={this.state.select} onChange={(e)=>this.setState({select: e.target.value})} name="selector" id="select">
            <option value="n/a" defaultValue disabled>Select an option</option>
            <option value="people">People</option>
            <option value="films">Films</option>
          </select>
        </div>

        <div className="container__result">
          {this.state.films.map(film=>{
            return <p key={film}>{film}</p>
          })}

          {this.state.personFilm.map(movie=>{
            return <p key={movie}>{movie}</p>
          })}
        </div>

      </div>
    );
  }
}

export default App;
