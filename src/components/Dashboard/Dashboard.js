import React, { useState, useEffect, Fragment, useContext } from 'react';
import { getDashboard } from '../../service/ResumeService';
import { ProgressBar } from 'primereact/progressbar';
import { Panel } from 'primereact/panel';
import AuthContext from '../../context/autenticacion/authContext';

const Dashboard = () => {

    const [dash, setDash] = useState({});
    const [mostrar, setMostrar] = useState(true)

    const authContext = useContext(AuthContext);
    const { token } = authContext;


    const { cantPedidos, cantClientes, dineroRecaudado, calificacion, dinero, limpiezas } = dash


    useEffect(() => {

        getDashboard(token)
            .then(res =>
                setDash(res)
            );


        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        if (dash.cantPedidos && dash.cantClientes && dash.dineroRecaudado && dash.calificacion && dash.dineroRecaudado) {
            setMostrar(false)
        }
    }, [dash])






    return (
        <Fragment>
            {mostrar ?
                <div>
                    <h1>Bienvendo a Homie</h1>
                </div>
                :

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



                    <div className="p-col-12 p-lg-4">
                        <Panel header="Calificación" style={{ height: '100%' }}>
                            <div className="activity-header">
                                <div className="p-grid">
                                    <div className="p-col-6">
                                        <span style={{ fontWeight: 'bold' }}>Calificación por homie</span>
                                    </div>

                                </div>
                            </div>
                            {
                                calificacion ?
                                    calificacion.map(vari => (

                                        <div>
                                            <div className="card summary">
                                                <span className="title">{vari.nombre}</span>
                                                <span className="count visitors">{vari.cantidad}/5</span>
                                                <br></br>

                                            </div>
                                            <ProgressBar value={(vari.cantidad * 100) / 5} showValue={false} />
                                        </div>
                                    )) : null}

                            <ul className="activity-list">


                            </ul>
                        </Panel>
                    </div>



                    <div className="p-col-12 p-lg-4">
                        <Panel header="Dinero" style={{ height: '100%' }}>
                            <div className="activity-header">
                                <div className="p-grid">
                                    <div className="p-col-6">
                                        <span style={{ fontWeight: 'bold' }}>Dinero por homie</span>
                                    </div>

                                </div>
                            </div>
                            {
                                dinero ?
                                    dinero.map(vari => (
                                        <div>
                                            <div className="card summary">
                                                <span className="title">{vari.nombre}</span>
                                                <span className="count revenue">${vari.cantidad}</span>
                                                <br></br>

                                            </div>

                                        </div>
                                    )) : null}

                            <ul className="activity-list">
                            </ul>
                        </Panel>
                    </div>



                    <div className="p-col-12 p-lg-4">
                        <Panel header="Limpiezas" style={{ height: '100%' }}>
                            <div className="activity-header">
                                <div className="p-grid">
                                    <div className="p-col-6">
                                        <span style={{ fontWeight: 'bold' }}>Cantidad de limpiezas por homie</span>
                                    </div>

                                </div>
                            </div>
                            {
                                limpiezas ?
                                    limpiezas.map(vari => (
                                        <div>
                                            <div className="card summary">
                                                <span className="title">{vari.nombre}</span>
                                                <span className="count revenue">{vari.cantidad}</span>
                                                <br></br>

                                            </div>

                                        </div>
                                    )) : null}

                            <ul className="activity-list">
                            </ul>
                        </Panel>
                    </div>
                </div>
            }

        </Fragment>





    );
}

export default Dashboard;