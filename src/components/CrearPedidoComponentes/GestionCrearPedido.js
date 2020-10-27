import React, { Fragment, useState } from 'react';
import CrearPedido from './CrearPedido';
import SeleccionHomie from './SeleccionHomie';
import SeleccionCliente from './SeleccionCliente';
import SeleccionarServicio from './SeleccionarServicio';
import DetalleServicios from './DetalleServicios';

import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

const GestionCrearPedido = () => {

    const [estado, cargaEstado] = useState('')
    const [clienteSelect, seleccionarCliente] = useState();
    const [homies, cargarHomies] = useState([]);
    const [servicios, cargarServicios] = useState([]);
    const [pagos, cargarPagos] = useState([]);
    const [fechas, cargarFechas] = useState([]);

    const [modo, cargaModo] = useState('crear');


    const reseteo = (e) => {
        e.preventDefault();
        cargarServicios([]);
        cargarHomies([]);
        seleccionarCliente([])
        cargaModo('crear')

    }

    return (
        <Fragment>

            {modo === 'crear' ?

                <div className="p-grid p-fluid dashboard">

                    <div className="p-col-12 p-lg-6">
                        <div className="card">
                            <h1>Crear Pedido</h1>


                            <DetalleServicios
                                servicios={servicios}
                                cargaEstado={cargaEstado} 
                                cargarServicios={cargarServicios}/>

                            <CrearPedido
                                cargaEstado={cargaEstado}
                                clienteSelect={clienteSelect}
                                homies={homies}
                                servicios={servicios}
                                cargaModo={cargaModo}
                                fechas={fechas}
                                cargarFechas={cargarFechas}
                            />



                        </div>
                    </div>
                    <div className="p-col-12 p-lg-6"   >
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
                                        cargarHomies={cargarHomies}
                                        cargaEstado={cargaEstado}
                                    />

                                </Panel> : null


                        }

                        {estado === 'servicios' ?
                            <Panel header="Seleccionar Servicios" >
                                <SeleccionarServicio
                                    servicios={servicios}
                                    cargarServicios={cargarServicios}
                                    cargaEstado={cargaEstado}
                                />
                            </Panel> : null

                        }



                    </div>


                </div>
                :
                <div><Button label="CREAR OTRO PEDIDO" onClick={(e) => reseteo(e)} className="p-button-raised p-button-rounded" /></div>
            }
        </Fragment>

    );

}

export default GestionCrearPedido;