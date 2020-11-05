import React from 'react';
import './view.scss';

const View: React.FC = () => {
    return (
        <div className="mt-5">
            <div className="container mt-5">                                    
                <div className="row align-items-center my-5 view">                                        
                    <div className="col-lg-7">
                        <img className="img-fluid rounded mb-4 mb-lg-0" src="http://placehold.it/900x400" alt="" />
                    </div>
                    <div className="col-lg-5">
                        <h1 className="font-weight-light">Business Name or Tagline</h1>
                        <p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
                        <a className="btn btn-primary" href="#">Call to Action!</a>
                    </div>
                </div>
                <div className="card text-white bg-secondary my-5 py-4 text-center">
                    <div className="card-body">
                        <p className="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Card One</h2>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                        </div>
                        <div className="card-footer">
                            <a href="#" className="btn btn-primary btn-sm">More Info</a>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Card One</h2>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                        </div>
                        <div className="card-footer">
                            <a href="#" className="btn btn-primary btn-sm">More Info</a>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Card One</h2>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                        </div>
                        <div className="card-footer">
                            <a href="#" className="btn btn-primary btn-sm">More Info</a>
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
        </div>
    );
};

export default View;