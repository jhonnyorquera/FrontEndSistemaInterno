import React, { Fragment, useState } from 'react';
import Busqueda from './Busqueda';
import ListaBusqueda from './ListaBusqueda';
import DetallePedido from './DetallePedido';

const GestionPedido = () => {

    


    return (<Fragment>
        <div className="p-grid p-fluid dashboard">
            <div className="p-col-12 p-lg-6">
                <div className="card">
                    <Busqueda />
                </div>
            </div>

            <div className="p-col-12 p-lg-6">
                <div className="card">
                    <ListaBusqueda />
                </div>
            </div>




        </div>


        <div className="p-col-12 p-lg-12">
            <div className="card">
                <DetallePedido />
            </div>
        </div>





    </Fragment>);
}

export default GestionPedido;