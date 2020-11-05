import React, { useEffect, useState } from 'react';
import api from '../../api';
import './home.scss';

const Home: React.FC<{
    search: string
}> = ({search}) => {

    const [listCompanys, setListCompanys] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {        
        getApi();
    }, [search]);

    const getApi = () => {
        setLoading(true);
        setListCompanys([]);
        api.get('listCompanys')
        .then((node: any) => {
            setListCompanys(node.data.company);
            if (search !== '') {                
                setListCompanys(listCompanys.filter((a: any) => a.name.toUpperCase().includes(search.toUpperCase())
                || a.description.toUpperCase().includes(search.toUpperCase())
                || a.keywords.toUpperCase().includes(search.toUpperCase())
                || a.segment.toUpperCase().includes(search.toUpperCase())));
              }

            setLoading(false);
        });
    }

    const renderLoading = () => {
        return <div>
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Carregando...</span>
                </div>
            </div>
        </div>
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

                <div className="col-12 mb-5 mt-4" style={{ display: !loading ? 'none' : '' }}>
                    {renderLoading()}
                </div>

                <div className="col-12 mb-5 mt-4" style={{ display: !loading && listCompanys.length === 0 ? '' : 'none' }}>
                    {renderNotFound()}
                </div>

            {
                listCompanys.map((item: any, i: number) => (
                    <div className="col-lg-3 col-md-6 mb-4" key={i}>
                        <div className="card h-100">
                            <img className="card-img-top" src={item.image_logo} alt="" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                            </div>
                            <div className="card-footer btn-view">
                                Visualizar
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
                         
    );
};

export default Home;