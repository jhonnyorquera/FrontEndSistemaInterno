import React, { useState, Fragment } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import { Spinner } from 'primereact/spinner';
import swal from 'sweetalert';
import { createHomie } from '../../service/HomieService';




const RegistrarHomie = ({ terminaRegistro, actualizarEstadoCrud, isProcesando }) => {

    var modalidades = [
        { mod: 'En relación laboral' },
        { mod: 'Freelance' },
    ];

    const [homie, actualizaHomie] = useState({
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
        hoFechaIngreso: ''
    });

    const actualizarState = e => {
        actualizaHomie({
            ...homie,
            [e.target.name]: e.target.value
        })
    }

    const { hoCedula, hoNombre, hoTelefono, hoCorreo, hoNroCuenta, hoModalidad, hoSector, hoDireccion, hoNivelEducativo, hoSueldo, hoHijos, hoFechaNacimiento, hoFechaIngreso } = homie;




    const registrarHomieSubmit = (e) => {

        e.preventDefault();
        homie.hoModalidad = homie.hoModalidad.mod;
        createHomie(homie)
            .then(res => {
                if (res) {
                    terminaRegistro(false);
                    swal("Tenemos un nuevo Homie", "Se ha registrado un nuevo Homie", "success");

                } else {
                    terminaRegistro(true);
                    swal("No se registrado un Homie", "Algo ha ocurrido, prueba de nuevo o consulta al administrador", "error");

                }
            }).catch(error => {
                if (error.response) {
                    terminaRegistro(true);
                    swal("No se registrado un Homie", "Algo ha ocurrido, prueba de nuevo o consulta al administrador", "error");

                } else if (error.request) {
                    terminaRegistro(true);
                    swal("No se registrado un Homie", "Algo ha ocurrido, prueba de nuevo o consulta al administrador", "error");

                } else {
                    console.log('Error--->', error.message);

                }

            });

        actualizarEstadoCrud('');

        isProcesando(true);
    }




    return (
        <Fragment>



            <form onSubmit={registrarHomieSubmit}>
                <h1>Nuevo Homie</h1>
                <div className="p-col-12">
                    <label htmlFor="hoCedula" >Cédula</label>
                </div>
                <div className="p-col-12">
                    <InputText id="hoCedula" required={true}
                        minLength="10" maxLength="10" name="hoCedula" placeholder="Ej. 1720508888"
                        onChange={actualizarState} value={hoCedula} />
                </div>
                <div className="p-col-12">
                    <label >Nombres Completos</label>
                </div>
                <div className="p-col-12">
                    <InputText id="hoNombre" required={true} name="hoNombre" maxLength="50" placeholder="Ej. Daniela Andrea Ortiz Vaca" onChange={actualizarState} value={hoNombre} />
                </div>
                <div className="p-col-12">
                    <label >Teléfono Celular</label>
                </div>
                <div className="p-col-12">
                    <InputMask id="hoTelefono" name='hoTelefono' mask='999-9999-999' placeholder='099-8342-369' onChange={actualizarState} value={hoTelefono} />
                </div>




                <div className="p-col-12">
                    <label htmlFor="hoCorreo">Correo Electrónico</label>
                </div>
                <div className="p-col-12">
                    <InputText id="hoCorreo" type="email" name="hoCorreo" maxLength="30" placeholder="Ej. unombre@hotmail.com" onChange={actualizarState} value={hoCorreo} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="hoModalidad">Modalidad</label>
                </div>
                <div className="p-col-12">
                    <Dropdown name="hoModalidad" id="hoModalidad" value={hoModalidad}
                        options={modalidades} onChange={actualizarState} placeholder="Seleccione una Modalidad"
                        optionLabel="mod" style={{ width: '12em' }} />
                </div>




                <div className="p-col-12">
                    <label htmlFor="hoNroCuenta">Cuenta Bancaria</label>
                </div>
                <div className="p-col-12">
                    <InputTextarea rows={5} cols={30} maxLength="150" id="hoNroCuenta" name="hoNroCuenta"
                        placeholder="Ej. Banco Pichincha, Cuenta de ahorros nro: 222222222222" onChange={actualizarState} value={hoNroCuenta} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="hoSector">Sector de residencia</label>
                </div>
                <div className="p-col-12">
                    <InputText id="hoSector" maxLength="150" name="hoSector" placeholder="Ej. El Inca" onChange={actualizarState} value={hoSector} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="hoDireccion">Dirección</label>
                </div>
                <div className="p-col-12">
                    <InputTextarea rows={5} cols={30} maxLength="50" id="hoDireccion" name="hoDireccion"
                        placeholder="Ej. Toribio Hidalgo N17 y Atanasio Oleas, atrás del parque central de la Vicentina" onChange={actualizarState} value={hoDireccion} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="hoNivelEducativo">Nivel Educativo</label>
                </div>
                <div className="p-col-12">
                    <InputText maxLength="150" id="hoNivelEducativo" name="hoNivelEducativo" placeholder="Ej. Bachillerato" onChange={actualizarState} value={hoNivelEducativo} />
                </div>


                <div className="p-col-12">
                    <label htmlFor="hoFechaIngreso">Fecha de Ingreso</label>
                </div>
                <div className="p-col-12">
                    <Calendar type="time" placeholder="07/15/2020" required={true} name="hoFechaIngreso" id="hoFechaIngreso" onChange={actualizarState} value={hoFechaIngreso} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="hoSueldo">Sueldo</label>
                </div>

                <div className="p-col-12">
                    <InputText maxLength="5" id="hoSueldo" name="hoSueldo" placeholder="Ej. 400" onChange={actualizarState} value={hoSueldo} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="hoHijos">Nro de Hijos</label>
                </div>
                <div className="p-col-12">
                    <Spinner id="hoHijos" name="hoHijos" placeholder="Ej. 3" onChange={actualizarState} value={hoHijos} />
                </div>


                <div className="p-col-12">
                    <label htmlFor="hoFechaNacimiento">Fecha de Nacimiento</label>
                </div>
                <div className="p-col-12">
                    <Calendar type="time" placeholder="07/15/2020" name="hoFechaNacimiento" id="hoFechaNacimiento" onChange={actualizarState} value={hoFechaNacimiento} />
                </div>

                
                <div className="p-col-12">
                    <Button type="submit" label="Registrar"> </Button>
                </div>



            </form>


        </Fragment>
    );
}
export default RegistrarHomie;