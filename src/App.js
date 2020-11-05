import logo from './logo.svg';
import './App.scss';
import Header from './components/header/header';
import Home from './pages/home/home';
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import View from './pages/view/view';

function App() {

  return (
    <div>
      <Header />   
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/view" component={View} />
        </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
