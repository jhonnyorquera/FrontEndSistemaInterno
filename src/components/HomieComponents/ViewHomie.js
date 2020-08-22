import React, { Fragment } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Moment from 'react-moment';
import 'moment/locale/es';

const ViewHomie = ({ data, actualizarEstadoCrud }) => {

   return (
            <Fragment>
                <div className="p-grid p-fluid dashboard">
                    <Card style={{ width: '50%' }}>
                        <ul className="activity-list">
                            <li>

                                <div className="p-grid">
                                    <div style={{ fontWeight: 'bold' }} className="p-col-6">Cédula</div>
                                    <div className="p-col-6">{data.hoCedula}</div>
                                </div>
                            </li>
                            <li>
                                <div className="p-grid">
                                    <div style={{ fontWeight: 'bold' }} className="p-col-6">Nombre</div>
                                    <div className="p-col-6">{data.hoNombre}</div>
                                </div>
                            </li>
                            <li>
                                <div className="p-grid">
                                    <div style={{ fontWeight: 'bold' }} className="p-col-6">Correo Electrónico</div>
                                    <div className="p-col-6">{data.hoCorreo}</div>
                                </div>
                            </li>
                            <li>
                                <div className="p-grid">
                                    <div style={{ fontWeight: 'bold' }} className="p-col-6">Cuenta Bancaria</div>
                                    <div className="p-col-6">{data.hoNroCuenta}</div>
                                </div>
                            </li>
                            <li>
                                <div className="p-grid">
                                    <div style={{ fontWeight: 'bold' }} className="p-col-6">Modalidad</div>
                                    <div className="p-col-6">{data.hoModalidad}</div>
                                </div>
                            </li>
                            <li>
                                <div className="p-grid">
                                    <div style={{ fontWeight: 'bold' }} className="p-col-6">Nivel Educativo</div>
                                    <div className="p-col-6">{data.hoNivelEducativo}</div>
                                </div>
                            </li>
                        </ul>
                    </Card>

                    <Card style={{ width: '50%' }}>
                        <ul className="activity-list">
                            <li>

                                <div className="p-grid">
                                    <div style={{ fontWeight: 'bold' }} className="p-col-6">Direccion</div>
                                    <div className="p-col-6">{data.hoDireccion}</div>
                                </div>
                            </li>
                            <li>
                                <div className="p-grid">
                                    <div style={{ fontWeight: 'bold' }} className="p-col-6">Sueldo</div>
                                    <div className="p-col-6">$ {data.hoSueldo} </div>
                                </div>
                            </li>
                            <li>
                                <div className="p-grid">
                                    <div style={{ fontWeight: 'bold' }} className="p-col-6">Fecha Nacimiento</div>
                                    <div className="p-col-6">{data.hoFechaNacimiento}</div>
                                </div>
                            </li>
                            <li>
                                <div className="p-grid">
                                    <div style={{ fontWeight: 'bold' }} className="p-col-6">Fecha Ingreso</div>
                                    <div className="p-col-6">
                                    {data.hoFechaIngreso}
                                       </div>
                                </div>
                            </li>
                            <li>
                                <div className="p-grid">
                                    <div style={{ fontWeight: 'bold' }} className="p-col-6">Registrado hace</div>
                                    <div className="p-col-6">
                                    <Moment fromNow>{data.hoFechaRegistro}</Moment>
                                        </div>
                                </div>
                            </li>
                            <li>
                                <div className="p-grid">
                                    <div style={{ fontWeight: 'bold' }} className="p-col-6">Fecha Salida</div>
                                    <div className="p-col-6">{data.hoFechaSalida}</div>
                                </div>
                            </li>
                        </ul>
                    </Card>

                    <Button onClick={e => actualizarEstadoCrud('edit')} label="Editar Homie"> </Button>


                </div>

            </Fragment>
        )
   

}

export default ViewHomie;

