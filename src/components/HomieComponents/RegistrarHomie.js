import React, { useState, Fragment, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import AuthContext from '../../context/autenticacion/authContext';

import swal from 'sweetalert';
import { createHomie } from '../../service/HomieService';
import { getNodalidadesContrato } from '../../service/VariablesService';




const RegistrarHomie = ({  actualizarEstadoCrud, isProcesando }) => {
    const authContext = useContext(AuthContext);
    const {  token } = authContext;

    const [modalidades] = useState(getNodalidadesContrato());

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
        createHomie(homie, token )
            .then(res => {
                if (res) {
                    isProcesando(true);
                    swal("Tenemos un nuevo Homie", "Se ha registrado un nuevo Homie", "success");

                } else {
                    swal("No se registrado un Homie", "Algo ha ocurrido, prueba de nuevo o consulta al administrador", "error");
                }
            }).catch(error => {
                if (error.response) {
                    swal("No se registrado un Homie", "Algo ha ocurrido, prueba de nuevo o consulta al administrador", "error");

                } else if (error.request) {
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
                    <label >Nombres y Apellidos Completos</label>
                </div>
                <div className="p-col-12">
                    <InputText id="hoNombre" required={true} name="hoNombre" maxLength="70" placeholder="Ej. Daniela Andrea Ortiz Vaca" onChange={actualizarState} value={hoNombre} />
                </div>
                <div className="p-col-12">
                    <label >Teléfono Celular</label>
                </div>
                <div className="p-col-12">
                    <InputMask id="hoTelefono" required={true} name='hoTelefono' mask='999-9999-999' placeholder='099-8342-369' onChange={actualizarState} value={hoTelefono} />
                </div>




                <div className="p-col-12">
                    <label htmlFor="hoCorreo">Correo Electrónico</label>
                </div>
                <div className="p-col-12">
                    <InputText id="hoCorreo" type="email" required={true} name="hoCorreo" maxLength="30" placeholder="Ej. unombre@hotmail.com" onChange={actualizarState} value={hoCorreo} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="hoModalidad">Modalidad</label>
                </div>
                <div className="p-col-12">
                    <Dropdown name="hoModalidad" id="hoModalidad" 
                    value={hoModalidad} required={true}
                        options={modalidades} onChange={actualizarState} 
                        placeholder="Seleccione una Modalidad"
                        optionLabel="value" style={{ width: '12em' }} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="hoFechaIngreso">Fecha de Ingreso</label>
                </div>
                <div className="p-col-12">
                    <Calendar type="time" placeholder="07/15/2020" required={true} name="hoFechaIngreso" id="hoFechaIngreso"
                    onChange={actualizarState} value={hoFechaIngreso} monthNavigator yearNavigator  yearRange="2020:2022"/>
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
                    <InputText id="hoSector" required={true} maxLength="150" name="hoSector" placeholder="Ej. El Inca" onChange={actualizarState} value={hoSector} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="hoDireccion">Dirección</label>
                </div>
                <div className="p-col-12">
                    <InputTextarea rows={5} cols={30} maxLength="50" id="hoDireccion" name="hoDireccion" required={true}
                        placeholder="Ej. Toribio Hidalgo N17 y Atanasio Oleas, atrás del parque central de la Vicentina" onChange={actualizarState} value={hoDireccion} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="hoNivelEducativo">Nivel Educativo</label>
                </div>
                <div className="p-col-12">
                    <InputText maxLength="150" id="hoNivelEducativo" name="hoNivelEducativo" placeholder="Ej. Bachillerato" onChange={actualizarState} value={hoNivelEducativo} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="hoFechaNacimiento">Fecha de Nacimiento</label>
                </div>
                <div className="p-col-12">
                    <Calendar type="time" placeholder="07/15/2020"  required={true} name="hoFechaNacimiento" id="hoFechaNacimiento" onChange={actualizarState} 
                    value={hoFechaNacimiento} monthNavigator yearNavigator  yearRange="1960:2006"/>
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
                <InputText id="hoHijos" name="hoHijos" placeholder="Ej. 3" onChange={actualizarState} value={hoHijos} />
                </div>


              
                
                <div className="p-col-12">
                    <Button type="submit" label="Registrar"> </Button>
                </div>



            </form>


        </Fragment>
    );
}
export default RegistrarHomie;