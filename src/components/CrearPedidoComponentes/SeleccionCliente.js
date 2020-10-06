import React, { Fragment, useState, useEffect  }  from 'react';
import { getClientesList } from '../../service/ClientesService';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SeleccionCliente = () => {

    const [clientesLista, llenaListado] = useState([])


    useEffect(() => {
        getClientesList().then(data => llenaListado(data));
    }, []
    );

    return (

        <Fragment>
            <DataTable value={clientesLista}
                paginator={true}
                paginatorPosition="bottom"
                className="p-datatable-striped"
                selectionMode="single"
                sortField="clId" sortOrder={-1}
                responsive={true}
                onSelectionChange={e => e}
                rows={10} rowsPerPageOptions={[10, 20, 50]}   >
                <Column field="clCedulaRuc" header="Cédula" sortable={true} filter={true} filterPlaceholder="Digita un número" filterMatchMode="contains" />
                <Column field="clNombre" header="Nombre" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                <Column field="clTelefono" header="Teléfono" sortable={true} />
            </DataTable>

        </Fragment>

    )


}

export default SeleccionCliente;