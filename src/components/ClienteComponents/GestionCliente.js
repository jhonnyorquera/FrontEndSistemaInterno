import React, { Fragment, useState} from 'react'
import ListaClientes from './ListaClientes'
import ViewCliente from './ViewCliente'
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import CreateCliente from './CreateCliente';
import EditCliente from './EditCliente';

const GestionCliente = () => {

    const [estadoCrud, actualizarEstadoCrud] = useState(null)
    const [clienteSelect, seleccionarCliente] = useState({});
    const [procesando, isProcesando] = useState(true);

    


   



    return (

        <Fragment>
            <div className="p-grid p-fluid dashboard">

                <div className="p-col-12 p-lg-8">

                    <div className="card">
                        <ListaClientes
                            clienteSelect={seleccionarCliente}
                            estadoCrud={actualizarEstadoCrud}
                            procesando={procesando}
                            isProcesando={isProcesando}
                        />
                    </div>

                    {
                        estadoCrud === 'view' ?
                            <ViewCliente
                                selectedCliente={clienteSelect}
                                estadoCrud={actualizarEstadoCrud}
                            /> : null
                    }

                    {
                        estadoCrud === 'edit' ?
                            <EditCliente
                                selectedCliente={clienteSelect}
                                estadoCrud={actualizarEstadoCrud}
                                isProcesando={isProcesando}
                            /> : null
                    }


                </div>

                <div className="p-col-12 p-lg-4">
                    <div className="card">
                        <Button onClick={e => { actualizarEstadoCrud('create') }} label="Registrar Cliente"> </Button>
                        {
                            estadoCrud === 'create' ?
                                <ScrollPanel style={{ width: '100%', height: '500px' }}>
                                    <div className="card">
                                        <CreateCliente
                                            estadoCrud={actualizarEstadoCrud}
                                            seleccionarCliente={seleccionarCliente}
                                            isProcesando={isProcesando}
                                        /> </div>   
                                        </ScrollPanel> : null

                        }

                    </div>
                </div>
            </div>

        </Fragment>


    );
}

export default GestionCliente;

