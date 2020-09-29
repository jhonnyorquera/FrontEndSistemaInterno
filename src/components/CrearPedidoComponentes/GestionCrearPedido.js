import React, { Fragment } from 'react';
import CrearPedido from './CrearPedido';
import SeleccionHomie from './SeleccionHomie'

const GestionCrearPedido = () => {

    return (
        <Fragment>
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-12 p-lg-8">
                    <div className="card">
                        <CrearPedido />
                    </div> </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card">
                        <SeleccionHomie />
                    </div>
                </div>
            </div>
        </Fragment>

    );

}

export default GestionCrearPedido;