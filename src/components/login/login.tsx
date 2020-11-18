import React from 'react';
import './login.scss';

import { useForm } from "react-hook-form";
import api from '../../api';

const Login: React.FC<
    {
        showLogin: boolean,
        changeLogin: (change: boolean) => void
    }> = ({
        showLogin,
        changeLogin
    }) => { 

        const { register, handleSubmit, watch, errors } = useForm();        

        const login = (data: any) => {
            console.log(data);
            api.post('login/', {'email': data.email, 'password': data.password})
            .then((node: any) => {
                sessionStorage.setItem('user-info', JSON.stringify(node.data));
                window.location.reload();
            });
        }

        const onSubmit = (data: any) => login(data);

        return (
            <div style={{ display: showLogin ? 'block' : 'none' }} className="modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-header">
                                <h5 className="col-12 modal-title" id="exampleModalLabel">ENTRAR</h5>
                            </div>
                            <div className="modal-body">
                                <label>E-mail</label>
                                <input type="email" className="form-control" name="email" defaultValue="" ref={register({ required: true })} required/>

                                <label className="mt-3">Senha</label>
                                <input type="password" className="form-control" name="password" ref={register({ required: true })} />
                            </div>
                            <div className="modal-footer">
                                <div className="row col-12">
                                    <div className="col-6">
                                        <button onClick={() => changeLogin(false)} type="button" className="w-100 btn btn-secondary" data-dismiss="modal">Sair</button>
                                    </div>
                                    <div className="col-6 text-right">
                                        <button type="submit" className="w-100 btn btn-primary">Entrar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

export default Login;