import React, { Fragment, useState, useContext } from 'react';
import BuscarPedido from './BuscarPedido';
import ListaPedidosXHomie from './ListaPedidosXHomie';
import AuthContext from '../../context/autenticacion/authContext';

const PedidoPago = () => {

    const [busqueda, setBusqueda] = useState({});
    const authContext = useContext(AuthContext);
    const {  token } = authContext;



    return (<Fragment>
        <div className="p-grid p-fluid dashboard">
            <div className="p-col-2">

                <div className="card">
                    <BuscarPedido
                        setBusqueda={setBusqueda}
                        token={token}
                    /></div>
            </div>
            <div className="p-col-10">
                <div className="card">
                    <ListaPedidosXHomie
                        busqueda={busqueda}
                        
                    /></div>
                </div>
            </div>

    </Fragment>);
}

export default PedidoPago;