import React, { Fragment, useState } from 'react';


import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

const SeleccionarFormasPago = ({ pagos, cargarPagos }) => {

    const [pagosSelected, setPagosSelected] = useState();

    const [obPago, cargarObPago] = useState({
        ppFormaPago: '',
        ppValor: 0
    });


    const formasPago = [
        { ppFormaPago: 'Efectivo' },
        { ppFormaPago: 'Transferencia Pichincha' },
        { ppFormaPago: 'Transferencia Pacifico' },
        { ppFormaPago: 'Transferencia Guayaquil' }
    ];

    const { ppFormaPago, ppValor } = obPago;

    const actualizarState = e => {
        cargarObPago({ ...obPago, [e.target.name]: e.target.value })
    }

    const agregarPagos = e => {
        e.preventDefault();
        var auxPago = pagos;

        var objPago2 = {
            ppFormaPago: obPago.ppFormaPago.ppFormaPago,
            ppValor: obPago.ppValor

        };
        
        auxPago.push(objPago2)
        cargarPagos(auxPago)
        cargarObPago('')

    }

    const onFormaPagoChange = (e) => {
        cargarObPago({ ...obPago, [ppFormaPago]: e.value })
       

    }


    const eliminarFechas = (e) => {
        let _fechasFinales = pagos.filter(val => !pagosSelected.includes(val));
        cargarPagos(_fechasFinales)



    }


    return (<Fragment>


        <div className="p-col-12">
            <form>
                <div className="p-grid p-fluid dashboard">
                    <div className="p-col-4">
                        <label htmlFor="ppFormaPago" >Forma de Pago</label>

                        <Dropdown value={ppFormaPago}
                            options={formasPago} onChange={(e) => cargarObPago({ ...obPago, ppFormaPago: e.value })}  optionLabel="ppFormaPago" placeholder="Seleccione forma de pago" />

                    </div>
                    <div className="p-col-4">
                        <label htmlFor="ppValor" >Valor Cancelado</label>
                        <InputNumber id="ppValor"
                            name="ppFormaPago" value={ppValor} onValueChange={(e) => cargarObPago({ ...obPago, ppValor: e.value })} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="p-col-4" >
                    
                    <p></p>
                        <Button onClick={(e) => agregarPagos(e)} icon="pi pi-plus" className="p-button-raised p-button-rounded"/>
                    </div>
                </div>

            </form>
        </div>

        <div className="p-col-12">

            <DataTable value={pagos}
                selection={pagosSelected}
                className="p-datatable-striped"
                selectionMode="multiple"

                onSelectionChange={e => setPagosSelected(e.value)}
                responsive={true}

                rows={10} rowsPerPageOptions={[10, 20, 50]}   >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                <Column field="ppFormaPago" header="Forma Pago" sortable={true} />
                <Column field="ppValor" header="Valor" sortable={true} />


            </DataTable>

            <div className="p-col-12" align="right">
                    <Button onClick={(e) => eliminarFechas(e)} icon="pi pi-times" className="p-button-raised p-button-rounded p-button-danger" />

                </div>


        </div>

    </Fragment>);
}

export default SeleccionarFormasPago;