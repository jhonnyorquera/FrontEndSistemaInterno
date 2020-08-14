import React, { Fragment, useState, useEffect } from 'react'
import { getClientesList } from '../../service/ClientesService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ListaClientes = ({ clienteSelect, estadoCrud }) => {

    const [consulta, activaConsulta] = useState(true)
    const [clientes, llenaListado] = useState([])
    // const [clienteSelect, seleccionarCliente] =useState(null);

    const seleccionaCliente = (variable) => {
        clienteSelect(variable);
        estadoCrud('view')

    }

    useEffect(() => {
        if (consulta) {
            getClientesList().then(data => llenaListado(data));
            activaConsulta(false);
        }
    }, [consulta, clientes]

    )


    return (
        <Fragment>
            <h1>Nuestros Clientes</h1>
            <DataTable value={clientes} paginatorPosition="both" selectionMode="single" rows={10}
                responsive={true} onSelectionChange={e => seleccionaCliente(e.value)}

            >
                <Column field="clCedulaRuc" header="Cédula" sortable={true} filter={true} filterPlaceholder="Digita un número" filterMatchMode="contains" />
                <Column field="clNombre" header="Nombre" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                <Column field="clTelefono" header="Fecha Nacimiento" sortable={true} />
                <Column field="clCorreo" header="Teléfono" sortable={true} />
            </DataTable>

        </Fragment>

    );
}

export default ListaClientes;