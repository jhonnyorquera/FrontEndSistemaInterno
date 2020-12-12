import React, { Fragment, useState, useEffect } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { getPagos } from '../../service/VariablesService';
import { editarPedidoPagoHomie } from '../../service/PedidoService';
import { guardarPedidoPagoHomie } from '../../service/PedidoService';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import swal from 'sweetalert';


const DetallePagos = ({ pedidoInfo }) => {

    const [opciones] = useState(getPagos());
    const [proceso, setProceso] = useState('');

    const [totalPago, setTotalPago] = useState(0.00);
    const [listaPago, setListaPago] = useState(pedidoInfo.hoPedidoPagoList);
    const [itemEditar, setItemEditar] = useState({
        ppFormaPago: '',
        ppValor: 0,
        ppComentario: '',
        ppPagoId: 0,
        ppEstado: true,
        hoPedidoCodigo: pedidoInfo.peCodigo

    });

   

    useEffect(() => {
        setListaPago(pedidoInfo.hoPedidoPagoList)
        setItemEditar({...itemEditar, hoPedidoCodigo: pedidoInfo.peCodigo})
         /*eslint-disable */
    }, [pedidoInfo])
     /*eslint-disable */


    const iniciarCreacion = () => {
        setProceso('crear');
        setItemEditar(reiniciarItemEditar);

    }

    useEffect(() => {

        let total = 0;
        for (let sale of listaPago) {
            if (sale.ppEstado === true) {
                total = total + parseFloat(sale.ppValor);
            }
        }
        setTotalPago(total);
    }, [listaPago])




    const { ppFormaPago, ppValor, ppComentario, ppPagoId, ppEstado } = itemEditar

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide('no')} className="p-button-text" />

                {proceso === 'crear' ?
                    <Button label="Guardar" icon="pi pi-check" onClick={() => guardarItem('yes')} autoFocus />
                    : null}

                {proceso === 'editar' ?
                    <Button label="Editar" icon="pi pi-check" onClick={() => onHide('yes')} autoFocus />
                    : null}
            </div>
        );
    }

    const reiniciarItemEditar = () => {
        return {
            ppFormaPago: '',
            ppValor: 0,
            ppComentario: '',
            ppPagoId: 0,
            ppEstado: true,
            hoPedidoCodigo: pedidoInfo.peCodigo
        }
    }

    const onHide = (name) => {

        if (name === 'yes' && itemEditar.ppPagoId !== null && proceso === 'editar') {
            const listaAux = listaPago.filter(n => n.ppPagoId !== itemEditar.ppPagoId)
            editarPedidoPagoHomie(itemEditar).then((res) => { setItemEditar(res) });
            listaAux.push(itemEditar);
            setListaPago(listaAux);
            swal("Pago Editado", "Se ha editado un Pago", "success");
        }
        setProceso('')



    }


    let footerGroup = <ColumnGroup>
        <Row>
            <Column footer="Total:" colSpan={2} footerStyle={{ textAlign: 'right' }} />
            <Column footer={totalPago.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} />

        </Row>
    </ColumnGroup>;




    const statusBodyTemplate = (rowData) => {
        return <InputSwitch
            id="ppEstado" checked={rowData.ppEstado}
        />


    }

    const guardarItem = (name) => {

        if (name === 'yes' && itemEditar.hoPedidoCodigo !== null && proceso === 'crear') {
            const listaAux = listaPago.filter(n => n.ppPagoId !== itemEditar.ppPagoId)
            guardarPedidoPagoHomie(itemEditar).then((res) => { setItemEditar(res) });
            listaAux.push(itemEditar);
            setListaPago(listaAux);
            swal("Pago Editado", "Se ha editado un Pago", "success");

        }
        setProceso('')



    }




    return (<Fragment>


        <Dialog header="Pago" visible={proceso === 'editar' || proceso === 'crear'}
            style={{ width: '30vw' }} maximizable={true}
            footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}
        >
            <form>


                <div className="p-grid">
                    <label htmlFor="ppFormaPago" className="p-col-12">Forma de Pago</label>
                    <div className="p-col-12">
                        <Dropdown value={ppFormaPago} optionLabel="value"
                            options={opciones} onChange={(e) => setItemEditar({ ...itemEditar, ppFormaPago: e.target.value })}
                        ></Dropdown>
                    </div>
                </div>



                <div >
                    <div className="p-grid">
                        <div className="p-col-12">     <label htmlFor="ppValor" >Valor Cancelado</label></div>
                        <div className="p-col-12">      
                        <InputNumber id="ppValor"
                            name="ppFormaPago" value={ppValor} 
                            onValueChange={(e) => setItemEditar({ ...itemEditar, ppValor: e.value })} 
                            mode="currency" currency="USD" locale="en-US" />
                        </div></div>
                </div>

                <div className="p-grid">
                    <div className="p-col-12">    <label htmlFor="ppComentario" >Comentario</label></div>
                    <div className="p-col-12">    <InputTextarea id="ppComentario"
                        name="ppComentario" value={ppComentario} onChange={(e) => setItemEditar({ ...itemEditar, ppComentario: e.target.value })} />
                    </div></div>


                <div className="p-grid">
                    <div className="p-col-12">   <label htmlFor="ppComentario" >Estado</label> </div>

                    <div className="p-col-12">   <div className="p-col-6">
                        <InputSwitch
                            id="ppEstado" checked={ppEstado}
                            name="ppEstado" maxLength="50"
                            onChange={(e) => { setItemEditar({ ...itemEditar, ppEstado: e.target.value }) }} /> </div>

                    </div>
                </div>




            </form>


        </Dialog>


        <DataTable value={listaPago} className="p-datatable-responsive-demo"
            selection={itemEditar} onRowEditInit={e => setProceso('editar')} footerColumnGroup={footerGroup}
            onSelectionChange={e => setItemEditar(e.value)} selectionMode="single">
            <Column field="ppFormaPago" header="Forma" sortable={true} > </Column>

            <Column field="ppComentario" header="Comentario"></Column>
            <Column field="ppValor" header="Valor" ></Column>
            <Column field="ppEstado" header="Status" body={statusBodyTemplate}></Column>
            <Column rowEditor headerStyle={{ width: '5rem' }} header="Acción" ></Column>
        </DataTable>


        <Button label="Nuevo"  onClick={(e) => iniciarCreacion()} icon="pi pi-plus"  />


    </Fragment>);
}

export default DetallePagos;