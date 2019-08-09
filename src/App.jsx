import React, { Component } from "react";
import axios from "axios";
import Logo from "./components/Logo";
import Links from "./components/Links";
import InputText from "./components/InputText";
import SelectSearch from "./components/SelectSearch";
import ButtonRouter from "./components/ButtonRouter";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import "./scss/Style.scss";

import {
  FILMS_SELECTED,
  PERSON_SELECTED,
  SEARCH_CLEARED,
  NONE_SELECTED,
  INDEX_SELECTED,
  mapStateToProps,
  mapDispatchToProps
} from "./app.reducer";

class App extends Component {
  componentDidMount() {
    this.clearSearch();
    this.noneSelected();
  }

  clearInput() {
    const inputText = document.getElementById("search");
    inputText.value = "";
    inputText.focus();
    this.clearSearch();
  }

  clearSearch() {
    this.props.dispatch({
      type: SEARCH_CLEARED
    });
  }

  noneSelected() {
    this.props.dispatch({
      type: NONE_SELECTED
    });
  }

  renderFilms(e) {
    let lowerCaseFilm = e.toLowerCase();
    axios
      .get(`https://swapi.co/api/films/`)
      .then(response => {
        const responseFilms = pathOr("", ["data", "results"], response);
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

        let filmFetch = movieArray.filter(movie =>
          movie[0].toLowerCase().includes(lowerCaseFilm)
        );
        this.props.onFilmFetched(filmFetch);
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
        const responsePeople = pathOr("", ["data", "results"], response);
        let resultPeople = responsePeople.filter(person =>
          person.name.toLowerCase().includes(lowerCasePeople)
        );
        const peopleFilms = resultPeople[0].films;
        const peopleFilm = peopleFilms.map(async film => {
          try {
            const response = await axios.get(film);
            const peopleMovies = pathOr("", ["data", "title"], response);
            return peopleMovies;
          } catch (error) {
            console.log(error);
          }
        });

        peopleFilm.then(responses => {
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

          this.props.onPersonFetched(peopleArray);
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

        {Object.keys(this.props.film).length > 0 && (
          <div className="container__last-film">
            <h1>
              <span>Last film selected:</span> {this.props.film.title}
            </h1>
          </div>
        )}

        <div className="container__search">
          <InputText
            searchText={
              this.props.select === FILMS_SELECTED
                ? e => this.renderFilms(e.target.value)
                : e => this.renderPeople(e.target.value)
            }
            placeholderText={
              this.props.select === FILMS_SELECTED
                ? "Type film"
                : this.props.select === PERSON_SELECTED
                ? "Type person"
                : "Select an option first"
            }
          />
          <SelectSearch
            stateValue={this.props.select}
            changeState={e => {
              if (e.target.value === FILMS_SELECTED) {
                this.props.dispatch({
                  type: FILMS_SELECTED
                });
              } else if (e.target.value === PERSON_SELECTED) {
                this.props.dispatch({
                  type: PERSON_SELECTED
                });
              } else if (e.target.value === NONE_SELECTED) {
                this.props.dispatch({
                  type: NONE_SELECTED
                });
              }
              this.clearInput();
            }}
          />
        </div>

        <div
          className={`container__result ${
            this.props.select !== FILMS_SELECTED
              ? "display-none"
              : this.props.films.length === 0
              ? "display-none"
              : ""
          }`}
        >
          {this.props.films.map(film => {
            return (
              <Links
                selectIndex={() => {
                  this.props.dispatch({
                    type: INDEX_SELECTED,
                    payload: film[1]
                  });
                }}
                key={film[1]}
                path="/film"
                text={film[0]}
              />
            );
          })}
        </div>

        <div
          className={`container__result ${
            this.props.select !== PERSON_SELECTED
              ? "display-none"
              : this.props.personFilm.length === 0
              ? "display-none"
              : ""
          }`}
        >
          {this.props.personFilm.map(film => {
            return (
              <Links
                selectIndex={() => {
                  this.props.dispatch({
                    type: INDEX_SELECTED,
                    payload: film[1]
                  });
                }}
                key={film[1]}
                path="/film"
                text={film[0]}
              />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
