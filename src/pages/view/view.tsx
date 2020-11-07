import React, {useState, useEffect} from 'react';
import ReactTooltip from 'react-tooltip';

import AwesomeSlider from 'react-awesome-slider';

import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';

import './view.scss';

const View: React.FC = () => {

    const [company, setCompany] = useState<any | null>(null);

    useEffect(() => {
        const local = localStorage.getItem('company');
        if (local !== undefined && local !== null) {
            setCompany(JSON.parse(local));
        }

        console.log(company);
    }, [])

    const renderPage = () => {
        if (company !== null && company !== undefined)
            return <div className="mt-5">
                <ReactTooltip place={'bottom'} />
                <div className="container mt-5">                                    
                    <div className="row align-items-center my-5 view">                                        
                        <div className="col-lg-7">
                            <AwesomeSlider animation="cubeAnimation">
                                {
                                    Object.keys(company.image_galeria).map((item: any, i) => (
                                        <div key={i} data-src={company.image_galeria[item].base64} />             
                                    ))
                                }
                            </AwesomeSlider>
                        </div>
                        <div className="col-lg-5 view-img">
                            <h1 className="font-weight-bold">{company['name']}</h1>                        
                            <h6>{company['keywords']}</h6>
                            <h6>{company['description_all']}</h6>                                                                       
                            <div className="row">
                                <div className="col-2 p-0" style={{display: company.information.redes.facebook === '' ? 'none' : ''}}>
                                    <a className="nav-link navbar-icons social_client" href={company.information.redes.facebook} target="blank">
                                        <i data-tip="Siga-nos no Facebook" className="fa fa-facebook"></i>
                                    </a>
                                </div>
                                <div className="col-2 p-0" style={{display: company.information.redes.instagran === '' ? 'none' : ''}}>
                                    <a className="nav-link navbar-icons social_client" href={company.information.redes.instagran} target="blank">
                                        <i data-tip="Siga-nos no Instagram" className="fa fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card text-white bg-secondary my-5 py-4 text-center view-address">
                        <div className="card-body">
                            <div className="text-white m-0">
                                <div className="row text-center">
                                    <h3 className="col-12 text-center">{company?.address?.description}</h3> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-5">
                            <div className="card-view card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Contato</h3>
                                <p className="card-text">
                                    <b>Telefone:</b> {'(' + company.contact.tel.substr(0, 2) + ') ' + company.contact.tel.substr(2, 4) + '-' + company.contact.tel.substr(6,4)}<br></br>
                                    <b>Celular:</b> {'(' + company.contact.cel.substr(0, 2) + ') ' + company.contact.cel.substr(2, 5) + '-' + company.contact.cel.substr(6,4)}<br></br>
                                    <b>E-mail:</b> {company?.contact?.email === '' ? 'contato@classificae.com.br' : company?.contact?.email}
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
                </div>
                <footer className="py-5 bg-dark">
                    <div className="container">
                    <p className="m-0 text-center text-white">&copy; Desenvolvido por Classificae. Todos os direitos reservados.</p>
                    <p className="m-0 text-center text-white">É uma plataforma digital que auxilia na divulgação de Empresas e seus segmentos.</p>
                    </div>
                </footer>
            </div>;
    
        return <div></div>    
    }

    return (
        renderPage()
    );
};

export default View;