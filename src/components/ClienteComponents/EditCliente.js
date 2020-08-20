import React, { Fragment, useState, useEffect } from 'react';
import { editClient } from '../../service/ClientesService';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import swal from 'sweetalert';



const EditCliente = ({ selectedCliente, estadoCrud, isProcesando }) => {


    useEffect(() => {
        actualizaCliente(selectedCliente)
    }, []);

    const [clClienteEdit, actualizaCliente] = useState({
        clCedulaRuc: '', clTipo: '', clNombre: '', clSector: '', clDireccion: '', clTelefono: '', clCorreo: '', obFactura
    })


    const actualizarState = e => {
        actualizaCliente({
            ...clClienteEdit,
            [e.target.name]: e.target.value
        })
    }

    const { clCedulaRuc, clTipo, clNombre, clSector, clDireccion, clTelefono, clCorreo, obFactura } = clClienteEdit;

    const editarCliente = (e) => {
        console.log('se crea cliente');
        e.preventDefault();
        var guardo = false;
        editClient(clClienteEdit);
        estadoCrud('');
        swal("Cliente Editado!", "Se ha editado el cliente: "+clClienteEdit.clNombre, "success");
        isProcesando(true);
       
    }


    return (

        <Fragment>

            <form onSubmit={editarCliente}>

                <div className="p-col-12">
                    <label htmlFor="clCedulaRuc" >Cédula</label>
                    <InputText id="clCedulaRuc" required={true}
                        minLength="10" maxLength="10" name="clCedulaRuc" placeholder="Ej. 1720508888"
                        onChange={actualizarState} value={clCedulaRuc} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="clNombre" >Cédula</label>
                    <InputText id="clNombre" required={true}
                        minLength="10" maxLength="10" name="clNombre" placeholder="Ej. 1720508888"
                        onChange={actualizarState} value={clNombre} />
                </div>
          

                <div className="p-col-12">
                    <Button type="submit" label="Editar"> </Button>
                </div>


            </form>
        </Fragment>

    );
}

export default EditCliente;