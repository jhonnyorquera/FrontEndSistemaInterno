import React, { Fragment, useState } from 'react';
import ListaCatalogo from './ListaCatalogo';
import CreateCatalogo from './CreateCatalogo';
import ViewCatalogo from './ViewCatalogo';
import EditCatalogo from './EditCatalogo';

import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';


const GestionCatalogo = () => {


    const [estadoCrud, actualizarEstadoCrud] = useState(null)
    const [catalogoSelect, seleccionarCatalogo] = useState({});
    const [procesando, isProcesando] = useState(true);


    return (
        <Fragment>
            <div className="p-grid p-fluid dashboard">

                <div className="p-col-12 p-lg-8">

                    <div className="card">
                        <ListaCatalogo
                            catalogoSelect={seleccionarCatalogo}
                            estadoCrud={actualizarEstadoCrud}
                            procesando={procesando}
                            isProcesando={isProcesando}
                        />
                    </div>

                    {
                        estadoCrud === 'view' ?
                            <ViewCatalogo
                                selectedCatalogo={catalogoSelect}
                                estadoCrud={actualizarEstadoCrud}
                            /> : null
                    }

                    {
                        estadoCrud === 'edit' ?
                            <EditCatalogo
                                selectedCatalogo={catalogoSelect}
                                estadoCrud={actualizarEstadoCrud}
                                isProcesando={isProcesando}
                            /> : null
                    }


                </div>

                <div className="p-col-12 p-lg-4">
                    <div className="card">
                        <Button onClick={e => { actualizarEstadoCrud('create') }} label="Registrar Nuevo Servicio"> </Button>
                        {
                            estadoCrud === 'create' ?
                                <ScrollPanel style={{ width: '100%', height: '500px' }}>
                                    <div className="card">
                                        <CreateCatalogo
                                            estadoCrud={actualizarEstadoCrud}
                                            seleccionarCatalogo={seleccionarCatalogo}
                                            isProcesando={isProcesando}
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