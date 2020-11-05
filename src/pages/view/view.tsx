import React, {useState, useEffect} from 'react';
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
                <div className="container mt-5">                                    
                    <div className="row align-items-center my-5 view">                                        
                        <div className="col-lg-7">
                            <img className="img-fluid rounded mb-4 mb-lg-0" src="http://placehold.it/900x400" alt="" />
                        </div>
                        <div className="col-lg-5">
                            <h1 className="font-weight-bold">{company['name']}</h1>                        
                            <h6>{company['keywords']}</h6>
                            <h6>{company['description_all']}</h6>                                                                       
                            {/* <a className="btn btn-primary" href="#">Call to Action!</a> */}
                        </div>
                    </div>
                    <div className="card text-white bg-secondary my-5 py-4 text-center">
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
                            <div className="card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Contato</h3>
                                <p className="card-text">
                                    <b>Telefone:</b> {company?.contact?.tel}<br></br>
                                    <b>Celular:</b> {company?.contact?.cel}<br></br>
                                    <b>E-mail:</b> {company?.contact?.email === '' ? 'contato@classificae.com.br' : company?.contact?.email}
                                </p>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-5">
                            <div className="card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Formas de pagamento</h3>
                                <div className="card-text">
                                <h5>{company?.address?.description}</h5> 
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-5">
                            <div className="card h-100">
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
                    <p className="m-0 text-center text-white">&copy; Classificae 2020</p>
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