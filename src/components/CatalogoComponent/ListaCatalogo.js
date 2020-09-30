import React, { Fragment, useState, useEffect } from 'react';

import { getCatalogoList } from '../../service/CatalogoService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const ListaCatalogo = (catalogoSelect, estadoCrud, procesando, isProcesando) => {


    const [catalogoLista, llenaListado] = useState([])

    const seleccionaCatalogo = (variable) => {
        catalogoSelect(variable);
        estadoCrud('view')
    }


    useEffect(() => {

        if (procesando) {
            getCatalogoList().then(data => llenaListado(data));
            isProcesando(false);
        }

    }, [procesando, isProcesando]
    );



    return (
        <Fragment>

            <h1>Lista Catalogo</h1>

            <DataTable value={catalogoLista}
                paginator={true}
                paginatorPosition="both"
                className="p-datatable-striped"
                selectionMode="single"
                sortField="clId" sortOrder={-1}
                responsive={true}
                onSelectionChange={e => seleccionaCatalogo(e.value)}
                rows={10} rowsPerPageOptions={[10, 20, 50]}
            >
                <Column field="seNombre" header="Servicio" sortable={true} filter={true} filterPlaceholder="Digita un número" filterMatchMode="contains" />
                <Column field="seValor" header="Valor" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />

            </DataTable>




        </Fragment>
    )

}
export default ListaCatalogo;