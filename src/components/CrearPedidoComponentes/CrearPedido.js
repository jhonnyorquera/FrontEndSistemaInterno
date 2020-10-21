import React, { Fragment, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

const CrearPedido = ({ cargaEstado, clienteSelect, homies }) => {

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
        peDireccion: ''

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




                        <div className="p-col-12">
                            <label htmlFor="peFechaPedido" >Fecha Pedido</label>
                        </div>
                        <div className="p-col-12">


                            <Calendar showTime hourFormat="24" name="peFechaPedido" value={peFechaPedido} onChange={actualizarState}></Calendar>
                        </div>



                        <div className="p-col-12">


                            <div className="p-grid p-fluid dashboard">
                                <div className="p-col-4">
                                    <label >Cliente</label>

                                    <div className="p-col-2">
                                        <Button icon="pi pi-search" onClick={(e) => cargaEstado('cliente')} />
                                    </div>
                                    <div className="p-col-4"><strong>Cliente Seleccionado: </strong>
                                        <h2> {
                                            clienteSelect ?
                                                <div>
                                                    {clienteSelect.clNombre} </div> : null
                                        }</h2>

                                        <h2> {
                                            clienteSelect ?
                                                <div>
                                                    {clienteSelect.clDireccion} </div> : null
                                        }</h2>
                                    </div>


                                </div>


                                <div className="p-col-8">
                                    <label  >Homie</label>
                                    <div className="p-col-2">
                                        <Button icon="pi pi-search" onClick={(e) => cargaEstado('homie')} />
                                    </div>
                                    <div className="p-col-6"><strong>Homies Seleccionados: </strong>
                                        <h2> {
                                            homies ?
                                                <ul>
                                                    {homies.map(function (todo, index) {
                                                        return (
                                                            <li> {todo.hlHoNombre} </li>
                                                        )
                                                    })}
                                                </ul>
                                                : null
                                        }</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <label htmlFor="peFechaPedido" >Observaciones</label>
                        </div>
                        <div className="p-col-12">

                            <InputText id="detallePedido" required={true}
                                minLength="10" maxLength="10" name="peFechaPedido" placeholder="Ej. 1720508888"
                                onChange={actualizarState} value={peFechaPedido} />
                        </div>


                        <div className="p-col-12">
                            <label htmlFor="peFechaPedido" >Servicios</label>
                        </div>
                        <div className="p-col-12">
                            <Button label="Seleccionar Servicios" onClick={(e) => cargaEstado('servicios')} />
                        </div>





                    </div>
                    : null
            }
        </Fragment>


    );

}

export default CrearPedido;