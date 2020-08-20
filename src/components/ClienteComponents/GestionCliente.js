import React, { Fragment, useState, useEffect } from 'react'
import ListaClientes from './ListaClientes'
import ViewCliente from './ViewCliente'
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import CreateCliente from './CreateCliente';
import EditCliente from './EditCliente';
import { getClientesList } from '../../service/ClientesService';

const GestionCliente = () => {

    const [estadoCrud, actualizarEstadoCrud] = useState(null)
    const [clienteSelect, seleccionarCliente] = useState('');
    const [procesando, isProcesando] = useState(true);
    const [clientes, llenaListado] = useState([]);


    const seleccinaCliente = (cliente) => {
        seleccionarCliente(cliente);
    }

    useEffect(function () {
        console.log('GESTIONHOMIE: STATUS_PROCESANDO:  ' + procesando);
        if (procesando) {
            console.log('GESTIONHOMIE: entra a cargar lista')
            getClientesList().then(data => llenaListado(data));
            isProcesando(false)
        }

    })





    return (

        <Fragment>
            <div className="p-grid p-fluid dashboard">

                <div className="p-col-12 p-lg-8">

                    <div className="card">
                        <ListaClientes
                            clienteSelect={seleccionarCliente}
                            estadoCrud={actualizarEstadoCrud}
                            clientes={clientes}
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

