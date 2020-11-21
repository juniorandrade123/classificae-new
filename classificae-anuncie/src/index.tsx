import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './page/dashboard/dashboard';
import Register from './page/register/register';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact={true} component={App} />
      <Route path="/home" exact={true} component={Dashboard} />
      <Route path="/register" exact={true} component={Register} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
