import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Spinner } from 'primereact/spinner';
import { editHomie } from '../../service/HomieService';
import swal from 'sweetalert';

const EditarHomie = ({ homieEditar, updated, estadoCrud }) => {


    let modalidades = [
        { mod: 'En relación laboral' },
        { mod: 'Freelance' },
    ];

    const [modalidadSelected, cargarModalidadSelected] = useState({ mod: homieEditar.hoModalidad })

    useEffect(() => {
        actualizaHomieAEditar(homieEditar);
    }, [homieEditar]);

    const [homieEditado, actualizaHomieAEditar] = useState({
        hoCedula: '',
        hoNombre: '',
        hoTelefono: '',
        hoCorreo: '',
        hoNroCuenta: '',
        hoModalidad: '',
        hoSector: '',
        hoDireccion: '',
        hoNivelEducativo: '',
        hoSueldo: '',
        hoHijos: '',
        hoFechaNacimiento: '',
        hoFechaIngreso: '',
        hoFechaSalida: ''
    });


    const actualizarState = e => {
        actualizaHomieAEditar({
            ...homieEditado,
            [e.target.name]: e.target.value
        })
    }

    const enviarActualizarSubmit = (e) => {
        e.preventDefault();
        homieEditado.hoModalidad = modalidadSelected.mod;
        editHomie(homieEditado).then(res => {
            if (res.status === 200) {
                updated(true);
                estadoCrud('');
                swal("Cliente Editado!", "Se ha editado el cliente: " + res.data.hoNombre, "success");

            } else {
                swal("Algo paso!", "No se ha editado el cliente: " + res.data.hoNombre, "error");

            }
        })





    }


    const { hoCedula, hoNombre, hoTelefono, hoCorreo, hoNroCuenta, hoSector, hoDireccion,
        hoNivelEducativo, hoSueldo, hoHijos, hoFechaNacimiento, hoFechaSalida, hoFechaIngreso } = homieEditado;


    return (



        <form onSubmit={enviarActualizarSubmit}>
            <div className="p-grid p-fluid dashboard">
                <Card style={{ width: '50%' }} >
                    <ul className="activity-list">
                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Cédula</div>
                                <div className="p-col-6">{hoCedula}</div>
                            </div>
                        </li>

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Nombres Completos</div>
                                <div className="p-col-6">
                                    <InputText id="hoNombre" required={true} name="hoNombre" maxLength="50" placeholder="Ej. Daniela Andrea Ortiz Vaca" onChange={actualizarState} value={hoNombre} />
                                </div>
                            </div>
                        </li>


                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Teléfono Celular</div>
                                <div className="p-col-6">
                                    <InputMask id="hoTelefono" name='hoTelefono' mask='999-9999-999' placeholder='099-8342-369' onChange={actualizarState} value={hoTelefono} />

                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Correo Electrónico</div>
                                <div className="p-col-6">
                                    <InputText id="hoCorreo" type="email" name="hoCorreo" maxLength="30" placeholder="Ej. unombre@hotmail.com" onChange={actualizarState} value={hoCorreo} />

                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Modalidad</div>
                                <div className="p-col-6">
                                    <Dropdown name="modalidadSelected" id="hoModalidad" value={modalidadSelected} showClear={true}
                                        options={modalidades} onChange={(e) => cargarModalidadSelected(e.value)}
                                        optionLabel="mod" style={{ width: '12em' }} />
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Nivel Educativo</div>
                                <div className="p-col-6">
                                    <InputText maxLength="150" id="hoNivelEducativo" name="hoNivelEducativo" placeholder="Ej. Bachillerato" onChange={actualizarState} value={hoNivelEducativo} />

                                </div>
                            </div>
                        </li>



                    </ul>
                </Card>

                <Card style={{ width: '50%' }} >
                    <ul className="activity-list">

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Sector</div>
                                <div className="p-col-6">
                                    <InputText maxLength="5" id="hoSector" name="hoSector" placeholder="Ej. 400" onChange={actualizarState} value={hoSector} />

                                </div>
                            </div>
                        </li>


                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Direccion</div>
                                <div className="p-col-6">
                                    <InputTextarea rows={5} cols={30} maxLength="50" id="hoDireccion" name="hoDireccion"
                                        placeholder="Ej. Toribio Hidalgo N17 y Atanasio Oleas, atrás del parque central de la Vicentina" onChange={actualizarState} value={hoDireccion} />


                                </div>
                            </div>
                        </li>




                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Nro de Hijos</div>
                                <div className="p-col-6">
                                    <Spinner id="hoHijos" name="hoHijos" placeholder="Ej. 3" onChange={actualizarState} value={hoHijos} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">
                                    <label htmlFor="hoFechaIngreso">Fecha de Ingreso</label>
                                </div>
                                <div className="p-col-6">
                                    <Calendar type="time" placeholder="07/15/2020" required={true} name="hoFechaIngreso" id="hoFechaIngreso" onChange={actualizarState} value={hoFechaIngreso} />
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Sueldo</div>
                                <div className="p-col-6">
                                    <InputText maxLength="5" id="hoSueldo" name="hoSueldo" placeholder="Ej. 400" onChange={actualizarState} value={hoSueldo} />
                                </div>
                            </div>
                        </li>


                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Fecha Nacimiento</div>
                                <div className="p-col-6">
                                    <Calendar type="time" placeholder="07/15/2020" name="hoFechaNacimiento" id="hoFechaNacimiento" onChange={actualizarState} value={hoFechaNacimiento} />

                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Cuenta Bancaria</div>
                                <div className="p-col-6">
                                    <InputText maxLength="5" id="hoNroCuenta" name="hoNroCuenta" placeholder="Ej. 400" onChange={actualizarState} value={hoNroCuenta} />

                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="p-grid">
                                <div style={{ fontWeight: 'bold' }} className="p-col-6">Fecha Salida</div>
                                <div className="p-col-6">
                                    <Calendar placeholder="07/15/2020" name="hoFechaSalida" id="hoFechaSalida" onChange={actualizarState} value={hoFechaSalida} />

                                </div>
                            </div>
                        </li>





                    </ul>
                </Card>

                <div className="p-col-12">
                    <Button type="submit" label="Actualizar"> </Button>
                </div>
            </div>
        </form>



    );

}

export default EditarHomie;