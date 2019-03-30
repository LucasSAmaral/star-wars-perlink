import React, { Component } from 'react';
import Logo from '../components/Logo';
import ButtonRouter from '../components/ButtonRouter';
import axios from 'axios';

class Film extends Component {

    constructor(props) {
        super(props);
        this.state = {
            films: [],
            newDate: ''
        }
    }

    componentDidMount() {
        this.renderFilms();
    }

    renderFilms() {
        let filmNumber = window.location.pathname.split('/')[2];
        axios.get(`https://swapi.co/api/films/${filmNumber}/?format=json`)
            .then(response => {
                let responseFilms = response.data;
                this.setState({films: responseFilms});
                let date = responseFilms.release_date;
                let newDate = date.split('-').reverse().join('/');
                this.setState({newDate: newDate});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        return(
            <div className="container__App">
                <div className="container__logo">
                    <Logo />
                </div>

                <div className="container__films">
                    <h1>{this.state.films.title}</h1>

                    <div className="container__films--description">
                        <p><span>Film director:</span> {this.state.films.director}</p>
                        <p><span>Episode number:</span> {this.state.films.episode_id}</p>
                        <p><span>Release date:</span> {this.state.newDate}</p>
                    </div>
                </div>

                <div className="container__buttons">
                        <ButtonRouter path="/" text="Home" />
                        <ButtonRouter path="/aboutme" text="About Me" />
                        <ButtonRouter path="/abouttheapp" text="About The App" />
                </div>
            </div>
        )
    }
}

export default Film