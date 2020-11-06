import React, { Fragment, useState } from 'react';
import Moment from 'react-moment';
import 'moment/locale/es';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SeleccionarFechas = ({ pedido, camposPedido }) => {

    const [fechasSelected, setFechasSelected] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);


    const agregarFecha = (e) => {
        e.preventDefault();
        let auxFech = pedido['peFechaPedido'];
        auxFech.push(fechaSeleccionada);
        let total = 0;
        let detalles = pedido["peServicios"]
        let cantidadDias = pedido["peFechaPedido"]
        if (detalles.length > 0 && cantidadDias.length > 0) {
            console.log('entra a if calcular')
            for (let sale of detalles) {
                total = total + parseFloat(sale.seValor);
            }
            total = total * cantidadDias.length;
        }

        camposPedido({
            ...pedido,
            peFechaPedido: auxFech,
            peValor: total
        })
    }

    const eliminarFechas = (e) => {
        e.preventDefault();
        let fechasAux = pedido['peFechaPedido'];
        let _products = fechasAux.filter(val => !fechasSelected.includes(val));
        let total = 0;
        let detalles = pedido["peServicios"]

        if (detalles.length > 0 && _products.length > 0) {
            for (let sale of detalles) {
                total = total + parseFloat(sale.seValor);
            }
            total = total * _products.length;
        }

        camposPedido({
            ...pedido,
            peFechaPedido: _products,
            peValor: total
        })
    }


    const fechaGrilla = (fecha) => {
        console.log('fecha: '+fecha);
        return (
            
            <Moment format="dddd DD MMMM YYYY HH:mm">
                {fecha}
            </Moment>
        )
    }




    return (

        <Fragment>
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-4">
                    <Calendar name="fechaSeleccionada" value={fechaSeleccionada} onChange={a => setFechaSeleccionada(a.value)} showTime ></Calendar>
                </div>
                <div className="p-col-4">
                    <Button icon="pi pi-plus" className="p-button-raised p-button-rounded" onClick={(e) => agregarFecha(e)} />
                </div>
            </div>
            <div>



                <DataTable value={pedido['peFechaPedido']}
                    selection={fechasSelected}
                    className="p-datatable-striped"
                    selectionMode="multiple"
                    onSelectionChange={e => setFechasSelected(e.value)}
                    responsive={true}
                    rows={10} rowsPerPageOptions={[10, 20, 50]}   >
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="date" body={fechaGrilla} header="Fechas" sortable={true} />
                </DataTable>

                <div className="p-col-12" align="right">
                    <Button onClick={(e) => eliminarFechas(e)} icon="pi pi-times" className="p-button-raised p-button-rounded p-button-danger" />
                </div>
            </div>

        </Fragment>


    )

}

export default SeleccionarFechas;