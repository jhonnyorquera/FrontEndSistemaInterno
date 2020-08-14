import React, { useState, Fragment } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { saveClient } from '../../service/ClientesService';
import { Button } from 'primereact/button';
import swal from 'sweetalert';

const CreateCliente = (estadoCrud) => {

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
        console.log('se crea cliente');
        e.preventDefault();
        var guardo = false;
        guardo = saveClient(clCliente);
      
        
           
       


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
                    <Button type="submit" label="Registrar"> </Button>
                </div>
            </form>

        </Fragment>
    );
}

export default CreateCliente;
