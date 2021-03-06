import React, { useEffect } from 'react';
import './App.scss';
import api from './api';
import { useForm } from "react-hook-form";

const App: React.FC = () => {


  const { register, handleSubmit, watch, errors } = useForm();    

  const login = (data: any) => {
    console.log(data);
    api.post('login/', {'email': data.email, 'password': data.password})
    .then((node: any) => {
        sessionStorage.setItem('user-info', JSON.stringify(node.data));
        window.location.href = 'home';
    });
  }

  const registerNew = () => {    
    window.open('https://wa.me/message/PYKGLF2ELGGDG1', '_blank');
  }

const onSubmit = (data: any) => login(data);

  return (
    <div className="app">
      <div className="row p-0 w-100">
        <div className="w-20 sidebar-autentication">
          <div className="row col-12">
            <div className="col-12 text-center ml-auto mr-auto mt-4 logo">
              <span>Classifica</span><span className="tage-header">e</span>
            </div>
            <div className="col-12 text-center ml-auto mr-auto mt-5 info">
              <label>Faça login na sua conta</label>
            </div>
            <div className="col-12 ml-auto mr-auto mt-5">
              <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                <div className="row col-12 m-auto">
                  <div className="col-12 ml-auto mr-auto p-0">
                    <label className="name-label">Endereço de e-mail</label>
                    <input type="email" className="form-control form-classificae" name="email" defaultValue="" ref={register({ required: true })} required />
                  </div>
                  <div className="col-12 ml-auto mr-auto p-0 mt-3">
                    <label className="name-label">Senha de acesso</label>
                    <input type="password" className="form-control form-classificae" name="password" ref={register({ required: true })} required />
                  </div>
                  <div className="col-12 p-0 mt-3 ml-auto mr-auto">
                    <button type="submit" className="form-control btn-classificae-primary">Acessar</button>
                  </div>
                  <div className="col-12 p-0 mt-5 text-center">
                    <label className="register-me" onClick={() => registerNew()}>
                      Anunciar
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

