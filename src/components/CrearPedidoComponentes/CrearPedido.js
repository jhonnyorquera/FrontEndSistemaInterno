import React, { Fragment, useState, useEffect } from 'react';

import SeleccionarFechas from './SeleccionarFechas';
import SeleccionarFormasPago from './SeleccionarFormasPago';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { crearPedido } from '../../service/PedidoService';
import { InputTextarea } from 'primereact/inputtextarea';
import useEstadoPedido from '../../hooks/useEstadoPedido';

import swal from 'sweetalert';

const CrearPedido = ({ cargaEstado, clienteSelect, homies, servicios, cargaModo, fechas, cargarFechas, pagos, cargarPagos }) => {

    const [creaPedido, creandoPedido] = useState(true);
    const [estado, SeleccionEstado] = useEstadoPedido('');

    useEffect(() => {
        if (clienteSelect) {
            cargarCliente()
        }
    }, [clienteSelect]);



    useEffect(() => {
        if (homies) {
            var cedulas = []
            if (homies.length > 0) {
                var homiesCed = homies.map(
                    function (obj) {
                        cedulas.push(obj.hHoCedula)
                    }
                );
            }
            camposPedido({
                ...pedido,
                cedulasHomies: cedulas
            })
        }
    }, [homies]);

    useEffect(() => {

        camposPedido({
            ...pedido,
            peServicios: servicios
        })

        if (Object.keys(servicios).length !== 0) {

            var servicio = servicios[0]
            camposPedido({
                ...pedido,
                peCantidadHoras: servicio['seCantidad']
            })
        }
    }, [servicios]);

    const cargarCliente = (() => {
        camposPedido({
            ...pedido,
            peDireccion: clienteSelect.clDireccion,
            peCliente: clienteSelect.clId
        })
    });

    const creacionPedido = (e) => {


        if (pedido.peCliente === 0 || pedido.peServicios.length === 0 || pedido.peFechaPedido === '', pedido.peCantidadHoras === 0) {
            swal("Falta Completar pedido", "Falta seleccionar servicios, cliente, fecha o cantidad de horas, completa los datos del pedido y continua", "info");

        } else {
            e.preventDefault();
            //asgina atributos a objeto
            crearPedido(pedido).then(res => {
                swal("Se registra cliente", "Se ha registrado el PEDIDO: " + res, "success");
            })
                .catch(error => {
                    if (error.response) {
                        swal("No se registra cliente", "Algo ha ocurrido, prueba de nuevo o consulta al administrador", "error");

                    } else if (error.request) {
                        swal("No se registra cliente", "Algo ha ocurrido, prueba de nuevo o consulta al administrador", "error");
                    }
                }
                );
            cargaEstado(null);
            cargaModo('terminado');
        }
    }






    const [pedido, camposPedido] = useState({
        peFechaPedido: '',
        peCliente: 0,
        peServicios: [],
        peCantidadHoras: 0,
        peObservacion: '',
        peValor: 0.00,
        peTipo: '',
        peEstado: '',
        cedulasHomies: [],
        peDireccion: ''

    });

    const { peFechaPedido, peObservacion, peDireccion, peCliente, cedulasHomies, peValor, peTipo, peCantidadHoras } = pedido;

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
                            <label htmlFor="peCantidadHoras" >Cantidad de Horas</label>
                        </div>

                        <div className="p-col-12">
                            <InputText id="peCantidadHoras" required={true}
                                maxLength="300" name="peCantidadHoras" placeholder="Ej. 5"
                                onChange={actualizarState} value={peCantidadHoras} />
                        </div>
                        <div className="p-col-12">
                            <label htmlFor="peDetallePagos" >Detalle de Fechas</label>
                        </div>
                        <div className="p-col-12">
                            <SeleccionarFechas
                                fechas={fechas}
                                cargarFechas={cargarFechas}
                            />
                        </div>


                        <div className="p-col-12">
                            <label htmlFor="peDetallePagos" >Detalle de Pagos</label>
                        </div>
                        <div className="p-col-12">
                            <SeleccionarFormasPago
                                pagos={pagos}
                                cargarPagos={cargarPagos}
                            />
                        </div>


                        <div className="p-col-12">
                            <label htmlFor="estado" >Estado</label>
                        </div>
                        <div className="p-col-12">
                            <SeleccionEstado />
                        </div>





                        <div className="p-col-12">
                            <div className="p-grid p-fluid dashboard">
                                <div className="p-col-6">
                                    <label >Cliente</label>
                                    <div className="p-col-2">
                                        <Button icon="pi pi-search" className="p-button-raised p-button-rounded" onClick={(e) => cargaEstado('cliente')} />
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
                                        <Button icon="pi pi-search" className="p-button-raised p-button-rounded" onClick={(e) => cargaEstado('homie')} />
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

                            <InputTextarea rows={5} cols={30} id="detallePedido" required={true}
                                maxLength="300" name="peObservacion" placeholder="Ej. Poner enfasis en las ventanas del cuarto master"
                                onChange={actualizarState} value={peObservacion} />
                        </div>

                        <div className="p-col-12">
                            <label htmlFor="peDireccion" >Direccion</label>
                        </div>
                        <div className="p-col-12">
                            <InputTextarea rows={5} cols={30} id="peDireccion"
                                minLength="10" maxLength="300" name="peDireccion" placeholder="Ej. Toribio Hidalgo y Atansio Oleas"
                                onChange={actualizarState} value={peDireccion} />
                        </div>




                        <div><Button label="CREAR PEDIDO" onClick={(e) => creacionPedido(e)} className="p-button-raised p-button-rounded" /></div>



                    </div>
                    : null
            }
        </Fragment>


    );

}

export default CrearPedido;