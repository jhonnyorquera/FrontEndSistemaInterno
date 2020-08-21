

import React, { useState, Fragment } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';



const ListarHomie = ({ homiesLista, homieSeleccion, estadoCrud }) => {

    const [selectedHomie, setSelectedHomie] = useState(null);




    const editHomie = () => {
        setSelectedHomie(null)
        homieSeleccion(selectedHomie)

    }


    const displaySelection = (data) => {
        if (!data || data.length === 0) {
            return <div style={{ textAlign: 'left' }}></div>;
        }
        else {
            estadoCrud('ver')
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
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Teléfono Celular</div>
                                <div className="p-col-6">{data.hoTelefono}</div>
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
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Sector de residencia</div>
                                <div className="p-col-6">{data.hoSector}</div>
                            </div>
                        </li>

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
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Nro de Hijos</div>
                                <div className="p-col-6">{data.hoHijos}</div>
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
    };


    return (
        <Fragment>

            <h1>Nuestros Homies</h1>
            <DataTable value={homiesLista} paginatorPosition="both" selectionMode="single" rows={10}
                responsive={true} onSelectionChange={e => setSelectedHomie(e.value)}

            >
                <Column field="hoCedula" header="Cédula" sortable={true} filter={true} filterPlaceholder="Digita un número" filterMatchMode="contains" />
                <Column field="hoNombre" header="Nombre" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                <Column field="hoFechaNacimiento" header="Fecha Nacimiento" sortable={true} />
                <Column field="hoTelefono" header="Teléfono" sortable={true} />
            </DataTable>
            <div />
            <div>_______________________________</div>
            <div>
                {

                    displaySelection(selectedHomie)

                }
            </div>

            {
                selectedHomie ? <Button onClick={e => editHomie()} label="Editar Homie"> </Button> : <div />
            }

        </Fragment>
    )

}

export default ListarHomie;