import React, { Fragment, useState } from 'react';
import BuscarPedido from './BuscarPedido';
import ListaPedidosXHomie from './ListaPedidosXHomie';

const PedidoPago = () => {

    const [busqueda, setBusqueda] = useState({});
    return (<Fragment>
        <div className="p-grid p-fluid dashboard">
            <div className="p-col-2">

                <div className="card">
                    <BuscarPedido
                        setBusqueda={setBusqueda}
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