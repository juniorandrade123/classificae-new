import './form-company.scss';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import api from '../../api';
import companyModel from './model/company';

const FormCompany: React.FC = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    let [company, setCompany] = useState<companyModel | null>(null);
    let [checkMoney, setCheckMoney] = useState<any | null>(false);

    let userInfo = window.sessionStorage.getItem('user-info');    

    const onSubmit = (data: any) => {
        console.log(data); 
        console.log(checkMoney);
        populateDTO(data);
    };

    useEffect(() => {
        if (userInfo !== null) {
            userInfo = JSON.parse(userInfo);
            getCompany(userInfo);
        }        
    }, []);

    const getCompany = (user: any) => {     
        api.get('GetId/' + user?.user?.id, {
            headers: {
                'x-access-token': user?.token //the token is a variable which holds the token
            }
        })
        .then((node:any) => {
            setCompany(node.data[0]);
        })
        .catch((err: any) => console.error(err));
    }

    const populateDTO = (data: any) => {
        let dto:companyModel = new companyModel();

        if (company !== null)
            dto = company;

        dto.name = data.nome;

        createOrUpdate(dto);
    }

    const createOrUpdate = (dto: any) => {
        api.post('CreateUpdateCompany', dto)
        .then((node: any) => {
            console.log(node);
        })
        .catch((err: any) => console.error(err));
    }

    const changeCheckMoney = () => {
        let changeMoney:any = company;
        if (changeMoney?.information?.payment?.money)
            changeMoney.information.payment.money = false
        else 
            changeMoney.information.payment.money = true

        setCompany(changeMoney);
    }

    const renderPage = () => {
        return <div className="form-company">
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand col-12 text-center" href="#">Classificae</a>
            </nav>
            <div className="container">
                <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="border p-2 mt-5">
                <legend className="w-auto">Preencha os dados da sua empresa</legend>
                    <div className="row">
                        <div className="col-12">
                            <label>Nome</label>
                            <input className="form-control" type="text" name="nome" id="nome" defaultValue={company?.name} ref={register({ required: true })} required />
                        </div>
                        <div className="col-12 mt-2">
                            <label>Conheça</label>
                            <textarea className="form-control" name="conheca" id="conheca" cols={30} rows={5} defaultValue={company?.description_all} ref={register({ required: true })} required></textarea>
                        </div>
                        <div className="col-4 mt-2">
                            <label>Telefone</label>
                            <input type="tel" className="form-control" name="tel" id="tel" defaultValue={company?.contact?.tel} ref={register({ required: true })} required/>
                        </div>
                        <div className="col-4 mt-2">
                            <label>Celular</label>
                            <input type="tel" className="form-control" name="cel" id="cel" defaultValue={company?.contact?.cel} ref={register({ required: true })} required/>
                        </div>
                        <div className="col-4 mt-2">
                            <label>E-mail</label>
                            <input type="email" className="form-control" name="email" id="email" defaultValue={company?.contact?.email} ref={register({ required: true })} required/>
                        </div>
                        <div className="col-12 mt-2">
                            <label>Formas de pagamento</label>
                            <div className="row m-auto pl-1">
                                <div className="col-2">
                                    <input onChange={() => setCheckMoney(!checkMoney)} type="checkbox" className="form-check-input" id="dinheiro" 
                                        defaultChecked={company?.information?.payment?.money} ref={register()} />
                                    <label className="form-check-label" htmlFor="dinheiro">Dinheiro</label>
                                </div>
                                <div className="col-2">
                                    <input type="checkbox" className="form-check-input" id="debito" checked={company?.information?.payment?.debit} 
                                    defaultValue={company?.information.payment.debit.toString()} ref={register()} />
                                    <label className="form-check-label" htmlFor="debito">Cartão de débito</label>
                                </div>
                                <div className="col-2">
                                    <input type="checkbox" className="form-check-input" id="credito" checked={company?.information?.payment?.credit} 
                                    defaultValue={company?.information?.payment?.credit.toString()} ref={register()} />
                                    <label className="form-check-label" htmlFor="credito">Cartão de crédito</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-2">
                            <label>Horário de atendimento</label>
                            <div className="row">
                                <div className="col-3">
                                    <select className="form-control" name="dia" id="dia_inicial" defaultValue="" ref={register()}>
                                        <option value="">Selecione o dia inicial</option>
                                        <option value="segunda">Segunda-Feira</option>
                                        <option value="terca">Terca-Feira</option>
                                        <option value="quarta">Quarta-Feira</option>
                                        <option value="quinta">Quinta-Feira</option>
                                        <option value="sexta">Sexta-Feira</option>
                                        <option value="sabado">Sabado-Feira</option>
                                        <option value="domingo">Domingo-Feira</option>
                                    </select>
                                </div>
                                <div className="col-3">
                                    <select className="form-control" name="dia" id="dia_final" defaultValue="" ref={register()}>
                                        <option value="">Selecione o dia final</option>
                                        <option value="segunda">Segunda-Feira</option>
                                        <option value="terca">Terca-Feira</option>
                                        <option value="quarta">Quarta-Feira</option>
                                        <option value="quinta">Quinta-Feira</option>
                                        <option value="sexta">Sexta-Feira</option>
                                        <option value="sabado">Sábado</option>
                                        <option value="domingo">Domingo</option>
                                    </select>
                                </div>
                                <div className="col-3">
                                    <input placeholder="Digite o horario" type="text" className="form-control" id="horario" name="horario" defaultValue="" ref={register()}/>
                                </div>
                                <div className="col-3">
                                    <button type="button" className="form-control btn-primary">Adicionar</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-2">
                            <label>Google Maps</label>
                            <textarea className="form-control" name="maps" id="maps" cols={30} rows={5} defaultValue={company?.address?.map}  ref={register({ required: true })} required></textarea>
                        </div>                        
                    </div>
                </fieldset>
                <div className="row">
                    <div className="col-6 mt-4"></div>
                    <div className="col-6 mt-4">
                        <button type="submit" className="form-control btn-success">Salvar</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    }

    return (
        renderPage()
    );
}

export default FormCompany;