import React, { Fragment, useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { editarPedidoDetalle } from '../../service/PedidoService';
import SeleccionarEstado from '../CrearPedidoComponentes/SeleccionarEstado';
import swal from 'sweetalert';
import Moment from 'react-moment';
import 'moment/locale/es';

import moment from "moment";
import 'moment-timezone';

const DetallesPedido = ({ pedidoInfo }) => {


    const [displayBasic, setDisplayBasic] = useState(false);


    const [pedidoEditar, setPedidoEditar] = useState(pedidoInfo);


    useEffect(() => {
        setPedidoEditar(pedidoInfo)
    }, [pedidoInfo])


  

    const actualizarState = e => {
        setPedidoEditar({
            ...pedidoEditar,
            [e.target.name]: e.target.value
        })


    }


    const dialogFuncMap = {
        'displayBasic': setDisplayBasic


    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);



    }

    const onHide = (name) => {
        dialogFuncMap[`${'displayBasic'}`](false);
        delete pedidoEditar.hoComentarioList;
        delete pedidoEditar.hoHomieList;
        delete pedidoEditar.hoPedidoPadre
        delete pedidoEditar.hoPedidoPagoList
        delete pedidoEditar.hoPedidoServicioList
        if (name === 'yes') {
            editarPedidoDetalle(pedidoEditar).then((res) => { setPedidoEditar(res) })
            swal("Item Editado", "Se ha editado un Pedido", "success");
        } else {
           
            setPedidoEditar(pedidoInfo)
        }

    }

    const fecha = (fecha) => {
        return (

            <Moment format="dddd DD MMMM YYYY HH:mm">
                {fecha}
            </Moment>
        )
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide('no')} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => onHide('yes')} autoFocus />
            </div>
        );
    }



    const { peCodigo, peFechaPedido, peFechaCreacion, peCantidadHoras, peTipo,
        peObservacion, peValor, peEstado, peDireccion, hoPedidoPadre, hoCliente } = pedidoEditar;

    return (

        <Fragment>


            <Dialog header="Editar Detalles" visible={displayBasic} style={{ width: '50vw' }} maximizable={true}
                footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                <form>
                    <div className="p-col-12">
                        <label ><strong>Código: {peCodigo}</strong></label>
                    </div>

                    <div className="p-grid p-fluid dashboard">

                        <div className="p-col-4">
                            <div style={{ fontWeight: 'bold' }} className="p-col-12">Fecha Pedido </div>

                            <div className="p-col-12">
                                <Calendar name="peFechaPedido" stepMinute={10} value={peFechaPedido} stepMinute ={30} onChange={actualizarState} showTime ></Calendar>
                                <label htmlhtmlFor="peFechaPedido" style={{ fontWeight: 'bold' }} >{fecha(peFechaPedido)}</label>


                            </div>
                        </div>

                        <div className="p-col-4">
                            <div style={{ fontWeight: 'bold' }} className="p-col-12"> Cantidad de Horas</div>
                            <div className="p-col-12">
                                <InputText id="peCantidadHoras" required={true} name="peCantidadHoras" maxLength="50" onChange={actualizarState} value={peCantidadHoras} />
                            </div>
                        </div>


                        {peTipo === 'PRINCIPAL' ?

                            <div className="p-col-4">

                                <div style={{ fontWeight: 'bold' }} className="p-col-4">Valor</div>
                                <div className="p-col-12">
                                    <InputText id="peValor" required={true} name="peValor" maxLength="50" onChange={actualizarState} value={peValor} />
                                </div>
                            </div> : null}

                    </div>



                    <div className="p-col-12">
                        <label htmlFor="estado" ><strong>Estado</strong></label>
                    </div>
                    <div className="p-col-12">
                        <SeleccionarEstado
                            pedido={pedidoEditar}
                            camposPedido={setPedidoEditar} />
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



                </form>


            </Dialog>

            <div className="p-fluid">
                <div className="p-field">
                    <label ><strong>Código: </strong> </label>
                    <div className="p-col-12"> {peCodigo}</div>
                </div>


                <div className="p-field">
                    <div ><strong>Fecha Pedido: </strong></div>
                    <div className="p-col-12" > {fecha(peFechaPedido)}</div>
                </div>

                <div className="p-field">
                    <div><strong>Cliente: </strong></div>
                    <div className="p-col-12"> {hoCliente.clNombre}</div>
                </div>




                <div className="p-field">
                    <div><strong>Cantidad de Horas: </strong> </div>
                    <div className="p-col-12"> {peCantidadHoras}</div>

                </div>

                <div className="p-field">
                    <div ><strong>Fecha Creación: </strong> </div>
                    <div className="p-col-12"> {moment.utc(peFechaCreacion).format("dddd, DD MMMM YYYY, h:mm a")}</div>

                </div>

                <div className="p-field">
                    <div  ><strong>Tipo: </strong> </div>
                    <div className="p-col-12" >{peTipo}</div>

                </div>

                <div className="p-field">
                    <div ><strong>Observacion: </strong></div>
                    <div className="p-col-12">{peObservacion}</div>

                </div>

                <div className="p-field">
                    <div> <strong>Valor Total: </strong> </div>
                    <div className="p-col-12">{peValor}</div>

                </div>

                <div className="p-field">
                    <div ><strong>Estado: </strong> </div>
                    <div className="p-col-12">{peEstado}</div>

                </div>

                <div className="p-field">
                    <div ><strong>Dirección: </strong>  </div>
                    <div className="p-col-12">{peDireccion}</div>
                </div>

                {hoPedidoPadre ?

                    <div className="p-field">
                        <div ><strong>Pedido Padre: </strong></div>
                        <div className="p-col-12"> {hoPedidoPadre.peCodigo}</div>

                    </div> : null}

            </div>

            <Button label="Editar" icon="pi pi-external-link" onClick={() => onClick('displayBasic')} />

        </Fragment>
    );
}

export default DetallesPedido;