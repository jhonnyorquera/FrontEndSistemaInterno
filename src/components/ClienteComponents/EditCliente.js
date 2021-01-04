import React, { Fragment, useState, useEffect, useContext } from 'react';
import { editClient } from '../../service/ClientesService';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import swal from 'sweetalert';
import AuthContext from '../../context/autenticacion/authContext';



const EditCliente = ({ selectedCliente, estadoCrud, isProcesando }) => {
    const authContext = useContext(AuthContext);
    const {  token } = authContext;

    useEffect(() => {
        actualizaCliente(selectedCliente)
    }, [selectedCliente]);

    const [clClienteEdit, actualizaCliente] = useState({
        clCedulaRuc: '', clNombre: '', clSector: '', clDireccion: '', clTelefono: '', clCorreo: '', obFactura:''
    })


    const actualizarState = e => {
        actualizaCliente({
            ...clClienteEdit,
            [e.target.name]: e.target.value
        })
    }

    const { clCedulaRuc,  clNombre, clSector, clDireccion, clTelefono, clCorreo, obFactura } = clClienteEdit;

    const editarCliente = (e) => {
        e.preventDefault();
        editClient(clClienteEdit, token);
        estadoCrud('');
        swal("Cliente Editado!", "Se ha editado el cliente: "+clClienteEdit.clNombre, "success");
        isProcesando(true);
       
    }


    return (

        <Fragment>
 
            <form onSubmit={editarCliente}>
            <div className="p-grid p-fluid dashboard">
            <Card style={{ width: '50%' }}>
                <div className="p-col-12">
                    <label htmlFor="clCedulaRuc" >Cédula</label>
                    <InputText id="clCedulaRuc" required={true}
                        minLength="10" maxLength="13" name="clCedulaRuc" placeholder="Ej. 1720508888"
                        onChange={actualizarState} value={clCedulaRuc} />
                </div>

          

                <div className="p-col-12">
                    <label htmlFor="clNombre" >Nombre</label>
                    <InputText id="clNombre" required={true}
                          name="clNombre" 
                        onChange={actualizarState} value={clNombre} />
                </div>

                
                <div className="p-col-12">
                    <label htmlFor="clTelefono" >Teléfono</label>
                </div>
                <div className="p-col-12">
                    <InputTextarea rows={2} cols={30} id="clTelefono"
                        minLength="9" name="clTelefono" placeholder="Ej. 0998342369, 022573897"
                        onChange={actualizarState} value={clTelefono} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="clCorreo">Correo Electrónico</label>
                </div>
                <div className="p-col-12">
                    <InputText id="clCorreo" type="email" name="clCorreo" maxLength="30" placeholder="Ej. unombre@hotmail.com" onChange={actualizarState} value={clCorreo} />
                </div>
              </Card>
                <Card style={{ width: '50%' }}>

                <div className="p-col-12">
                    <label htmlFor="clSector" >Sector</label>
                    <InputText id="clSector" required={true}
                        minLength="10" name="clSector" 
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
                    <label htmlFor="obFactura" >Factura</label>
                </div>
                <div className="p-col-12">
                    <InputTextarea rows={2} cols={30} id="obFactura"
                        minLength="10" name="obFactura" placeholder="Ej. Mismos datos del cliente"
                        onChange={actualizarState} value={obFactura} />
                </div>
          

               

                </Card>
                <div className="p-col-12">
                    <Button type="submit" label="Editar"> </Button>
                </div>
                </div>
            </form>
           
        </Fragment>

    );
}

export default EditCliente;