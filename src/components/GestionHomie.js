import React, { Fragment, useState, useRef, useEffect } from 'react';
import RegistrarHomie from './RegistrarHomie';
import ListaHomie from './ListaHomie';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Messages } from 'primereact/messages';
import axios from 'axios';
import Global from '../Global';

import EditarHomie from './EditarHomie';

const GestionHomie = () => {
    var url = Global.urlHomie;

    const [registro, crearRegistro] = useState(false)
    const [homiesLista, recuperaHomiesState] = useState([])
    const [recupera, actualizaReecupera] = useState(true)
    const [registroSelected, cargarRegistroSelected] = useState(null)
    const [estadoCrud, actualizarEstadoCrud] = useState('')

    let messages = useRef(null);

    const registroChange = () => {
        if (registro) {
            crearRegistro(false)
        } else {
            crearRegistro(true)
        }
    }

    const recuperarHomies = (e) => {
        axios.get(url)
            .then(res =>
                recuperaHomiesState(res.data)
            )
    }


    const terminaRegistro = creado => {
        registroChange();
        if (!creado) {
            listaRefresh(creado);
            showSuccess();
            actualizaReecupera(true)
        } else {
            showFail();
        }
    }


    const cargarSelectedHomie = (registroSelectedChild) => {
        crearRegistro(false);
        actualizarEstadoCrud('editar')
        cargarRegistroSelected(registroSelectedChild);
    }

    const terminaActualiza = (actualiza) => {
        actualizarEstadoCrud(null)
        if (actualiza) {
            recuperarHomies();
        }
    }





    const listaRefresh = () => {
        return (
            <ListaHomie
                homiesLista={homiesLista}
                homieSeleccion={cargarSelectedHomie}
                estadoCrud={actualizarEstadoCrud}
            />
        );
    }



    useEffect(() => {
        if (recupera) {
            recuperarHomies(recupera);
            actualizaReecupera(false);
        }
    }, [recupera, recuperarHomies, actualizaReecupera]);


    const showSuccess = () => {
        messages.current.show({ severity: 'success', summary: 'Homie Registrado', detail: 'Se ha registrado un nuevo Homie' });
    };

    const showFail = () => {
        messages.current.show({ severity: 'warn', summary: 'Ocurrió un Error', detail: 'Consulte a soporte' });
    };

    return (
        <Fragment>
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-12 p-lg-8">
                    <Messages ref={messages} />
                    <div className="card">
                        {listaRefresh()}
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card">
                        <Button onClick={registroChange} label="Agregar Homie"> </Button>
                        <br />
                        {
                            registro ?
                                <ScrollPanel style={{ width: '100%', height: '700px' }}>
                                    <div className="card">
                                        <RegistrarHomie terminaRegistro={terminaRegistro} />  </div>
                                </ScrollPanel>

                                : null
                        }

                    </div>
                </div>

                <div className="p-col-12 p-lg-8">
                    {estadoCrud === 'editar' ?

                        <EditarHomie
                            homieEditar={registroSelected}
                            updated={terminaActualiza}
                        /> : null}



                </div>

            </div>

        </Fragment>
    );

}

export default GestionHomie;