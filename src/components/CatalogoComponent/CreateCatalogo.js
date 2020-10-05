import React, { Fragment, useState } from 'react';
import { createCatalogo } from '../../service/CatalogoService';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import swal from 'sweetalert';



const CreateCatalogo = ({cambiaEstadoLlenar, actualizarEstadoCrud}) => {


    const [catalogo, actualizaCatalogo] = useState({
        seNombre: '',
        seValor: ''
    });


    const actualizarState = e => {
        actualizaCatalogo({
            ...catalogo,
            [e.target.name]: e.target.value
        })
    }

    const registraCatalogo = (e) => {
        e.preventDefault();
        createCatalogo(catalogo)
            .then(result => {
                if (result) {
                    actualizarEstadoCrud('');
                    swal("Tenemos un nuevo Servicio", "Se ha registrado un nuevo Servicio", "success");
                    cambiaEstadoLlenar(true);
                }
            })

    }

    const { seNombre, seValor } = catalogo;


    return (
        <Fragment>

            <form onSubmit={registraCatalogo}>

                <h1>Nuevo Servicio</h1>


                <div className="p-col-12">
                    <label htmlFor="seNombre" >Nombre del Servicio</label>
                </div>
                <div className="p-col-12">
                    <InputText id="seNombre" required={true}
                        minLength="5"  name="seNombre" placeholder="Dos horas hogar"
                        onChange={actualizarState} value={seNombre} />
                </div>

                <div className="p-col-12">
                    <label htmlFor="seValor" >Valor</label>
                </div>
                <div className="p-col-12">
                    <InputText id="seValor" required={true}
                        mode="currency" currency="USD" locale="en-US"
                        name="seValor" 
                        onChange={actualizarState} value={seValor} />
                </div>


                <div className="p-col-12">
                    <Button type="submit" label="Registrar"> </Button>
                </div>


            </form>




        </Fragment>
    )
}

export default CreateCatalogo;
