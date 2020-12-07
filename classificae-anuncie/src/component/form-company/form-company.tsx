import './form-company.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import api from '../../api';
import companyModel from './model/company';
import { ToastContainer, toast } from 'react-toastify';
import { css } from "@emotion/core";
import ImageUploader from 'react-images-upload';
import { PuffLoader } from 'react-spinners';

import 'react-toastify/dist/ReactToastify.css';


export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick(tick => tick + 1);
    }, [])
    return update;
}

const FormCompany: React.FC = () => {
    const forceUpdate = useForceUpdate();
    const { register, handleSubmit, watch, errors, setValue, getValues } = useForm();
    const notifySuccess = (message: string) => toast.success(message);
    const notifyError = (message: string) => toast.error(message);

    const [company, setCompany] = useState<companyModel | null>(null);
    const [checkMoney, setCheckMoney] = useState<any | null>(false);
    const [checkCredit, setCheckCredit] = useState<any | null>(false);
    const [checkDebit, setCheckDebit] = useState<any | null>(false);
    const [loading, setLoading] = useState<any | null>(false);   
    const [schedule, setSchedule] = useState<any | null>([]);

    const [logo, setLogo] = useState('');
    const [galeria, setGaleria] = useState<any | null>([]);

    const override = css`
        display: block;
        margin: 0 auto;
        `;

    let userInfo = window.sessionStorage.getItem('user-info');

    const onSubmit = (data: any) => {
        populateDTO(data);
    };

    useEffect(() => {
        if (userInfo !== null) {
            getCompany(userInfo);
        }
    }, []);

    const getCompany = async (user: any) => {

        if (user !== undefined) {
            setLoading(true);
            await api.get('GetId/' + JSON.parse(user).user.id, {
                headers: {
                    'x-access-token': user?.token //the token is a variable which holds the token
                }
            })
                .then((node: any) => {
                    setCompany(node.data[0]);
                    setLogo(node.data[0].image_logo);
                    setLoading(false);       
                    
                    let images_galeria:any[] = [];
                    Object.keys(node.data[0].image_galeria).map((item: any, i) => {
                        images_galeria.push(node.data[0].image_galeria[item]);
                    });
                    
                    setGaleria(images_galeria);
                    setSchedule(node.data[0].information.schedule);

                    forceUpdate();
                })
                .catch((err: any) => { console.error(err); setLoading(false); });
        }
    }

    const populateDTO = (data: any) => {
        let dto: companyModel = new companyModel();

        if (userInfo !== null) {
            let idUser: any = JSON.parse(userInfo);

            if (company !== null) {
                dto = company;
                dto.name = data.nome;     
                dto.description_all = data.description_all;
                dto.description = data.description;
                dto.contact.cel = data.cel;
                dto.contact.tel = data.tel;
                dto.contact.email = data.email;
                dto.address.map = data.maps;
                dto.information.redes.facebook = data.facebook;
                dto.information.redes.instagran = data.instagram;
                dto.information.redes.whats = data.whats;
                dto.id = idUser?.user?.id;
                dto.information.payment.money = checkMoney;
                dto.information.payment.credit = checkCredit;
                dto.information.payment.debit = checkDebit;
                dto.image_logo = logo;
                dto.information.schedule = schedule;
                dto.segment = data.segment;
                dto.keywords = data.keywords;
            }

            console.log(dto)

            createOrUpdate(dto);
        }

    }

    const createOrUpdate = (dto: any) => {
        setLoading(true);
        api.post('CreateUpdateCompany', dto)
            .then(async (node: any) => {
                console.log(node.data)
                if (node.data.status) {
                    notifySuccess('Dados alterados com sucesso');
                    await getCompany(userInfo);
                } else {
                    notifyError('Não foi possivel alterar os dados');
                }

                setLoading(false);
            })
            .catch((err: any) => { console.error(err); setLoading(false); });
    }

    const renderLoading = () => {
        return <div className="sweet-loading mt-5">
            <PuffLoader
                css={override}
                size={150}
                loading={loading}
            />
        </div>
    }

    const changeImage = (files: any, pictures: any, singleImage: boolean) => {
        if (singleImage)
            setLogo(pictures[0]);
        else {
            if (galeria.length === 0) {
                let list: any = [];
                list.push({id: 0, base64: pictures[0]});
                setGaleria(list);
            }
            else {                
                pictures.forEach((item: any) => {
                    let consulting = company?.image_galeria.filter(a => a.base64 === item);
                    if (consulting?.length === 0)
                        company?.image_galeria.push({id: 0, base64: item})
                })
                setGaleria(company?.image_galeria);
            }
        }
    }    

    const renderUploadImage = (singleImage: boolean) => {
        return <ImageUploader
            withIcon={true}
            buttonText='Selecione'
            onChange={(files, pictures) => changeImage(files, pictures, singleImage)}
            imgExtension={['.jpg', '.png']}
            label='Tamanho maximo do arquivo: 5mb'
            maxFileSize={5242880}
            singleImage={singleImage}
        />
    }

    const deleteLogo = () => {
        setLogo('');
    }

    const deleteGaleria = (img: any) => {
        if (company !== null) {
            company.image_galeria = company?.image_galeria.filter(a => a.base64 !== img.base64);
            setGaleria(company.image_galeria);
        }
    }

    const createSchedule = () => {
        let valuesForm = getValues();
        let listInsert: any = schedule;

        listInsert.push({
            day_week_start: valuesForm.day_week_start,
            day_week_end: valuesForm.day_week_end,
            hour_start: valuesForm.hour_start,
            hour_end: valuesForm.hour_end,
        });

        setSchedule(listInsert);
        forceUpdate();
    }

    const removeScheduling = (scheduling: any) => {
        let listInsert: any = schedule;
        const index = listInsert.indexOf(scheduling);
        if (index > -1) {
            listInsert.splice(index, 1);
        }
        setSchedule(listInsert);
        forceUpdate();
    }

    const renderPage = () => {
        return <div className="form-company">
            <ToastContainer />
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand col-12 text-center" href="#">Classificae</a>
            </nav>

            {renderLoading()}

            <div className="container" style={{ display: loading ? 'none' : '' }}>
                <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="border p-2 mt-5">
                        <legend className="w-auto">Preencha os dados da sua empresa</legend>
                        <div className="row">                           
                            <div className="col-12">
                                <label>Nome</label>
                                <input className="form-control" type="text" name="nome" id="nome" defaultValue={company?.name} ref={register({ required: true })} required />
                            </div>
                            <div className="col-12 mt-2">
                                <label>Descrição breve</label>
                                <textarea className="form-control" name="description" id="description" cols={30} rows={5} defaultValue={company?.description} ref={register({ required: true })} required></textarea>
                            </div>
                            <div className="col-12 mt-2">
                                <label>Conheça</label>
                                <textarea className="form-control" name="description_all" id="description_all" cols={30} rows={5} defaultValue={company?.description_all} ref={register({ required: true })} required></textarea>
                            </div>
                            <div className="col-12 mt-2">
                                <label>Segmento</label>
                                <input placeholder="Exemplo: Vestuários, Confecção" className="form-control" type="text" name="segment" id="segment" defaultValue={company?.segment} ref={register({ required: true })} required />
                            </div>
                            <div className="col-12 mt-2">
                                <label>Palavras-Chave</label>
                                <input placeholder="Exemplo: Carros, Motor" className="form-control" type="text" name="keywords" id="keywords" defaultValue={company?.keywords} ref={register({ required: true })} required />
                            </div>
                            <div className="col-4 mt-2">
                                <label>Telefone</label>
                                <input type="tel" className="form-control" name="tel" id="tel" defaultValue={company?.contact?.tel} ref={register({ required: true })} required />
                            </div>
                            <div className="col-4 mt-2">
                                <label>Celular</label>
                                <input type="tel" className="form-control" name="cel" id="cel" defaultValue={company?.contact?.cel} ref={register({ required: true })} required />
                            </div>
                            <div className="col-4 mt-2">
                                <label>E-mail</label>
                                <input type="email" className="form-control" name="email" id="email" defaultValue={company?.contact?.email} ref={register({ required: true })} required />
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
                                        <input onChange={() => setCheckDebit(!checkDebit)} type="checkbox" className="form-check-input" id="debito"
                                            defaultChecked={company?.information?.payment?.debit} ref={register()} />
                                        <label className="form-check-label" htmlFor="debito">Cartão de débito</label>
                                    </div>
                                    <div className="col-2">
                                        <input onChange={() => setCheckCredit(!checkCredit)} type="checkbox" className="form-check-input" id="credito"
                                            defaultChecked={company?.information?.payment?.credit} ref={register()} />
                                        <label className="form-check-label" htmlFor="credito">Cartão de crédito</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-2">
                                <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                                    <label>Horário de atendimento</label>
                                    <div className="row">
                                    <div className="col-3">
                                        <select className="form-control" name="day_week_start" id="day_week_start" defaultValue="" ref={register()}>
                                            <option value="">Selecione o dia inicial</option>
                                            <option value="Segunda-Feira">Segunda-Feira</option>
                                            <option value="Terca-Feira">Terca-Feira</option>
                                            <option value="quarta">Quarta-Feira</option>
                                            <option value="Quarta-Feira">Quinta-Feira</option>
                                            <option value="Sexta-Feira">Sexta-Feira</option>
                                            <option value="Sabado">Sabado</option>
                                            <option value="Domingo">Domingo</option>
                                        </select>
                                    </div>
                                    <div className="col-3">
                                        <select className="form-control" name="day_week_end" id="day_week_end" defaultValue="" ref={register()}>
                                            <option value="">Selecione o dia final</option>
                                            <option value="Segunda-Feira">Segunda-Feira</option>
                                            <option value="Terca-Feira">Terca-Feira</option>
                                            <option value="quarta">Quarta-Feira</option>
                                            <option value="Quarta-Feira">Quinta-Feira</option>
                                            <option value="Sexta-Feira">Sexta-Feira</option>
                                            <option value="Sabado">Sabado</option>
                                            <option value="Domingo">Domingo</option>
                                        </select>
                                    </div>
                                    <div className="col-2">
                                        <input placeholder="horario inicio" type="text" className="form-control" id="hour_start" name="hour_start" defaultValue="" ref={register()} />
                                    </div>
                                    <div className="col-2">
                                        <input placeholder="horario final" type="text" className="form-control" id="hour_end" name="hour_end" defaultValue="" ref={register()} />
                                    </div>
                                    <div className="col-2">
                                        <button type="button" className="form-control btn-primary" onClick={() => createSchedule()}>Adicionar</button>
                                    </div>
                                    <div className="col-12 mt-2" style={{display: schedule.length === 0 ? 'none' : ''}}>
                                            <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Dia incial</th>
                                                        <th scope="col">Dia final</th>
                                                        <th scope="col">Horario de abertura</th>
                                                        <th scope="col">Horario de fechamento</th>
                                                        <th scope="col">Ação</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        schedule.map((item: any, i: number) => (
                                                            <tr key={i}>
                                                                <td>{item.day_week_start}</td>
                                                                <td>{item.day_week_end}</td>
                                                                <td>{item.hour_start}</td>
                                                                <td>{item.hour_end}</td>
                                                                <td>
                                                                    <button onClick={() => removeScheduling(item)} type="button" className="btn btn-danger col-12">Excluir</button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                            </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                            <div className="col-12 mt-2">
                                <label>Google Maps</label>
                                <textarea className="form-control" name="maps" id="maps" cols={30} rows={5} defaultValue={company?.address?.map} ref={register({ required: true })} required></textarea>
                            </div>
                            <div className="col-4 mt-2">
                                <label>Facebook</label>
                                <input className="form-control" type="text" name="facebook" id="facebook" ref={register()} defaultValue={company?.information?.redes.facebook} />
                            </div>
                            <div className="col-4 mt-2">
                                <label>Instagram</label>
                                <input className="form-control" type="text" name="instagram" id="instagram" ref={register()} defaultValue={company?.information?.redes.instagran} />
                            </div>
                            <div className="col-4 mt-2">
                                <label>Whatsapp</label>
                                <input className="form-control" type="text" name="whats" id="whats" ref={register()} defaultValue={company?.information?.redes.whats} />
                            </div>
                            <div className="col-12 mt-2">
                                <label>Logo</label>
                                {renderUploadImage(true)}
                            </div>
                            <div className="col-12" style={{ display: logo === '' ? 'none' : '' }}>
                                <div className="card" style={{ width: '10rem' }}>
                                    <img className="card-img-top" src={logo} alt="Card image cap" />
                                    <div className="card-body">
                                        <button onClick={() => deleteLogo()} type="button" className="btn btn-danger col-12">Excluir</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12" style={{ display: logo === '' ? 'none' : '' }}>
                                <hr />
                            </div>
                            <div className="col-12 mt-2">
                                <label>Galeria</label>
                                {renderUploadImage(false)}
                            </div>
                            <div className="col-12" style={{ display: galeria.length === 0 ? 'none' : '' }}>
                                <div className="row ml-auto mr-auto">
                                    {                                
                                            galeria.map((item: any, index: number) => (
                                                <div key={index} className="card" style={{ width: '10rem' }}>
                                                    <img className="card-img-top" src={item.base64} alt="Card image cap" />
                                                    <div className="card-body">
                                                        <button onClick={() => deleteGaleria(item)} type="button" className="btn btn-danger col-12">Excluir</button>
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div className="row">
                        <div className="col-6 mt-4"></div>
                        <div className="col-6 mt-4 mb-4">
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