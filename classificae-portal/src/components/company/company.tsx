import React, { useCallback, useEffect, useState } from 'react';
import api from '../../api';
import './company.scss';
import ReactTooltip from 'react-tooltip';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Fade } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick(tick => tick + 1);
    }, [])
    return update;
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      left: 0,
      right: 0,
      margin: 'auto',
      top: '5%'
    },
  }),
);

const Company: React.FC<{
    search: string
}> = ({search}) => {

    const forceUpdate = useForceUpdate();
    const [listCompanys, setListCompanys] = useState([]);
    const [listCompanysDraft, setListCompanysDraft] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [idCompany, setIdCompany] = useState('');

    const { register, handleSubmit, watch, errors, setValue, getValues } = useForm();
    const notifySuccess = (message: string) => toast.success(message);
    const [emailUser, setEmailUser] = useState<any | ''>(localStorage.getItem('email-user'));
    const [like, setLike] = useState(false);

    useEffect(() => {   
        getCompany();   
        console.log(emailUser); 
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
        localStorage.setItem('id-company', item);
        window.location.href = 'view/' + item;
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

    const handleOpen = (id: string, isLike: number) => {     
        setIdCompany(id);
        setLike(isLike === 0);
        forceUpdate();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendLike = (data: any) => {
        api.post('like', {id: idCompany, email: data.email})
        .then((node: any) => {
            if (like) {
                notifySuccess('Empresa curtida com sucesso');
            } else {
                notifySuccess('Empresa descurtida com sucesso');
            }

            localStorage.setItem('email-user', data.email);
            setEmailUser(data.email);
            handleClose();
            getCompany(); 
        })
        .catch((err: any) => console.error(err))
    }

    const renderModal = () => {
        return <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <p className="col-12 text-center">
                            <h2 style={{display: like ? '' : 'none'}} id="spring-modal-title">Curtir</h2>
                            <h2 style={{display: like ? 'none' : ''}} id="spring-modal-title">Descurtir</h2>
                            <h5 style={{display: emailUser === null ? '' : 'none'}} id="spring-modal-description">Informe seu e-mail para curtir</h5>
                        </p>                        
                        
                        <p>
                            <form className="needs-validation" onSubmit={handleSubmit(sendLike)}>
                                <input style={{display: emailUser === null ? '' : 'none'}} type="email" defaultValue={emailUser} className="form-control" ref={register({ required: true })} id="email" name="email" required/>
                                <div className="row m-auto">
                                    <button type="button" onClick={() => handleClose()} className="btn btn-danger mt-3 col-5 mr-1 ml-auto">Sair</button> 
                                    <button type="submit" className="btn btn-primary mt-3 col-5 mr-auto">Confirmar</button>
                                </div>
                                
                            </form>
                        </p>
                    </div>
                </Fade>
            </Modal>
        </div>
    }

    const renderIconsLike = (idCompany: string, userLike: any) => {
        let icon = <h3 onClick={() => handleOpen(idCompany, 0)} data-tip="Curtir"><i title="Curtir" className="fa fa-thumbs-o-up" aria-hidden="true"></i></h3>;

        if (userLike !== undefined && emailUser !== null) {
            let query = userLike.find((a: { email: string | null; }) => a.email === localStorage.getItem('email-user'));
            if (query !== undefined) {
                if (query['like'] === 1) {
                    icon = <h3 onClick={() => handleOpen(idCompany, 1)} data-tip="Descurtir"><i style={{color: '#28a745'}} title="Descurtir" className="fa fa-thumbs-up" aria-hidden="true"></i></h3>;
                }
            }
        }

        return icon;
    }

    const sharedFacebook = (id: string) => {
        let url =  window.location.href + 'view/' + id;
        let facebookWindow = window.open('https://www.facebook.com/sharer.php?u=' + url, 'facebook-popup', 'height=350,width=600');
        if (facebookWindow !== null) {
            if (facebookWindow.focus) { facebookWindow.focus(); }
            return false;
        }
    }    

    return (
        <div className="row text-center">      

                <ToastContainer />
                <ReactTooltip place={'top'} />   
                {renderModal()}                

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
                                    <div className="card-footer btn-actions">
                                            <div className="row">
                                                <div className="col-4 btn-icons">                                                    
                                                    {renderIconsLike(item._id, item['user_like'])}
                                                </div>
                                                <div className="col-4 btn-icons">
                                                    <h3 onClick={() => sharedFacebook(item._id)} data-tip="Compartilhar">                                                        
                                                            <i title="Compartilhar" className="fa fa-share-alt" aria-hidden="true"></i>                                                        
                                                    </h3>
                                                </div>
                                                <div className="col-4 btn-icons" onClick={() => goToView(item._id)}>
                                                    <h3 data-tip="Visualizar"><i title="Visualizar" className="fa fa-eye" aria-hidden="true"></i></h3>
                                                </div>
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
                                    <div className="card-footer btn-actions">
                                            <div className="row">
                                                <div className="col-4 btn-icons">
                                                    {renderIconsLike(item._id, item['user_like'])}
                                                </div>
                                                <div className="col-4 btn-icons">
                                                    <h3 onClick={() => sharedFacebook(item._id)} data-tip="Compartilhar">                                                        
                                                        <i title="Compartilhar" className="fa fa-share-alt" aria-hidden="true"></i>                                                        
                                                    </h3>
                                                </div>
                                                <div className="col-4 btn-icons" onClick={() => goToView(item._id)}>
                                                    <h3 data-tip="Visualizar"><i title="Visualizar" className="fa fa-eye" aria-hidden="true"></i></h3>
                                                </div>
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