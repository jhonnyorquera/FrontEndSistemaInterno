import React, { Fragment, useState } from 'react'
import ListaClientes from './ListaClientes'
import ViewCliente from './ViewCliente'
import { Button } from 'primereact/button';
import CreateCliente from './CreateCliente';

const GestionCliente = () => {

    const [estadoCrud, actualizarEstadoCrud] = useState(null)
    const [clienteSelect, seleccionarCliente] = useState('');

    const seleccinaCliente = (cliente) => {
        seleccionarCliente(cliente);
    }





    return (

        <Fragment>
            <div className="p-grid p-fluid dashboard">
                <ListaClientes
                    clienteSelect={seleccionarCliente}
                    estadoCrud={actualizarEstadoCrud}
                />
            </div>
            <Button onClick={e => actualizarEstadoCrud('create')} label="Registrar Cliente"> </Button>

            {
                estadoCrud === 'view' ?
                    <ViewCliente
                        selectedCliente={clienteSelect}
                        estadoCrud={actualizarEstadoCrud}
                    /> : null
            }

            {
                estadoCrud === 'create' ?
                    <CreateCliente
                        
                        estadoCrud={actualizarEstadoCrud}
                    /> : null
            }

        </Fragment>


    );
}

export default GestionCliente;

