import { Icon } from 'ionicons/dist/types/components/icon/icon';
import React from 'react';
import './header.scss';
import ReactTooltip from 'react-tooltip';



const Header: React.FC = () => {    

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-header fixed-top">
            <ReactTooltip place={'bottom'} />
            <a href="/" className="back" style={{display: window.location.pathname === '/view' ? '' : 'none'}}>
                <span>
                    <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>
                    voltar para inicio
                </span>
            </a>
            <div className="container">
                <a className="navbar-brand" href="/">
                    <span>Classifica</span><span className="tage-header">e</span>
                </a>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link navbar-icons" href="https://www.facebook.com/classificae/" target="blank">
                                <i data-tip="Facebook" className="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link navbar-icons" href="https://www.instagram.com/classificae/" target="blank">
                                <i data-tip="Instagram" className="fa fa-instagram"></i>
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link navbar-icons" href="https://wa.me/message/PYKGLF2ELGGDG1" target="blank">
                                <i data-tip="Whatsapp" className="fa fa-whatsapp"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;