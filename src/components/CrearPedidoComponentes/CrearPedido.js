import React, { Fragment, useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';

const CrearPedido = ({ cargaEstado, clienteSelect, homies }) => {

    const [creaPedido, creandoPedido] = useState(true);



    const crearPedido = (e) => {

        e.preventDefault();
        creandoPedido(false);
    }


    useEffect(() => {
       
        if (clienteSelect) {
            camposPedido({
                ...pedido,
                peDireccion: clienteSelect.clDireccion
            })

            
        }
    }, [clienteSelect]);



    const [pedido, camposPedido] = useState({
        peFechaPedido: '',
        peCantidadHoras: '',
        peServicios: '',
        peObservacion: '',
        peValor: 0.00,
        peEstado: '',
        peDireccion:''

    });

    const { peFechaPedido, peCantidadHoras, peObservacion,  peDireccion } = pedido;

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
                                <div className="p-col-6">
                                    <label >Cliente</label>

                                    <div className="p-col-2">
                                        <Button icon="pi pi-search" onClick={(e) => cargaEstado('cliente')} />
                                    </div>
                                    <div className="p-col-6"><strong>Cliente Seleccionado: </strong>
                                        <h2> {
                                            clienteSelect ?
                                                <div>
                                                    {clienteSelect.clNombre} </div> : null
                                        }</h2>


                                    </div>


                                </div>


                                <div className="p-col-6">
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
                            <label htmlFor="peObservacion" >Observaciones</label>
                        </div>
                        <div className="p-col-12">

                            <InputText id="detallePedido" required={true}
                                minLength="10" maxLength="10" name="peObservacion" placeholder="Ej. Poner enfasis en las ventanas del cuarto master"
                                onChange={actualizarState} value={peObservacion} />
                        </div>

                        <div className="p-col-12">
                            <label htmlFor="peDireccion" >Direccion</label>
                        </div>
                        <div className="p-col-12">
                            <InputText id="peDireccion"
                                minLength="10"  name="peDireccion" placeholder="Ej. Toribio Hidalgo y Atansio Oleas"
                                onChange={actualizarState} value={peDireccion} />
                        </div>


                        <div className="p-col-12">
                            <label htmlFor="peCantidadHoras" >Cantidad Horas</label>
                        </div>
                        <div className="p-col-12">
                        <InputText  Type="NUMBER" id="peCantidadHoras" required={true}
                                name="peCantidadHoras" placeholder="5" 
                                onChange={actualizarState} value={peCantidadHoras} />
                        </div>


                        <div className="p-col-12">
                            <label htmlFor="peFechaPedido" >Servicios</label>
                        </div>
                       





                    </div>
                    : null
            }
        </Fragment>


    );

}

export default CrearPedido;