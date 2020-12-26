import React, { Fragment, useState, useContext } from 'react';
import CrearPedido from './CrearPedido';
import SeleccionHomie from './SeleccionHomie';
import SeleccionCliente from './SeleccionCliente';
import SeleccionarServicio from './SeleccionarServicio';
import AuthContext from '../../context/autenticacion/authContext';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

const GestionCrearPedido = () => {
    const authContext = useContext(AuthContext);
    const {  token } = authContext;
    const [estado, cargaEstado] = useState('')
    const [clienteSelect, seleccionarCliente] = useState();
    const [homies, cargarHomies] = useState([]);
    const [servicios, cargarServicios] = useState([]);
    const [pagos, cargarPagos] = useState([]);
   

    const [modo, cargaModo] = useState('crear');


    const reseteo = (e) => {
        e.preventDefault();
        cargarServicios([]);
        cargarHomies([]);
        seleccionarCliente([]);
        cargaModo('crear')

    }

    return (
        <Fragment>

            {modo === 'crear' ?

                <div className="p-grid p-fluid dashboard">

                    <div className="p-col-12 p-lg-6">
                        <div className="card">
                            <h1>Crear Pedido</h1>


                         
                            <CrearPedido
                                cargaEstado={cargaEstado}
                                clienteSelect={clienteSelect}
                                homies={homies}
                                servicios={servicios}
                                cargaModo={cargaModo}
                                pagos ={pagos}
                                cargarPagos ={cargarPagos}
                                cargarServicios={cargarServicios}
                                token={token}
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
                                        token={token}
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
                                    token={token}
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