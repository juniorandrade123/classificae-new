import React, {useState, useEffect} from 'react';
import ReactTooltip from 'react-tooltip';

import AwesomeSlider from 'react-awesome-slider';

import 'react-awesome-slider/dist/styles.css';
import './view.scss';
import Header from '../../components/header/header';
import Login from '../../components/login/login';
import api from '../../api';

const View: React.FC = () => {

    const [company, setCompany] = useState<any | null>(null);
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem('company');
        
        if (id !== undefined && id !== null) {    
            getCompany(id);
        }

    }, [])

    const getCompany = (id: string) => { 
        setLoading(true);
        api.get('GetId/' + id)
        .then((node: any) => {
            setCompany(node.data[0]);
            setLoading(false);
        });
    }

    const renderLoading = () => {
        return <div className="lds-ripple"><div></div><div></div></div>
    }

    const renderPage = () => {
        if (company !== null && company !== undefined)
            return <div>                

                <div className="mt-5">
                <ReactTooltip place={'bottom'} />
                <div className="container mt-5">                                    
                    <div className="row align-items-center my-5 view">                                        
                        <div className="col-lg-7">
                            <AwesomeSlider>
                                {
                                    company.image_galeria.map((item: { base64: any; }, index: any) => (
                                        <div key={index} data-src={item.base64} />             
                                    ))
                                }
                            </AwesomeSlider>
                        </div>
                        <div className="col-lg-5 view-img">
                            <h1>Conheça a <span className="font-weight-bold">{company['name']}</span></h1>                        
                            <h6>{company['keywords']}</h6>
                            <h6>{company['description_all']}</h6>
                        </div>
                    </div>                    
                    <div className="row view-address">
                        <div className="col-md-4 mb-5">
                            <div className="card-view card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Contato</h3>
                                <p className="card-text">
                                    <span style={{display: company.contact.tel !== '' ? '' : 'none'}}>
                                        <b>Telefone:</b> {'(' + company.contact.tel.substr(0, 2) + ') ' + company.contact.tel.substr(2, 4) + '-' + company.contact.tel.substr(6,4)}<br></br>
                                    </span>
                                    <span style={{display: company.contact.cel !== '' ? '' : 'none'}}>
                                        <b>Celular:</b> {'(' + company.contact.cel.substr(0, 2) + ') ' + company.contact.cel.substr(2, 5) + '-' + company.contact.cel.substr(6,4)}<br></br>
                                    </span>
                                    <span style={{display: company.contact.email !== '' ? '' : 'none'}}>
                                        <b>E-mail:</b> {company?.contact?.email === '' ? 'contato@classificae.com.br' : company?.contact?.email}
                                    </span>
                                </p>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-5">
                            <div className="card-view card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Formas de pagamento</h3>
                                <div className="card-text">
                                    <h5 style={{display: company.information.payment.money ? '' : 'none'}}>Dinheiro</h5>                                     
                                    <h5 style={{display: company.information.payment.debit ? '' : 'none'}}>Cartão de débito</h5> 
                                    <h5 style={{display: company.information.payment.credit ? '' : 'none'}}>Cartão de crédito</h5>                                     
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-5">
                            <div className="card-view card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Horário de atendimento</h3>
                                <p className="card-text">
                                {Object.keys(company.information.schedule).map((item: any, i) => (
                                    <span key={i}>
                                    De {company.information.schedule[item].day_week_start}&nbsp;a&nbsp;{company.information.schedule[item].day_week_end} 
                                    &nbsp;das {company.information.schedule[item].hour_start}&nbsp;às&nbsp;{company.information.schedule[item].hour_end}<br></br>
                                    </span>
                                ))}                          
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 p-0">
                    <iframe className="col-12 p-0 mb-5" src={company.address.map} width="800" height="600" 
                        frameBorder={0} allowFullScreen={true} aria-hidden="false" tabIndex={0}></iframe>
                    </div>
                </div>
                <footer className="py-5 bg-dark">
                    <div className="container">
                    <p className="m-0 text-center text-white">&copy; Desenvolvido por Classificae. Todos os direitos reservados.</p>
                    <p className="m-0 text-center text-white">É uma plataforma digital que auxilia na divulgação de Empresas e seus segmentos.</p>
                    </div>
                </footer>
            </div>
            </div>;
    
        return <div className="col-12 mb-5 mt-4 text-center" style={{ display: !loading ? 'none' : '' }}>
            {renderLoading()}
        </div>   
    }

    return (
        <div>
            <Header title={company === null ? 'Carregando...' : company['name']}
                facebook={company === null ? '' : company.information.redes.facebook}
                instagram={company === null ? '' : company.information.redes.instagran}
                whatsapp={company === null ? '' : company.information.redes.whats}
                login={(change: boolean) => setShowLogin(change)} />

            <Login showLogin={showLogin} changeLogin={(change: boolean) => setShowLogin(change)} />
            {renderPage()}
        </div>
    );
};

export default View;