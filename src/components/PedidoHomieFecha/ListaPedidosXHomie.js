import React, { Fragment } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'moment/locale/es';
import moment from "moment";
import 'moment-timezone';

const ListaPedidosXHomie = ({ busqueda }) => {


    const dateBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {moment.utc(rowData.plFechaPedido).format("dddd, DD MMMM YYYY HH:mm")}{" "}
            </React.Fragment>
        );
    }


    return (<Fragment>

        <h1>Resultado</h1>

        <DataTable value={busqueda} paginator={true}
                paginatorPosition="both"
                className="p-datatable-striped"
                sortField="peCodigo" sortOrder={-1}
                rows={10}
                responsive={true} 

            >
                <Column field="peCodigo" header="Código" sortable={true} filter={true} filterPlaceholder="Digita un número" filterMatchMode="contains" />
                <Column field="plNombreCliente" header="Cliente" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                <Column field="plCantidadHoras" header="Horas" sortable={true} />
                <Column field="plFechaPedido" header="Fecha" body={dateBodyTemplate} sortable={true} />
                <Column field="plEstado" header="Estado" sortable={true} />
            </DataTable>
    </Fragment>);
}

export default ListaPedidosXHomie;

