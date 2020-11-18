import React, { Fragment, useState, useEffect } from 'react';
import { buscarPedidoByCodigo } from '../../service/PedidoService';

import Busqueda from './Busqueda';
import ListaBusqueda from './ListaBusqueda';
import DetallePedido from './DetallePedido';

const GestionPedido = () => {

    const [busqueda, setBusqueda] = useState([])
    const [pedidoSelected, setPedidoSelected] = useState([])
    const [pedidoInfo, setPedidoInfoSelected] = useState([])


    useEffect(() => {

        if (pedidoSelected) {
            buscarPedidoByCodigo(pedidoSelected.peCodigo)
                .then(
                    (res) => {
                        setPedidoInfoSelected(res)
                    })

        }
        console.log('sale')
    }, [pedidoSelected]);



    return (<Fragment>
        <div className="p-grid p-fluid dashboard">


            <div className="p-col-12 p-lg-3">
                <div className="card">
                    <Busqueda
                        setBusqueda={setBusqueda}
                    />
                </div>
            </div>

            <div className="p-col-12 p-lg-9">
                <div className="card">
                    <ListaBusqueda
                        busqueda={busqueda}
                        pedidoSelected={pedidoSelected}
                        setPedidoSelected={setPedidoSelected}
                    />
                </div>
            </div>




        </div>

        {pedidoInfo ?
            <div className="p-col-12 p-lg-12">
                <div className="card">
                    <DetallePedido
                        pedidoInfo={pedidoInfo} />
                </div>
            </div> : null}





    </Fragment>);
}

export default GestionPedido;