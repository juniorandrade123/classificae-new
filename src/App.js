import logo from './logo.svg';
import './App.scss';
import Header from './components/header/header';
import Home from './components/home/home';
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';


function App() {

  const { register, handleSubmit, watch, errors } = useForm();
  const [search, setSearch] = useState('');

  const onSubmit = data => {
    setSearch(data.search)
    console.log(search);
  };

  return (
    <div>
      <Header />      
      <header className="jumbotron my-4 mt-5">
        <h1 className="display-3 text-center">
          Encontre aqui empresas que irão ajudar você!
        </h1> 
        
          <div className="col-7 ml-auto mr-auto mb-0 mt-5">                        
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">          
              <input defaultValue="" ref={register} name="search" type="text" className="col-9 form-control input-pesquisar" placeholder="Olá, qual empresa você procura hoje?" />{/* register your input into the hook by invoking the "register" function */}              
              <button type="submit" className="col-2 text-left btn-pesquisar ml-2 text-center">Pesquisar</button>
              </div>
            </form>                    
          </div>
          
      </header>
      <div className="container">
        <Home search={search}  />
      </div>
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">&copy; Classificae 2020</p>
        </div>    
      </footer>
    </div>
  );
}

export default App;
