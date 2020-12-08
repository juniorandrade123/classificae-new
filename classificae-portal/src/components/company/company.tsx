import React, { useEffect, useState } from 'react';
import api from '../../api';
import './company.scss';
import ReactTooltip from 'react-tooltip';


const Company: React.FC<{
    search: string
}> = ({search}) => {

    const [listCompanys, setListCompanys] = useState([]);
    const [listCompanysDraft, setListCompanysDraft] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {        
        getCompany('listGoldCompanys');
        getCompany('listCompanys');
    }, [search]);

    const getCompany = (url: string) => {
        setLoading(true);
        setListCompanys([]);
        setListCompanysDraft([]);
        api.get(url)
        .then((node: any) => {
            
            if (search !== '') {     
                if (url === 'listGoldCompanys') {   
                    setListCompanys(node.data.company.filter((a: any) => a.name.toUpperCase().includes(search.toUpperCase())
                    || a.description.toUpperCase().includes(search.toUpperCase())
                    || a.keywords.toUpperCase().includes(search.toUpperCase())
                    || a.segment.toUpperCase().includes(search.toUpperCase())));
                } else {
                    setListCompanysDraft(node.data.company.filter((a: any) => a.name.toUpperCase().includes(search.toUpperCase())
                    || a.description.toUpperCase().includes(search.toUpperCase())
                    || a.keywords.toUpperCase().includes(search.toUpperCase())
                    || a.segment.toUpperCase().includes(search.toUpperCase())));
                }
            } else {
                if (url === 'listGoldCompanys') {
                    setListCompanys(node.data.company);
                } else {
                    setListCompanysDraft(node.data.company);
                }
            }

            setLoading(false);
        });
    }

    const goToView = (item: any) => {
        localStorage.setItem('company', JSON.stringify(item));
        window.location.href = 'view';
    }

    const renderLoading = () => {
        return <div className="lds-ripple"><div></div><div></div></div>
    }

    const renderNotFound = () => {
        return <div className="d-flex justify-content-center">
            <div className="col-12 p-5 alert alert-info" role="alert">
                Nenhum registro encontrado
            </div>            
        </div>
    }

    return (
        <div className="row text-center">      

                <ReactTooltip place={'top'} />    

                <div className="col-12 mb-5 mt-4" style={{ display: !loading ? 'none' : '' }}>
                    {renderLoading()}
                </div>

                <div className="col-12 mb-5 mt-4" style={{ display: !loading && listCompanys.length === 0 && listCompanysDraft.length === 0 ? '' : 'none' }}>
                    {renderNotFound()}
                </div>

                <div className="col-12 mb-4 text-left" style={{display: listCompanys.length > 0 ? '' : 'none'}}>
                    <h2 className="font-weight-bold">Empresas Patrocinadoras</h2>
                </div>

            {
                listCompanys.map((item: any, i: number) => (
                    <div className="col-lg-3 col-md-6 mb-4" key={i}>
                        <div className="card h-100 card-company">
                            <img className="card-img-top" src={item.image_logo} alt="" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                            </div>
                            <div className="card-footer btn-actions">
                                <div className="row">
                                    <div className="col-4 btn-icons">
                                        <h3 data-tip="Curtir"><i title="Curtir" className="fa fa-thumbs-o-up" aria-hidden="true"></i></h3>
                                    </div>
                                    <div className="col-4 btn-icons">
                                        <h3 data-tip="Compartilhar"><i title="Compartilhar" className="fa fa-share-alt" aria-hidden="true"></i></h3>
                                    </div>
                                    <div className="col-4 btn-icons" onClick={() => goToView(item)}>
                                        <h3 data-tip="Visualizar"><i title="Visualizar" className="fa fa-eye" aria-hidden="true"></i></h3>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                ))
            }

                <div className="col-12 mb-4 text-left mt-3" style={{display: listCompanysDraft.length > 0 ? '' : 'none'}}>
                    <h2 className="font-weight-bold">Empresas em Destaque</h2>
                </div>

                {
                listCompanysDraft.map((item: any, i: number) => (
                    <div className="col-lg-3 col-md-6 mb-4" key={i}>
                        <div className="card h-100 card-company">
                            <img className="card-img-top" src={item.image_logo} alt="" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                            </div>
                            <div className="card-footer btn-actions">
                                <div className="row">
                                    <div className="col-4 btn-icons">
                                        <h3 data-tip="Curtir"><i title="Curtir" className="fa fa-thumbs-o-up" aria-hidden="true"></i></h3>
                                    </div>
                                    <div className="col-4 btn-icons">
                                        <h3 data-tip="Compartilhar"><i title="Compartilhar" className="fa fa-share-alt" aria-hidden="true"></i></h3>
                                    </div>
                                    <div className="col-4 btn-icons" onClick={() => goToView(item)}>
                                        <h3 data-tip="Visualizar"><i title="Visualizar" className="fa fa-eye" aria-hidden="true"></i></h3>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
                         
    );
};

export default Company;