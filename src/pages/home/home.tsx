import logo from './logo.svg';
import './home.scss';
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import Company from '../../components/company/company';
import Header from '../../components/header/header';

const Home: React.FC = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const [search, setSearch] = useState('');

    const onSubmit = (data: { search: React.SetStateAction<string>; }) => {
        setSearch(data.search)
    };

    const renderPage = () => {
        return <div>  
            <Header />            
            <header className="jumbotron jumbotron-home my-4 mt-5">
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
                <Company search={search} />
            </div>
            <footer className="py-5 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white">&copy; Desenvolvido por Classificae. Todos os direitos reservados.</p>
                    <p className="m-0 text-center text-white">É uma plataforma digital que auxilia na divulgação de Empresas e seus segmentos.</p>
                </div>
            </footer>
        </div>
    }

    return (
        renderPage()
    );
};

export default Home;