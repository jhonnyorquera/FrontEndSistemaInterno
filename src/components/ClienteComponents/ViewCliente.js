import React, { useState, Fragment } from 'react';
import { Card } from 'primereact/card';
import Moment from 'react-moment';
import 'moment/locale/es';
import { Button } from 'primereact/button';

const ViewCliente = ({ selectedCliente, estadoCrud }) => {

    return (
        <Fragment>

            <div className="p-grid p-fluid dashboard">
                <Card style={{ width: '50%' }}>
                    <ul className="activity-list">
                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Cédula</div>
                                <div className="p-col-6">{selectedCliente.clCedulaRuc}</div>
                            </div>
                        </li>
                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Tipo</div>
                                <div className="p-col-6">{selectedCliente.clTipo}</div>
                            </div>
                        </li>

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Nombre</div>
                                <div className="p-col-6">{selectedCliente.clNombre}</div>
                            </div>
                        </li>

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Teléfono</div>
                                <div className="p-col-6">{selectedCliente.clTelefono}</div>
                            </div>
                        </li>


                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Correo</div>
                                <div className="p-col-6">{selectedCliente.clCorreo}</div>
                            </div>
                        </li>


                    </ul>

                </Card>

                <Card style={{ width: '50%' }}>

                    <ul className="activity-list">

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Sector</div>
                                <div className="p-col-6">{selectedCliente.clSector}</div>
                            </div>
                        </li>


                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Dirección</div>
                                <div className="p-col-6">{selectedCliente.clDireccion}</div>
                            </div>
                        </li>

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Datos Factura</div>
                                <div className="p-col-6">{selectedCliente.clFactura}</div>
                            </div>
                        </li>

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">tiempo de Cliente</div>
                                <div className="p-col-6">
                              <Moment fromNow>{selectedCliente.clFechaRegistro}</Moment>
                                    </div>
                            </div>
                        </li>

                    </ul>
                </Card>

                <Button onClick={e => estadoCrud('edit')} label="Editar Homie"> </Button>

            </div>
        </Fragment>

    );
}

export default ViewCliente;