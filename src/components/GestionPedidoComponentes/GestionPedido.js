import React, { Fragment, useState, useEffect, useContext } from 'react';
import { buscarPedidoByCodigo } from '../../service/PedidoService';
import AuthContext from '../../context/autenticacion/authContext';
import Busqueda from './Busqueda';
import ListaBusqueda from './ListaBusqueda';
import DetallePedido from './DetallePedido';

const GestionPedido = () => {

    const [busqueda, setBusqueda] = useState([])
    const [pedidoSelected, setPedidoSelected] = useState([])
    const [pedidoInfo, setPedidoInfoSelected] = useState([])

    const authContext = useContext(AuthContext);
    const {  token } = authContext;

    useEffect(() => {

        if (pedidoSelected) {
            buscarPedidoByCodigo(pedidoSelected.peCodigo, token)
                .then(
                    (res) => {
                        setPedidoInfoSelected(res)
                    })

        }
        // eslint-disable-next-line
    }, [pedidoSelected]);



    return (<Fragment>
        <div className="p-grid p-fluid dashboard">


            <div className="p-col-12 p-lg-3">
                <div className="card">
                    <Busqueda
                        setBusqueda={setBusqueda}
                        token={token}
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
                        pedidoInfo={pedidoInfo} 
                        token={token}/>
                </div>
            </div> : null}





    </Fragment>);
}

export default GestionPedido;