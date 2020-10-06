import React, { Fragment } from 'react';
import CrearPedido from './CrearPedido';
import SeleccionHomie from './SeleccionHomie';
import SeleccionCliente from './SeleccionCliente';
import SeleccionarServicio from './SeleccionarServicio';
import DetalleServicios from './DetalleServicios';
import { Panel } from 'primereact/panel';

const GestionCrearPedido = () => {

    return (
        <Fragment>
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-12 p-lg-8">
                    <div className="card">
                    <h1>Crear Pedido</h1>
                    <h3>Detalle del Pedido</h3>
                        <CrearPedido />

                        <DetalleServicios />
                    </div> 
                </div>
                <div className="p-col-12 p-lg-4">
                    <Panel header="Seleccionar Cliente" collapsed={true} toggleable>
                        <SeleccionCliente />
                    </Panel>
                    <Panel header="Seleccionar Homie´s" collapsed={true} toggleable>
                        <SeleccionHomie />
                    </Panel>
                    <Panel header="Seleccionar Servicios" collapsed={true} toggleable>
                        <SeleccionarServicio />
                    </Panel>

                </div>

                <div className="p-col-12 p-lg-4">

                </div>
            </div>
        </Fragment>

    );

}

export default GestionCrearPedido;