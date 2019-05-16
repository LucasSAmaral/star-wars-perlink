import React, { Component } from "react";
import Logo from "../components/Logo";
import ButtonRouter from "../components/ButtonRouter";
import axios from "axios";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../app.reducer";
import { prop } from "ramda";

class Film extends Component {
  componentDidMount() {
    this.renderFilms();
  }

  renderFilms() {
    const filmNumber = window.location.pathname.split("/")[2];
    axios
      .get(`https://swapi.co/api/films/${filmNumber}/?format=json`)
      .then(response => {
        const responseFilms = prop("data", response);
        this.props.onFilmSelected(responseFilms);
        const date = prop("release_date", responseFilms);
        const newDate = date
          .split("-")
          .reverse()
          .join("/");
        this.props.onDateChanged(newDate);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container__App">
        <div className="container__logo">
          <Logo />
        </div>

        <div className="container__films">
          <h1>{this.props.film.title}</h1>
          <div className="container__films--description">
            <p>
              <span>Film director:</span> {this.props.film.director}
            </p>
            <p>
              <span>Episode number:</span> {this.props.film.episode_id}
            </p>
            <p>
              <span>Release date:</span> {this.props.newDate}
            </p>
          </div>
        </div>

        <div className="container__buttons">
          <ButtonRouter path="/" text="Home" />
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
)(Film);
