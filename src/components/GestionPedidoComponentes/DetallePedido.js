import React, { Fragment } from 'react'
import PedidoHomie from './PedidoHomie'
import ServicioPedido from './ServicioPedido';
import DetallePagos from './DetallePagos';
import DetallesPedido from './DetallesPedido';
import { Panel } from 'primereact/panel';





const DetallePedido = ({ pedidoInfo }) => {

   



    const { peCodigo,  hoHomieList,
        hoPedidoServicioList, hoPedidoPagoList } = pedidoInfo;

    return (

        <Fragment>



     
            { peCodigo ?
                <div>

                    <div className="p-grid p-fluid dashboard">
                        <div className="p-col-4">
                            <Panel header="Homies Asignados">

                                <div className="p-col-12">

                                    <DetallesPedido
                                        pedidoInfo={pedidoInfo}
                                    ></DetallesPedido>

                                </div>

                            </Panel>

                        </div>
                        <div className="p-col-5">
                            <Panel header="Homies Asignados">
                                {hoHomieList ?
                                    <div className="p-col-12">
                                      
                                            <PedidoHomie
                                              
                                                hoHomieList={hoHomieList}
                                                codigoPedido ={pedidoInfo.peCodigo}
                                            ></PedidoHomie>
                                        
                                    </div>
                                    : 'No existen Homies Asignados'}
                            </Panel>

                            <Panel header="Servicios Asignados">
                                {hoPedidoServicioList ?
                                    <div className="p-col-12">

                                        <ServicioPedido
                                            hoPedidoServicioList={hoPedidoServicioList}
                                         
                                      ></ServicioPedido>

                                    </div>
                                    : 'No existen Servicios Asignados'}
                            </Panel>
                           
                                {pedidoInfo.peTipo === 'PRINCIPAL'  ?
                                 <Panel header="Pagos Realizados">
                                    <div className="p-col-12">

                                        <DetallePagos
                                           
                                           pedidoInfo={pedidoInfo}
                                        ></DetallePagos>

                                    </div> </Panel>
                                    : null }
                           
                        </div>


                        <div className="p-col-3">
                           

                        </div>


                    </div>


              
                </div> :null
            }

        </Fragment>);
}

export default DetallePedido;