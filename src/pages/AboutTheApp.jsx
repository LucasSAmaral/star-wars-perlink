import React, { Component } from 'react';
import Logo from '../components/Logo';
import ButtonRouter from '../components/ButtonRouter';

class AboutTheApp extends Component {
    render() {
        return (
            <div className="container__App">
                <div className="container__logo">
                    <Logo />
                </div>
                <div className="about__container">
                    <div className="about__content">
                        <h1 className="about__title">
                            About The App
                    </h1>
                        <p><a href="http://www.perlink.com.br/">Perlink</a> proposed me this challenge to create an app that after searching a Star Wars movie, it returns the movie's name with options to show details about the movie searched. In the case we search the name of a Star Wars character, it returns the movies that this character appears in with the same options to show the movie's details.</p>
                        <p>To make this app, I used the following stack:</p>
                        <ul>
                            <li>React</li>
                            <li>Axios</li>
                            <li>SASS</li>
                            <li>Netlify</li>
                        </ul>
                    </div>

                    <div className="container__buttons">
                        <ButtonRouter path="/" text="Home" />
                        <ButtonRouter path="/aboutme/" text="About Me" />
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutTheApp