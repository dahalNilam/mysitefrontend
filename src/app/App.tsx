import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "App/Styles/App.css";

import Homepage from "./pages/Homepage";
import About from "./pages/About";

render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Homepage} exact />
      <Route path="/about" component={About} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
