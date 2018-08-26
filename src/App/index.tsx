import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './../Styles/app.css';

import Homepage from './Pages/Homepage';
import About from './Pages/About';

render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Homepage} exact />
            <Route path="/about" component={About} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);