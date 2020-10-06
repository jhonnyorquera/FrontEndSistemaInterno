import React, { Fragment, useEffect, useState } from 'react';
import { getCatalogoList } from '../../service/CatalogoService';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SeleccionarServicio = () => {

    const [catalogoLista, llenaListado] = useState([])



    const llenarLista = () => {
        getCatalogoList().then(data => llenaListado(data));
    }

    useEffect(() => {
       
            llenarLista();
       
    }, []
    );

    return (
        <Fragment>
            <DataTable value={catalogoLista}
                paginator={true}
                paginatorPosition="bottom"
                className="p-datatable-striped"
                selectionMode="single"
                sortField="seCodigo" sortOrder={-1}
                responsive={true}
                onSelectionChange={e => e}
                rows={10} rowsPerPageOptions={[10, 20, 50]}   >
                <Column field="seNombre" header="Cédula" sortable={true} filter={true} filterPlaceholder="Digita un número" filterMatchMode="contains" />
                <Column field="seValor" header="Nombre" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
               
            </DataTable>

        </Fragment>

    )
}

export default SeleccionarServicio;