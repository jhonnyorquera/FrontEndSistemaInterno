import React, { Fragment, useEffect, useState } from 'react';
import { getHomiesPedidosList } from '../../service/HomieService';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const SeleccionHomie = ({ fechaBuscar, cargarHomies, cargaEstado }) => {


    const [listaHomie, setListaHomie] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);

    const [selectHomie, setSelectHomie] = useState([]);

    useEffect(() => {

        getHomiesPedidosList(fechaBuscar)
            .then(res =>
                setListaHomie(res)
            );

    }, [fechaBuscar]);

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Trabajos de {data.hlHoNombre}</h5>
                <DataTable value={data.pedidos}   className="p-datatable-sm">
                    <Column field="lpFechaPedido" header="Fecha" ></Column>
                    <Column field="lpCantidadHoras" header="horas" ></Column>
                    <Column field="lpNombreCliente" header="Cliente" ></Column>
                    <Column field="lpEstado" header="Estado"></Column>

                </DataTable>
            </div>
        );
    }

    const seleccionarHomies = e => {
        cargarHomies(selectHomie);
        cargaEstado('')
    }





    return (
        <Fragment>
            <div><Button label="Seleccionar"  onClick={(e) => seleccionarHomies(e)}  className="p-button-raised p-button-rounded" /></div>
            <div>
                <DataTable value={listaHomie} paginator={true}
                    paginatorPosition="bottom"
                    className="p-datatable-sm"
                    selection={selectHomie}
                    onSelectionChange={e => setSelectHomie(e.value)}
                    selectionMode="multiple"
                    sortField="hlHoNombre" sortOrder={-1}
                    rows={10}
                    responsive={true}
                    expandedRows={expandedRows}
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}

                >

                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column expander style={{ width: '3em' }} />
                    <Column field="hlHoNombre" header="Nombre" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                    <Column field="hlHoModalidad" header="Modalidad" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                    <Column field="hlHoTelefono" header="Telefono" sortable={true} />
                </DataTable>
            </div>
        </Fragment>

    );

}

export default SeleccionHomie;