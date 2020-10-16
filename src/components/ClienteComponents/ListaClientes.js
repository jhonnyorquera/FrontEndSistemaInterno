import React, { Fragment, useState, useEffect } from 'react'
import { getClientesList } from '../../service/ClientesService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ListaClientes = ({ clienteSelect, estadoCrud, procesando, isProcesando }) => {


    const [clientesLista, llenaListado] = useState([])

    const seleccionaCliente = (variable) => {
        clienteSelect(variable);
        estadoCrud('view')
    }


    useEffect(() => {

        if(procesando){
        getClientesList().then(data => llenaListado(data));
                isProcesando(false);
            }
   
            }, [procesando, isProcesando]
    );



    return (
        <Fragment>

            <h1>Nuestros Clientes</h1>
            <DataTable value={clientesLista}
                paginator={true}
                paginatorPosition="both"
                className="p-datatable-striped"
                selectionMode="single"
                sortField="clId" sortOrder={-1}
                responsive={true}
                onSelectionChange={e => seleccionaCliente(e.value)}
                rows={10} rowsPerPageOptions={[10, 20, 50]}
            >
                <Column field="clCedulaRuc" header="Cédula" sortable={true} filter={true} filterPlaceholder="Digita un número" filterMatchMode="contains" />
                <Column field="clNombre" header="Nombre" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                <Column field="clTelefono" header="Teléfono" sortable={true} />
                <Column field="clCorreo" header="Correo" sortable={true} />
            </DataTable>

        </Fragment>

    );
}

export default ListaClientes;