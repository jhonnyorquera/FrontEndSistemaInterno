import React, { Fragment, useState, useEffect } from 'react';

import SeleccionarFechas from './SeleccionarFechas';
import SeleccionarFormasPago from './SeleccionarFormasPago';
import DetalleServicios from './DetalleServicios';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { crearPedido } from '../../service/PedidoService';
import { InputTextarea } from 'primereact/inputtextarea';
import SeleccionarEstado from './SeleccionarEstado';
import swal from 'sweetalert';

const CrearPedido = ({ cargaEstado, clienteSelect, homies, servicios, cargaModo, fechas, cargarFechas, pagos, cargarPagos, cargarServicios }) => {

   
    useEffect(() => {
        if (clienteSelect) {
            camposPedido({
                ...pedido,
                peDireccion: clienteSelect.clDireccion,
                peCliente: clienteSelect.clId
            })
        }
    }, [clienteSelect]);




    useEffect(() => {
        if (homies) {
            var cedulas = []
            if (homies.length > 0) {
              homies.map(
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

        if (Object.keys(servicios).length !== 0) {
            let total = 0;
            let detalles = servicios
            let cantidadDias = pedido["peFechaPedido"]
            if (detalles.length > 0 && cantidadDias.length > 0) {
                for (let sale of detalles) {
                    total = total + parseFloat(sale.seValor);
                }
                total = total * cantidadDias.length;
            }


            var servicio = servicios[0]
            camposPedido({
                ...pedido,
                peCantidadHoras: servicio['seCantidad'],
                peServicios: servicios,
                peValor: total
            })
        }
    }, [servicios]);



    const creacionPedido = (e) => {
        if (pedido.peEstado !== '' && pedido.peCliente !== 0 && pedido.peServicios.length !== 0 && pedido.peFechaPedido !== '' && pedido.peCantidadHoras !== 0) {
            e.preventDefault();
            //asgina atributos a objeto
            crearPedido(pedido).then(res => {
                swal("Se registra cliente", "Se ha registrado el PEDIDO: " + res, "success");
            }).catch(error => {
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
        else {
            swal("Falta Completar pedido", "Falta seleccionar servicios, cliente, fecha o cantidad de horas, completa los datos del pedido y continua", "info");
        }
    }

    const [pedido, camposPedido] = useState({
        peFechaPedido: [],
        peCliente: 0,
        peServicios: [],
        peCantidadHoras: 0,
        peObservacion: '',
        peValor: 0,
        peTipo: '',
        peEstado: '',
        cedulasHomies: [],
        peDireccion: '',
        pePagos: []
    });

    const { peObservacion, peDireccion,  peValor,  peCantidadHoras } = pedido;

    const actualizarState = e => {
        camposPedido({
            ...pedido,
            [e.target.name]: e.target.value
        })
    }



    return (
        <Fragment>
           
               
                    <div>

                        <DetalleServicios
                            servicios={servicios}
                            cargaEstado={cargaEstado}
                            cargarServicios={cargarServicios}
                            pedido={pedido}
                            camposPedido={camposPedido} />


                        <div className="p-col-12">
                            <label htmlFor="peValor" ><strong>Valor Total </strong></label>
                        </div>
                        <div className="p-col-12">
                            <label id="peValor" >{peValor}</label>
                        </div>

                        <div className="p-col-12">
                            <label htmlFor="peCantidadHoras" ><strong>Cantidad de Horas</strong></label>
                        </div>
                        <div className="p-col-12">
                            <InputText id="peCantidadHoras" required={true}
                                maxLength="300" name="peCantidadHoras" placeholder="Ej. 5"
                                onChange={actualizarState} value={peCantidadHoras} />
                        </div>
                        <div className="p-col-12">
                            <label htmlFor="peDetallePagos" ><strong> Detalle de Fechas</strong></label>
                        </div>
                        <div className="p-col-12">
                            <SeleccionarFechas
                                pedido={pedido}
                                camposPedido={camposPedido}
                            />
                        </div>


                        <div className="p-col-12">
                            <label htmlFor="peDetallePagos" > <strong>  Detalle de Pagos</strong></label>
                        </div>
                        <div className="p-col-12">
                            <SeleccionarFormasPago
                                pedido={pedido}
                                camposPedido={camposPedido}
                            />
                        </div>




                        <div className="p-col-12">
                            <label htmlFor="estado" ><strong>Estado</strong></label>
                        </div>
                        <div className="p-col-12">
                            <SeleccionarEstado
                                pedido={pedido}
                                camposPedido={camposPedido} />
                        </div>





                        <div className="p-col-12">
                            <div className="p-grid p-fluid dashboard">
                                <div className="p-col-6">
                                    <label ><strong> Cliente</strong></label>
                                    <div className="p-col-2">
                                        <Button icon="pi pi-search" className="p-button-raised p-button-rounded" onClick={(e) => cargaEstado('cliente')} />
                                    </div>
                                    <div className="p-col-6">Cliente Seleccionado:
                                        <h2> {
                                            clienteSelect ?
                                                <div>
                                                    {clienteSelect.clNombre} </div> : null
                                        }</h2>
                                    </div>
                                </div>


                                <div className="p-col-6">
                                    <label  ><strong>Homie</strong></label>
                                    <div className="p-col-2">
                                        <Button icon="pi pi-search" className="p-button-raised p-button-rounded" onClick={(e) => cargaEstado('homie')} />
                                    </div>
                                    <div className="p-col-6">Homies Seleccionados:
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
                            <label htmlFor="peObservacion" ><strong>Observaciones</strong></label>
                        </div>
                        <div className="p-col-12">

                            <InputTextarea rows={5} cols={30} id="detallePedido" required={true}
                                maxLength="300" name="peObservacion" placeholder="Ej. Poner enfasis en las ventanas del cuarto master"
                                onChange={actualizarState} value={peObservacion} />
                        </div>

                        <div className="p-col-12">
                            <label htmlFor="peDireccion" ><strong>Direccion</strong></label>
                        </div>
                        <div className="p-col-12">
                            <InputTextarea rows={5} cols={30} id="peDireccion"
                                minLength="10" maxLength="300" name="peDireccion" placeholder="Ej. Toribio Hidalgo y Atansio Oleas"
                                onChange={actualizarState} value={peDireccion} />
                        </div>




                        <div><Button label="CREAR PEDIDO" onClick={(e) => creacionPedido(e)} className="p-button-raised p-button-rounded" /></div>



                    </div>
                  
            
        </Fragment>


    );

}

export default CrearPedido;