import React, { Fragment } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ServicioPedido = ({ hoPedidoServicioList }) => {


    return (<Fragment>

        <DataTable value={hoPedidoServicioList} className="p-datatable-sm">
            <Column field="psNombre" header="Nombre" > </Column>

            <Column field="psCantidad" header="Cantidad" ></Column>
            <Column field="psValor" header="Valor"></Column>

        </DataTable>

    </Fragment>);
}

export default ServicioPedido;