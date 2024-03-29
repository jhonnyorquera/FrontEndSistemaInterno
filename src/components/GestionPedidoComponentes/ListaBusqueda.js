import React, { Fragment} from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'moment/locale/es';
import moment from "moment";
import 'moment-timezone';

const ListaBusqueda = ({ busqueda, pedidoSelected, setPedidoSelected }) => {

    const dateBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {moment.utc(rowData.peFecha).format("dddd, DD MMMM YYYY")}{" "}
            </React.Fragment>
        );
    }


    return (<Fragment>
        <DataTable value={busqueda} 
        paginator={true}
            paginatorPosition="bottom"
            className="p-datatable-sm"
            sortField="peCodigo" sortOrder={-1}
            rows={5}

            selection={pedidoSelected}
            onSelectionChange={e => setPedidoSelected(e.value)} selectionMode="single"
        >

            <Column field="peCodigo" header="Código"  filterPlaceholder="Digita una letra" filterMatchMode="contains" sortable={true} filter={true} />
            <Column field="peTipo" header="Tipo" filterMatchMode="contains" sortable={true} filter={true} />
            <Column field="clCliente" header="Cliente" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
            <Column field="peEstado" header="Estado" filterMatchMode="contains" sortable={true} filter={true} />
            <Column field="peCantidadHoras" header="Cantidad Horas" filterMatchMode="contains" sortable={true} filter={true} />
            <Column field="peFecha" header="Fecha" body={dateBodyTemplate} sortable={true} />
            <Column field="pePadre" header="Orden Padre" filterMatchMode="contains" sortable={true} filter={true} />
        </DataTable>
    </Fragment>);
}

export default ListaBusqueda;