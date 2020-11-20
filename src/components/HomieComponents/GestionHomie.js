import React, { Fragment, useState } from 'react';
import RegistrarHomie from './RegistrarHomie';
import ListaHomie from './ListaHomie';
import ViewHomie from './ViewHomie';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import EditarHomie from './EditarHomie';

const GestionHomie = () => {

    const [estadoCrud, actualizarEstadoCrud] = useState(null)
    const [registroSelected, cargarRegistroSelected] = useState(null)
    const [procesando, isProcesando] = useState(true)

    return (
        <Fragment>
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-12 p-lg-8">

                    <div className="card">
                        <ListaHomie
                            homieSeleccion={cargarRegistroSelected}
                            actualizarEstadoCrud={actualizarEstadoCrud}
                            procesando={procesando}
                            isProcesando={isProcesando}

                        />
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card">
                        <Button onClick={e => { actualizarEstadoCrud('create') }} label="Agregar Homie"> </Button>

                        {
                            estadoCrud === 'create' ?
                                <ScrollPanel style={{ width: '100%', height: '700px' }}>
                                    <div className="card">
                                        <RegistrarHomie
                                          
                                            actualizarEstadoCrud={actualizarEstadoCrud}
                                            isProcesando={isProcesando} />  </div>
                                </ScrollPanel>

                                : null
                        }

                    </div>
                </div>


                {
                    estadoCrud === 'edit' ?
                        <div className="p-col-12 p-lg-8">
                            <EditarHomie
                                homieEditar={registroSelected}
                                updated={isProcesando}
                                estadoCrud={actualizarEstadoCrud}

                            />  </div> : null}





                {
                    estadoCrud === 'view' ?
                    <div className="p-col-12 p-lg-8">
                        <ViewHomie
                            data={registroSelected}
                            actualizarEstadoCrud={actualizarEstadoCrud}
                        />    </div>: null
                     
                }



            </div>

        </Fragment>
    );

}

export default GestionHomie;