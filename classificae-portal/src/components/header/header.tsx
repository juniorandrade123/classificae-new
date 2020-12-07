import { Icon } from 'ionicons/dist/types/components/icon/icon';
import React, { useEffect, useState } from 'react';
import './header.scss';
import ReactTooltip from 'react-tooltip';
import Login from '../login/login';



const Header: React.FC<
    {
        title?: string,
        facebook?: string,
        instagram?: string,
        whatsapp?: string,
        login: (change: boolean) => void,
    }> = ({
        title = null,
        facebook = null,
        instagram = null,
        whatsapp = null,
        login,
    }) => {

        const [auth, setAuth] = useState<any | null>(null);

        useEffect(() => {  
            
            let userInfo:any = sessionStorage.getItem('user-info');
            if (userInfo !== undefined && userInfo !== null) {
                userInfo = JSON.parse(userInfo);
                setAuth(userInfo);
            }

        }, []);

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-header fixed-top">                

                <ReactTooltip place={'bottom'} />
                <div className="container">
                    <div className="row col-12 ml-auto mr-auto">
                        <div className="col-3 mt-3 back" style={{ display: window.location.pathname === '/view' ? '' : 'none' }}>
                            <a href="/">
                                <span>
                                    <i data-tip="Voltar para o ínicio" className="fa fa-arrow-left mr-2" aria-hidden="true"></i> Voltar para o ínicio                            
                                </span>
                            </a>
                        </div>
                        <div className={window.location.pathname === '/view' ? 'col-6 text-center nav-name' : 'col-6 nav-name'}>
                            <a style={{ display: title === null ? '' : 'none' }} className="navbar-brand" href="/">
                                <span>Classifica</span><span className="tage-header">e</span>
                            </a>
                            <p style={{ display: title === null ? 'none' : '' }} className="navbar-brand-p">
                                <span>{title}</span>
                            </p>
                        </div>

                        <div className={window.location.pathname === '/view' ? 'col-3 nav-icons' : 'col-6 nav-icons'}>
                            <div className="collapse navbar-collapse" id="navbarResponsive">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link navbar-icons" href={facebook === null ? 'https://www.facebook.com/classificae/' : facebook} target="blank">
                                            <i data-tip="Facebook" className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link navbar-icons" href={instagram === null ? 'https://www.instagram.com/classificae/' : instagram} target="blank">
                                            <i data-tip="Instagram" className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link navbar-icons" href={whatsapp === null ? 'https://wa.me/message/PYKGLF2ELGGDG1' : whatsapp} target="blank">
                                            <i data-tip="Whatsapp" className="fa fa-whatsapp"></i>
                                        </a>
                                    </li>
                                    {/* <li className="nav-item active ml-auto">
                                        <div className="nav-link navbar-icons">
                                            <i onClick={() => login(true)} data-tip="Entrar/Registrar" className="fa fa-user-circle-o" aria-hidden="true"></i>
                                        </div>
                                    </li> */}
                                </ul>
                            </div>
                        </div>

                        {/* <div className={window.location.pathname === '/view' ? 'col-3 nav-icons' : 'col-4 nav-icons '}>
                            <ul style={{display: !auth ? '' : 'none'}} className="navbar-nav ml-auto">
                                
                            </ul>
                            <ul style={{display: !auth ? 'none' : ''}} className="navbar-nav ml-auto">
                                <li className="nav-item active ml-auto">
                                    <div className="nav-link navbar-icons">
                                        <button type="button" className="btn btn-light">
                                            {'Olá ' + auth?.user?.name}
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div> */}

                    </div>
                </div>
            </nav>
        );
    };

export default Header;