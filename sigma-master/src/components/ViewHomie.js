

import React, { useState,  Fragment } from 'react';
import { Card } from 'primereact/card';
const ViewHomie = ({ data }) => {

    if (!data || data.length === 0) {
        return <div style={{ textAlign: 'left' }}></div>;
    }
    else {
       
        return <div className="p-grid p-fluid dashboard">
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
                            <div style={{ fontWeight: 'bold' }} className="p-col-6">FechaIngreso</div>
                            <div className="p-col-6">{data.hoFechaIngreso}</div>
                        </div>
                    </li>
                    <li>
                        <div className="p-grid">
                            <div style={{ fontWeight: 'bold' }} className="p-col-6">Fecha Registro</div>
                            <div className="p-col-6">{data.hoFechaRegistro}</div>
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

        </div>


    }

}

export default ViewHomie;

