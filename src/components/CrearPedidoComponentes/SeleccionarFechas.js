import React, { Fragment, useEffect, useState } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/es';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SeleccionarFechas = ({ cargarFechas, fechas }) => {

    const [fechasSelected, setFechasSelected] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);


    const agregarFecha = (e) => {
        e.preventDefault();
       
        
      
            let auxFech =fechas;
            auxFech.push(fechaSeleccionada);
            cargarFechas(auxFech)
       
    }


    const fechaGrilla = (fecha) => {
        return (
            <Moment format="dddd DD MMMM YYYY HH:mm">
                {fecha}
            </Moment>
        )
    }



    const eliminarFechas = (e) => {
        let _products = fechas.filter(val => !fechasSelected.includes(val));
        cargarFechas(_products)
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

      

                <DataTable value={fechas}
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