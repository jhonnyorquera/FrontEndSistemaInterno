import React, { useState, Fragment } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { saveClient } from '../../service/ClientesService';
import { Button } from 'primereact/button';
import swal from 'sweetalert';

const CreateCliente = ({ estadoCrud, seleccionarCliente, isProcesando }) => {

    const [clCliente, actualizaHomie] = useState({

        clId:'', clCedulaRuc: '', clTipo: '', clNombre: '', clSector: '', clDireccion: '', clTelefono: '', clCorreo: '', obFactura:''
    });


    const actualizarState = e => {
        actualizaHomie({
            ...clCliente,
            [e.target.name]: e.target.value
        })
    }

    const {  clCedulaRuc, clTipo, clNombre, clSector, clDireccion, clTelefono, clCorreo, obFactura } = clCliente;

    const crearCliente = (e) => {

        e.preventDefault();

        saveClient(clCliente).then(res => {
            seleccionarCliente(res);
            swal("Se registra cliente", "Se ha registrado el usuario: "+res.clId, "success");

        })
            .catch(error => {
                if (error.response) {
                    swal("No se registra cliente", "Algo ha ocurrido, prueba de nuevo o consulta al administrador", "error");

                } else if (error.request) {
                    swal("No se registra cliente", "Algo ha ocurrido, prueba de nuevo o consulta al administrador", "error");
                }

            }

            );


        estadoCrud(null);
        isProcesando(true);
    }


    return (
        <Fragment>

            <form onSubmit={crearCliente}>

                <h1>Registrar Cliente</h1>

                <div className="p-col-12">
                    <label htmlFor="clCedulaRuc" >Cédula</label>
                </div>
                <div className="p-col-12">
                    <InputText id="clCedulaRuc" required={true}
                        minLength="10" maxLength="10" name="clCedulaRuc" placeholder="Ej. 1720508888"
                        onChange={actualizarState} value={clCedulaRuc} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="clTipo" >Tipo</label>
                </div>
                <div className="p-col-12">
                    <InputText id="clTipo"
                        name="clTipo" placeholder="Ej. Hogar"
                        onChange={actualizarState} value={clTipo} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="clNombre" >Nombre</label>
                </div>
                <div className="p-col-12">
                    <InputText id="clNombre"
                        minLength="10" name="clNombre" placeholder="Ej. Beatriz Pinzón Solano"
                        onChange={actualizarState} value={clNombre} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="clSector" >Sector</label>
                </div>
                <div className="p-col-12">
                    <InputText id="clSector"
                        minLength="5" name="clSector" placeholder="Ej. Batán Alto"
                        onChange={actualizarState} value={clSector} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="clDireccion" >Dirección</label>
                </div>
                <div className="p-col-12">
                    <InputTextarea rows={5} cols={30} id="clDireccion"
                        minLength="10" name="clDireccion" placeholder="Ej. Toribio Hidalgo y Atanasio Oleas"
                        onChange={actualizarState} value={clDireccion} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="clTelefono" >Teléfono</label>
                </div>
                <div className="p-col-12">
                    <InputTextarea rows={2} cols={30} id="clTelefono"
                        minLength="10" name="clTelefono" placeholder="Ej. 0998342369, 022573897"
                        onChange={actualizarState} value={clTelefono} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="clCorreo">Correo Electrónico</label>
                </div>
                <div className="p-col-12">
                    <InputText id="clCorreo" type="email" name="clCorreo" maxLength="30" placeholder="Ej. unombre@hotmail.com" onChange={actualizarState} value={clCorreo} />
                </div>


                <div className="p-col-12">
                    <label htmlFor="obFactura" >Factura</label>
                </div>
                <div className="p-col-12">
                    <InputTextarea rows={2} cols={30} id="obFactura"
                        minLength="10" name="obFactura" placeholder="Ej. Mismos datos del cliente"
                        onChange={actualizarState} value={obFactura} />
                </div>


                <div className="p-col-12">
                    <Button type="submit" label="Registrar"> </Button>
                </div>

            </form>

        </Fragment>
    );
}

export default CreateCliente;
