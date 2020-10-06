import React, { Fragment, useState } from 'react';
import { InputText } from 'primereact/inputtext';

const CrearPedido = () => {

    const [creaPedido, creandoPedido] = useState(true);


    const crearPedido = (e) => {

        e.preventDefault();
        creandoPedido(false);
    }




    const [pedido, camposPedido] = useState({
        peFechaPedido: '',
        peCantidadHoras: '',
        peServicios: '',
        peObservacion: '',
        peValor: 0.00,
        peEstado: '',

    });

    const { peFechaPedido } = pedido;

    const actualizarState = e => {
        camposPedido({
            ...pedido,
            [e.target.name]: e.target.value
        })
    }



    return (
        <Fragment>
            {
                creaPedido ?
                    <div>


                        <form onSubmit={crearPedido}>

                            <div className="p-col-12">
                                <label htmlFor="peFechaPedido" >Fecha Pedido</label>
                            </div>
                            <div className="p-col-12">
                                <InputText id="peFechaPedido" required={true}
                                    minLength="10" maxLength="10" name="peFechaPedido" placeholder="Ej. 1720508888"
                                    onChange={actualizarState} value={peFechaPedido} />
                            </div>

                            <div className="p-col-12">
                                <label htmlFor="peFechaPedido" >Observaciones</label>
                            </div>
                            <div className="p-col-12">

                                <InputText id="detallePedido" required={true}
                                    minLength="10" maxLength="10" name="peFechaPedido" placeholder="Ej. 1720508888"
                                    onChange={actualizarState} value={peFechaPedido} />
                            </div>
                        </form>

                    </div>
                    : null
            }
        </Fragment>


    );

}

export default CrearPedido;