import React, { Fragment, useState } from 'react';
import CrearPedido from './CrearPedido';
import SeleccionHomie from './SeleccionHomie';
import SeleccionCliente from './SeleccionCliente';
import SeleccionarServicio from './SeleccionarServicio';
import DetalleServicios from './DetalleServicios';
import { Panel } from 'primereact/panel';

const GestionCrearPedido = () => {

    const [estado, cargaEstado] = useState('')
    const [clienteSelect, seleccionarCliente] = useState();

    return (
        <Fragment>
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-12 p-lg-8">
                    <div className="card">
                        <h1>Crear Pedido</h1>
                        <h3>Detalle del Pedido</h3>
                        <CrearPedido
                            cargaEstado={cargaEstado}
                            clienteSelect={clienteSelect}
                        />

                        <DetalleServicios />
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    {
                        estado === 'cliente' ?
                            <Panel header="Seleccionar Cliente" >
                                <SeleccionCliente 
                                 seleccionarCliente={seleccionarCliente}
                                 cargaEstado={cargaEstado}
                                 clienteSelect={clienteSelect}
                                />
                            </Panel> : null

                    }
                    {
                        estado === 'homie' ?
                            <Panel header="Seleccionar Homie´s" >
                                <SeleccionHomie 
                                seleccionarCliente={seleccionarCliente}
                              
                                />
                            
                            </Panel> : null


                    }

                    {estado === 'servicios' ?
                        <Panel header="Seleccionar Servicios" >
                            <SeleccionarServicio />
                        </Panel> : null

                    }



                </div>

                <div className="p-col-12 p-lg-4">

                </div>
            </div>
        </Fragment>

    );

}

export default GestionCrearPedido;