import React, { Component } from 'react';
import axios from 'axios';
import logo from './assets/Star-Wars.png';
import Links from './components/Links';
import './scss/Style.scss';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      select: '',
      films: [],
      personFilm: []
    }
  }

  clearInput() {
    let inputText = document.getElementById('search');
    inputText.value = '';
    inputText.focus();
  }

  renderFilms(e) {
    this.setState({ personFilm: [] });
    axios.get(`https://swapi.co/api/films/`)
      .then(response => {
        let responseFilms = response.data.results;
        let resultFilms = responseFilms.map(film => { return film.title });
        let movieArray = [];
        resultFilms.forEach((element,index) => {
          if(index === 0) {
            movieArray[index] = [element,1];
          } else if (index === 1) {
            movieArray[index] = [element,5];
          } else if (index === 2) {
            movieArray[index] = [element,4];
          } else if (index === 3) {
            movieArray[index] = [element,6];
          } else if (index === 4) {
            movieArray[index] = [element,3];
          } else if (index === 5) {
            movieArray[index] = [element,2];
          } else if (index === 6) {
            movieArray[index] = [element,7];
          }  
        });

        this.setState({ films: movieArray.filter(movie => movie[0].toLowerCase().includes(e)) });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  renderPeople(e) {
    this.setState({ films: [] });
    axios.get(`https://swapi.co/api/people/`)
      .then(response => {
        let responsePeople = response.data.results;
        let resultPeople = responsePeople.filter(person => person.name.toLowerCase().includes(e));
        let peopleFilms = resultPeople[0].films;
        let peopleFilm = peopleFilms.map(film => {
          return (
            axios.get(film)
              .then(response => {
                let peopleMovies = response.data.title;
                return peopleMovies;
              })
              .catch(function (error) {
                console.log(error);
              })
          )
        });

        Promise.all(peopleFilm)
          .then(responses => {
            let peopleArray = [];
            responses.forEach((element,index)=>{
              if (element === "A New Hope") {
                peopleArray[index] = [element, 1];
              } else if (element === "The Empire Strikes Back") {
                peopleArray[index] = [element, 2];
              } else if (element === "Return of the Jedi") {
                peopleArray[index] = [element, 3];
              } else if (element === "The Phantom Menace") {
                peopleArray[index] = [element, 4];
              } else if (element === "Attack of the Clones") {
                peopleArray[index] = [element, 5];
              } else if (element === "Revenge of the Sith") {
                peopleArray[index] = [element, 6];
              } else if (element === "The Force Awakens") {
                peopleArray[index] = [element, 7];
              }
            });
            this.setState({ personFilm: peopleArray });
            return console.log(this.state.personFilm);
          })


      })
      .catch(function (error) {
        console.log(error)
      });
  }

  render() {
    return (
      <div className="container__App">

        <div className="container__logo">
          <img src={logo} alt="Star Wars Logo" />
        </div>

        <div className="container__search">
          <input onKeyUp={this.state.select === 'films' ? (e) => this.renderFilms(e.target.value) : (e) => this.renderPeople(e.target.value)} type="text" placeholder={this.state.select === 'films' ? 'Type film' : 'Type person'} name="search" id="search" />
          <select value={this.state.select} onChange={(e) => {this.setState({ select: e.target.value });this.clearInput();}} name="selector" id="select">
            <option value="" defaultValue>Select an option</option>
            <option value="people">People</option>
            <option value="films">Films</option>
          </select>
        </div>

        <div className={`container__result ${this.state.select !== 'films' ? 'display-none' : this.state.films.length === 0 ? 'display-none' : ''}`}>

          {this.state.films.map(film => {
            return <Links key={film[1]} path={`/film/${film[1]}`} text={film[0]} />
          })}

        </div>

        <div className={`container__result ${this.state.select !== 'people' ? 'display-none' : this.state.personFilm.length === 0 ? 'display-none' : ''}`}>

          {this.state.personFilm.map(film => {
            return <Links key={film[1]} path={`path/${film[1]}`} text={film[0]} />
          })}

        </div>

      </div>
    );
  }
}

export default App;
