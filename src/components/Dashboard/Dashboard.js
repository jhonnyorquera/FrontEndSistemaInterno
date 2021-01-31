import React, { useState,  Fragment, useContext } from 'react';


import AuthContext from '../../context/autenticacion/authContext';
import ResumenFun from './ResumenFun';
import BusquedaDash from './BusquedaDash';

const Dashboard = () => {

    const [dash, setDash] = useState({});


    const authContext = useContext(AuthContext);
    const { token } = authContext;


    const { cantPedidos, cantClientes, dineroRecaudado, resumenHomie } = dash

    return (
        <Fragment>
         

                <div className="p-grid p-fluid dashboard">
                    <div className="p-col-12 p-lg-4">
                        <div className="card summary">
                            <span className="title">Pedidos</span>
                            <span className="detail">Pedidos Realizados en el mes</span>
                            <span className="count visitors">{cantPedidos}</span>
                        </div>
                    </div>
                    <div className="p-col-12 p-lg-4">
                        <div className="card summary">
                            <span className="title">Clientes</span>
                            <span className="detail">Clientes registrados en la plataforma</span>
                            <span className="count purchases">{cantClientes}</span>
                        </div>
                    </div>
                    <div className="p-col-12 p-lg-4">
                        <div className="card summary">
                            <span className="title">Dinero</span>
                            <span className="detail">Dinero Recaudado en el mes</span>
                            <span className="count revenue">${dineroRecaudado}</span>
                        </div>
                    </div>




               
                        <div className="p-col-12 p-lg-2">
                            <BusquedaDash
                                setDash={setDash}
                                token={token}
                            ></BusquedaDash>
                        </div> 
                         <div className="p-col-12 p-lg-10">
                            <ResumenFun
                                resumenHomie={resumenHomie}
                            ></ResumenFun>
                        </div>  

                </div>
        

        </Fragment>





    );
}

export default Dashboard;