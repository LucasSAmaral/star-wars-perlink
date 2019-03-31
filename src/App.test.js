import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Film from './pages/Film';
import AboutMe from './pages/AboutMe';
import AboutTheApp from './pages/AboutTheApp';
import Logo from './components/Logo';
import ButtonRouter from './components/ButtonRouter';

it('renders the Router buttons on APP', () => {
const wrapper = shallow(<App />);
const buttons = <div className="container__buttons"><ButtonRouter path="/aboutme" text="About Me" /><ButtonRouter path="/abouttheapp" text="About The App" /></div>;
expect(wrapper.contains(buttons)).toEqual(true);
});

it('renders the logo on page Film', () => {
const wrapper = shallow(<Film />);
const logo = <div className="container__logo"><Logo /></div>;
expect(wrapper.contains(logo)).toEqual(true);
});

it('renders h1 on page AboutMe', () => {
const wrapper = shallow(<AboutMe />);
const title = <h1 className="about__title">About Me</h1>;
expect(wrapper.contains(title)).toEqual(true);
});

it('renders h1 on page AboutTheApp', () => {
const wrapper = shallow(<AboutTheApp />);
const title = <h1 className="about__title">About The App</h1>;
expect(wrapper.contains(title)).toEqual(true);
});