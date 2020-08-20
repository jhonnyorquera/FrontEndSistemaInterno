import React, { useState, Fragment } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ScrollPanel } from 'primereact/scrollpanel';
import { saveClient } from '../../service/ClientesService';
import { Button } from 'primereact/button';
import swal from 'sweetalert';

const CreateCliente = ({estadoCrud, seleccionarCliente, isProcesando}) => {

    const [clCliente, actualizaHomie] = useState({

        clCedulaRuc: '', clTipo: '', clNombre: '', clSector: '', clDireccion: '', clTelefono: '', clCorreo: '', obFactura
    });


    const actualizarState = e => {
        actualizaHomie({
            ...clCliente,
            [e.target.name]: e.target.value
        })
    }

    const { clCedulaRuc, clTipo, clNombre, clSector, clDireccion, clTelefono, clCorreo, obFactura } = clCliente;

    const crearCliente = (e) => {
        console.log('CREACLIENTE: se crea cliente');
        e.preventDefault();
        var guardo = false;
        seleccionarCliente(saveClient(clCliente));
        estadoCrud(null);
        isProcesando(true);
        swal("Cliente Creado!", "Se ha creado el cliente con id!"+clCliente.clNombre, "success");
        
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
                    <InputText id="clTipo" required={true}
                          name="clTipo" placeholder="Ej. Hogar"
                        onChange={actualizarState} value={clTipo} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="clNombre" >Nombre</label>
                </div>
                <div className="p-col-12">
                    <InputText id="clNombre" required={true}
                        minLength="10"  name="clNombre" placeholder="Ej. Beatriz Pinzón Solano"
                        onChange={actualizarState} value={clNombre} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="clSector" >Sector</label>
                </div>
                <div className="p-col-12">
                    <InputText id="clSector" required={true}
                        minLength="5"  name="clSector" placeholder="Ej. Batán Alto"
                        onChange={actualizarState} value={clSector} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="clDireccion" >Dirección</label>
                </div>
                <div className="p-col-12">
                <InputTextarea rows={5} cols={30} id="clDireccion" required={true}
                        minLength="10"  name="clDireccion" placeholder="Ej. Toribio Hidalgo y Atanasio Oleas"
                        onChange={actualizarState} value={clDireccion} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="clTelefono" >Teléfono</label>
                </div>
                <div className="p-col-12">
                <InputTextarea rows={2} cols={30} id="clTelefono" required={true}
                        minLength="10"  name="clTelefono" placeholder="Ej. 0998342369, 022573897"
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
                <InputTextarea rows={2} cols={30} id="obFactura" required={true}
                        minLength="10"  name="obFactura" placeholder="Ej. Mismos datos del cliente"
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
