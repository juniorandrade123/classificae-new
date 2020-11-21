import React, { useEffect, useState } from 'react';
import './dashboard.scss';
import api from '../../api';

const Dashboard: React.FC = () => {

    let [company, setCompany] = useState<any | null>(null);
    let user: any = null;


    useEffect(() => {        
        const logged = sessionStorage.getItem('user-info');
        if (logged === undefined || logged === null) {
            window.location.href = 'login';
        } else {
            user = JSON.parse(logged);
            getCompanyUser();
        }
    }, []);

    const getCompanyUser = () => {
        api.get('listCompanys')
        .then(
            (node: any) => {
                let consulting = node.data.company.find((a: { _id: any; }) => a._id === user.user.id);
                setCompany(consulting);
            }
        )
        .catch((err: any) => {
            console.error(err);
        })
    }

    return (
        <div className="dashboard">
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand col-12 text-center" href="#">Classificae</a>
            </nav>

            <div className="container">
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="jumbotron">
                            <h1 className="display-4">Olá, {company?.name}</h1>
                            <hr className="my-4" />
                            <a className="btn btn-primary btn-lg btn-classificae-primary" href="#" role="button">Configurar Anuncio</a>
                            <a className="btn btn-primary btn-lg btn-classificae-primary ml-1" href="#" role="button">Ver Anuncio</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;