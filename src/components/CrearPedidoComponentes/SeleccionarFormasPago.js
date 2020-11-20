import React, { Fragment, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { getPagos } from '../../service/VariablesService';

const SeleccionarFormasPago = ({ pedido, camposPedido }) => {

    const [pagosSelected, setPagosSelected] = useState();


    const [obPago, cargarObPago] = useState({
        ppFormaPago: '',
        ppValor: 0,
        ppComentario: ''
    });


    const [formasPago] = useState(getPagos());


    const { ppFormaPago, ppValor, ppComentario } = obPago;



    const agregarPagos = e => {
        e.preventDefault();

        if (ppFormaPago !== '' && ppValor !== 0 && ppComentario !== '' ) {
            var auxPago = pedido['pePagos'];

            var objPago2 = {
                ppFormaPago: obPago.ppFormaPago,
                ppValor: obPago.ppValor,
                ppComentario: ppComentario,
                ppEstado: true

            };

            auxPago.push(objPago2)

            camposPedido({
                ...pedido,
                pePagos: auxPago
            })
            cargarObPago({
                ppFormaPago: '',
                ppValor: 0,
                ppComentario: ''
            })
        }
    }

    const eliminarFechas = (e) => {

        let pagosPedido = pedido['pePagos']
        let _fechasFinales = pagosPedido.filter(val => !pagosSelected.includes(val));

        camposPedido({
            ...pedido,
            pePagos: _fechasFinales
        })


    }


    return (<Fragment>


        <div className="p-col-12">
            <form>
                <div className="p-grid p-fluid dashboard">
                    <div className="p-col-4">
                        <label htmlFor="ppFormaPago" >Forma de Pago</label>

                        <Dropdown value={ppFormaPago}
                            options={formasPago}
                            onChange={(e) => cargarObPago({ ...obPago, ppFormaPago:  e.target.value })}
                            optionLabel="value"
                        />

                    </div>
                    <div className="p-col-4">
                        <label htmlFor="ppValor" >Valor Cancelado</label>
                        <InputNumber id="ppValor"
                            name="ppFormaPago" value={ppValor} onValueChange={(e) => cargarObPago({ ...obPago, ppValor: e.value })} mode="currency" currency="USD" locale="en-US" />
                    </div>

                    <div className="p-col-4">
                        <label htmlFor="ppComentario" >Comentario</label>
                        <InputTextarea id="ppComentario"
                            name="ppComentario" value={ppComentario} onChange={(e) => cargarObPago({ ...obPago, ppComentario: e.target.value })} />
                    </div>

                    <div className="p-col-4" >

                        <p></p>
                        <Button onClick={(e) => agregarPagos(e)} icon="pi pi-plus" className="p-button-raised p-button-rounded" />
                    </div>
                </div>

            </form>
        </div>

        <div className="p-col-12">

            <DataTable value={pedido['pePagos']}
                selection={pagosSelected}
                className="p-datatable-striped"
                selectionMode="multiple"

                onSelectionChange={e => setPagosSelected(e.value)}
                responsive={true}

                rows={10} rowsPerPageOptions={[10, 20, 50]}   >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                <Column field="ppFormaPago" header="Forma Pago" sortable={true} />
                <Column field="ppValor" header="Valor" sortable={true} />
                <Column field="ppComentario" header="Comentario" sortable={true} />


            </DataTable>

            <div className="p-col-12" align="right">
                <Button onClick={(e) => eliminarFechas(e)} icon="pi pi-times" className="p-button-raised p-button-rounded p-button-danger" />

            </div>


        </div>

    </Fragment>);
}

export default SeleccionarFormasPago;