import React, { Fragment, useEffect, useState } from 'react';
import { getHomiesDisponiblesList } from '../../service/HomieService';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SeleccionHomie = () => {


    const [listaHomie, setListaHomie] = useState([]);

    useEffect(() => {

        getHomiesDisponiblesList()
            .then(res =>
                setListaHomie(res)
            );

    }, []);


    return (
        <Fragment>

            <DataTable value={listaHomie} paginator={true}
                paginatorPosition="bottom"
                className="p-datatable-striped"
                selectionMode="single"
                sortField="hoNombre" sortOrder={-1}
                rows={10}
                responsive={true} onSelectionChange={e =>
                    e
                }

            >
                <Column field="hoCedula" header="Nombre" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                <Column field="hoNombre" header="Nombre" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                <Column field="hoTelefono" header="Teléfono" sortable={true} />
            </DataTable>

        </Fragment>

    );

}

export default SeleccionHomie;