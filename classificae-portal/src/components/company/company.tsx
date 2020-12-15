import React, { useCallback, useEffect, useState } from 'react';
import api from '../../api';
import './company.scss';
import ReactTooltip from 'react-tooltip';
import Carousel from 'react-elastic-carousel';

export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick(tick => tick + 1);
    }, [])
    return update;
}

const Company: React.FC<{
    search: string
}> = ({search}) => {

    const forceUpdate = useForceUpdate();
    const [listCompanys, setListCompanys] = useState([]);
    const [listCompanysDraft, setListCompanysDraft] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {   
        getCompany();    
    }, [search]);

    const getCompany = () => {     
        setLoading(true);       
        setListCompanysDraft([]);
        setListCompanys([]);
        api.get('listCompanys')
        .then((node: any) => {
            
            if (search !== '') {     
                setListCompanysDraft(node.data.company.filter((a: any) => a.name.toUpperCase().includes(search.toUpperCase())
                || a.description.toUpperCase().includes(search.toUpperCase())
                || a.keywords.toUpperCase().includes(search.toUpperCase())
                || a.segment.toUpperCase().includes(search.toUpperCase())));

                setListCompanys(node.data.company_gold.filter((a: any) => a.name.toUpperCase().includes(search.toUpperCase())
                || a.description.toUpperCase().includes(search.toUpperCase())
                || a.keywords.toUpperCase().includes(search.toUpperCase())
                || a.segment.toUpperCase().includes(search.toUpperCase())));
            } else {
                setListCompanysDraft(node.data.company);
                setListCompanys(node.data.company_gold);
            }

            setLoading(false);
            forceUpdate();
        });
    }

    const goToView = (item: any) => {
        localStorage.setItem('company', item);
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

    const isMobile = () => {
        let mq = window.matchMedia( "(max-width: 1024px)" );
        if (mq.matches) {
            return 1;
        }
        else {
           return 3
        }
    }

    return (
        <div className="row text-center">      

                <ReactTooltip place={'top'} />                   

                <div className="col-12 mb-5 mt-4" style={{ display: !loading && listCompanys.length === 0 && listCompanysDraft.length === 0 ? '' : 'none' }}>
                    {renderNotFound()}
                </div>

                <div className="col-12 mb-4 text-left" style={{display: listCompanys.length === 0 || loading ? 'none' : ''}}>
                    <h2 className="font-weight-bold">Empresas Patrocinadoras</h2>
                </div>

                <div className="col-12 mb-5 mt-4" style={{ display: !loading ? 'none' : '' }}>
                    {renderLoading()}
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
                                        <div className="row btn-view" onClick={() => goToView(item._id)}>
                                            <div className="col-12">
                                                <h5 data-tip="Visualizar" className="font-weight-bold">Visualizar</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                <div className="col-12 mb-4 text-left mt-3" style={{display: listCompanysDraft.length === 0 || loading ? 'none' : ''}}>
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
                                        <div className="row btn-view" onClick={() => goToView(item._id)}>
                                            <div className="col-12">
                                                <h5 data-tip="Visualizar" className="font-weight-bold">Visualizar</h5>
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