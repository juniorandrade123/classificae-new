import { Icon } from 'ionicons/dist/types/components/icon/icon';
import React from 'react';
import './header.scss';
import ReactTooltip from 'react-tooltip';



const Header: React.FC<
{
    title?: string,
    facebook?: string,
    instagram?:string,
    whatsapp?:string
}> = ({
        title = null,
        facebook = null,
        instagram = null,
        whatsapp = null
    }) => {    

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-header fixed-top">
            <ReactTooltip place={'bottom'} />            
            <div className="container">
                <div className="row col-12 ml-auto mr-auto">
                    <div className="col-3 mt-3 back" style={{display: window.location.pathname === '/view' ? '' : 'none'}}>
                    <a href="/">
                        <span>
                            <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>
                            voltar para inicio
                        </span>
                    </a>
                    </div>
                    <div className={window.location.pathname === '/view' ? 'col-7 text-center nav-name' : 'col-6 nav-name'}>
                        <a style={{display: title === null ? '' : 'none'}} className="navbar-brand" href="/">
                            <span>Classifica</span><span className="tage-header">e</span>
                        </a>
                        <p style={{display: title === null ? 'none' : ''}} className="navbar-brand-p">
                            <span>{title}</span>
                        </p>
                    </div>
                    
                    <div className={window.location.pathname === '/view' ? 'col-2 nav-icons' : 'col-6 nav-icons'}>
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
                    </ul>
                </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;