import React, { Fragment, useState, useContext } from 'react';
import ListaCatalogo from './ListaCatalogo';
import CreateCatalogo from './CreateCatalogo';

import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import AuthContext from '../../context/autenticacion/authContext';


const GestionCatalogo = () => {


    const [estadoCrud, actualizarEstadoCrud] = useState(null)
    const [llenaLista, cambiaEstadoLlenar] = useState(true);

    const authContext = useContext(AuthContext);
    const {  token } = authContext;


    return (
        <Fragment>
            <div className="p-grid p-fluid dashboard">

                <div className="p-col-12 p-lg-8">

                    <div className="card">
                        <ListaCatalogo
                            llenaLista={llenaLista}
                            cambiaEstadoLlenar={cambiaEstadoLlenar}
                            actualizarEstadoCrud={actualizarEstadoCrud}
                            token={token}
                        />
                    </div>






                </div>

                <div className="p-col-12 p-lg-4">
                    <div className="card">
                        <Button onClick={e => { actualizarEstadoCrud('create') }} label="Registrar Nuevo Servicio"> </Button>
                        {
                            estadoCrud === 'create' ?
                                <ScrollPanel style={{ width: '100%', height: '500px' }}>
                                    <div className="card">
                                        <CreateCatalogo
                                          cambiaEstadoLlenar={cambiaEstadoLlenar}
                                          actualizarEstadoCrud={actualizarEstadoCrud}
                                          token={token}
                                        /> </div>
                                </ScrollPanel> : null

                        }

                    </div>
                </div>
            </div>

        </Fragment>
    )



}

export default GestionCatalogo;