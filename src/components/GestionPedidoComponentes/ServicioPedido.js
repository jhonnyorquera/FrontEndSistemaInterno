import React, { Fragment, useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import swal from 'sweetalert';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { guardarPedidoServicio } from '../../service/PedidoService';
import { editarPedidoServicio } from '../../service/PedidoService';

const ServicioPedido = ({ pedidoInfo }) => {

    const [pedidos, setPedidos] = useState(pedidoInfo.hoPedidoServicioList);
    const [proceso, setProceso] = useState('')
    const [pedido, setPedido] = useState({
        psCodigo: 0,
        psNombre: '',
        psCantidad: 0,
        psValor: 0.00,
        hoPedidoCod: pedidoInfo.peCodigo
    })


    const { psNombre, psCantidad, psValor } = pedido;



    const iniciarCreacion = () => {
        setProceso('crear');
        setPedido({
            hoPedidoCod: pedidoInfo.peCodigo
        });

    }


    useEffect(() => {
        setPedidos(pedidoInfo.hoPedidoServicioList)
        setPedido({ ...pedido, hoPedidoCod: pedidoInfo.peCodigo })
        /*eslint-disable */
    }, [pedidoInfo])
    /*eslint-disable */

    const iniciarEdicion = (item) => {

        setProceso('editar');
        setPedido(item);
        setPedido({ ...pedido, hoPedidoCod: pedidoInfo.peCodigo })
    }


    const onHide = (name) => {

        if (name === 'yes') {
            if (proceso === 'editar') {
                const listaAux = pedidos.filter(n => n.psCodigo !== pedido.psCodigo)
                editarPedidoServicio(pedido).then((res) => { setPedido(res) });
                listaAux.push(pedido);
                setPedidos(listaAux);
                swal("Comentario Editado", "Se ha editado un Comentario", "success");
            }
            if (proceso === 'crear') {
                const listaAux = pedidos
                guardarPedidoServicio(pedido).then((res) => { setPedido(res) })
                listaAux.push(pedido);
                setPedidos(listaAux)
                swal("Comentario Creado", "Se añadió un Comentario", "success");
            }

        }
        setProceso('')
    }



    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide('no')} className="p-button-text" />

                <Button label="Procesar" icon="pi pi-check" onClick={() => onHide('yes')} autoFocus />

            </div>
        );
    }



    return (<Fragment>
        <Dialog header="Servicio" visible={proceso === 'editar' || proceso === 'crear'}
            style={{ width: '30vw' }} maximizable={true} footer={renderFooter('displayBasic')}
            onHide={() => onHide('displayBasic')}
        >
            <form>

                <div className="p-grid">
                    <div className="p-col-12">    <label htmlFor="psNombre" >Nombre</label></div>
                    <div className="p-col-12">
                        <InputText id="psNombre"
                            name="psNombre" value={psNombre} onChange={(e) => setPedido({ ...pedido, psNombre: e.target.value })} />
                    </div></div>
                <div className="p-grid">
                    <div className="p-col-12">    <label htmlFor="psCantidad" >Cantidad</label></div>
                    <div className="p-col-12">
                        <InputNumber id="psCantidad"
                            name="psCantidad" value={psCantidad} onChange={(e) => setPedido({ ...pedido, psCantidad: e.value })} />
                    </div>
                </div>
                <div className="p-grid">
                    <div className="p-col-12">    <label htmlFor="psValor" >Valor</label></div>
                    <div className="p-col-12">
                        <InputNumber id="psValor" mode="currency" currency="USD" locale="en-US"
                            name="psValor" value={psValor} onChange={(e) => setPedido({ ...pedido, psValor: e.value })} />
                    </div>
                </div>



            </form>


        </Dialog>




        <DataTable value={pedidos} className="p-datatable-sm"

            selection={pedido} onRowEditInit={e => iniciarEdicion(e.value)}
            onSelectionChange={e => setPedido(e.value)}
            selectionMode="single">
            <Column field="psNombre" header="Nombre" > </Column>

            <Column field="psCantidad" header="Cantidad" ></Column>
            <Column field="psValor" header="Valor"></Column>
            <Column rowEditor headerStyle={{ width: '5rem' }} header="Acción" ></Column>


        </DataTable>

        <Button label="Nuevo Servicio" onClick={(e) => iniciarCreacion()} icon="pi pi-plus" />


    </Fragment>);
}

export default ServicioPedido;