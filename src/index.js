import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Film from "./pages/Film";
import AboutMe from "./pages/AboutMe";
import AboutTheApp from "./pages/AboutTheApp";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import appReducer from "./app.reducer";

const store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/film/:id" component={Film} />
        <Route path="/aboutme" component={AboutMe} />
        <Route path="/abouttheapp" component={AboutTheApp} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
