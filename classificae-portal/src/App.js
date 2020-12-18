import './App.scss';
import Header from './components/header/header';
import Home from './pages/home/home';
import React, {  } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import View from './pages/view/view';

function App() {

  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/view/:id" component={View} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
