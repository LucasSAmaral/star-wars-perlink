import React, { Component } from "react";
import axios from "axios";
import Logo from "./components/Logo";
import Links from "./components/Links";
import InputText from "./components/InputText";
import SelectSearch from "./components/SelectSearch";
import ButtonRouter from "./components/ButtonRouter";
import "./scss/Style.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "",
      films: [],
      personFilm: []
    };
  }

  clearInput() {
    const inputText = document.getElementById("search");
    inputText.value = "";
    inputText.focus();
    this.clearSearch();
  }

  clearSearch() {
    this.setState({ personFilm: [] });
    this.setState({ films: [] });
  }

  renderFilms(e) {
    let lowerCaseFilm = e.toLowerCase();
    axios
      .get(`https://swapi.co/api/films/`)
      .then(response => {
        const responseFilms = response.data.results;
        const resultFilms = responseFilms.map(film => {
          return film.title;
        });
        const movieArray = [];
        resultFilms.forEach((element, index) => {
          if (index === 0) {
            movieArray[index] = [element, 1];
          } else if (index === 1) {
            movieArray[index] = [element, 5];
          } else if (index === 2) {
            movieArray[index] = [element, 4];
          } else if (index === 3) {
            movieArray[index] = [element, 6];
          } else if (index === 4) {
            movieArray[index] = [element, 3];
          } else if (index === 5) {
            movieArray[index] = [element, 2];
          } else if (index === 6) {
            movieArray[index] = [element, 7];
          }
        });

        this.setState({
          films: movieArray.filter(movie =>
            movie[0].toLowerCase().includes(lowerCaseFilm)
          )
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  renderPeople(e) {
    let lowerCasePeople = e.toLowerCase();
    axios
      .get(`https://swapi.co/api/people/`)
      .then(response => {
        const responsePeople = response.data.results;
        let resultPeople = responsePeople.filter(person =>
          person.name.toLowerCase().includes(lowerCasePeople)
        );
        const peopleFilms = resultPeople[0].films;
        const peopleFilm = peopleFilms.map(film => {
          return axios
            .get(film)
            .then(response => {
              const peopleMovies = response.data.title;
              return peopleMovies;
            })
            .catch(function(error) {
              console.log(error);
            });
        });

        Promise.all(peopleFilm).then(responses => {
          const peopleArray = [];
          responses.forEach((element, index) => {
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
          return this.state.personFilm;
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container__App">
        <div className="container__logo">
          <Logo />
        </div>

        <div className="container__search">
          <InputText
            searchText={
              this.state.select === "films"
                ? e => this.renderFilms(e.target.value)
                : e => this.renderPeople(e.target.value)
            }
            placeholderText={
              this.state.select === "films"
                ? "Type film"
                : this.state.select === "people"
                ? "Type person"
                : "Select an option first"
            }
          />
          <SelectSearch
            stateValue={this.state.select}
            changeState={e => {
              this.setState({ select: e.target.value });
              this.clearInput();
            }}
          />
        </div>

        <div
          className={`container__result ${
            this.state.select !== "films"
              ? "display-none"
              : this.state.films.length === 0
              ? "display-none"
              : ""
          }`}
        >
          {this.state.films.map(film => {
            return (
              <Links key={film[1]} path={`/film/${film[1]}`} text={film[0]} />
            );
          })}
        </div>

        <div
          className={`container__result ${
            this.state.select !== "people"
              ? "display-none"
              : this.state.personFilm.length === 0
              ? "display-none"
              : ""
          }`}
        >
          {this.state.personFilm.map(film => {
            return (
              <Links key={film[1]} path={`/film/${film[1]}`} text={film[0]} />
            );
          })}
        </div>

        <div className="container__buttons">
          <ButtonRouter path="/aboutme" text="About Me" />
          <ButtonRouter path="/abouttheapp" text="About The App" />
        </div>
      </div>
    );
  }
}

export default App;
