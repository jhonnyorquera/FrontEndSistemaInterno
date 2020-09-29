

import React, { useState, Fragment, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { getHomiesList } from '../../service/HomieService';



const ListarHomie = ({ homieSeleccion, actualizarEstadoCrud, procesando, isProcesando }) => {


    const [listaHomie, setListaHomie] = useState([]);

    const seleccionaHomie = (variable) => {
        homieSeleccion(variable);
        actualizarEstadoCrud('view')
    }

    useEffect(() => {
        if (procesando) {
            getHomiesList()
                .then(res =>
                    setListaHomie(res)
                );
            isProcesando(false)
        }
    }, [procesando, isProcesando]);




    return (
        <Fragment>

            <h1>Nuestros Homies</h1>
            <DataTable value={listaHomie} paginator={true}
                paginatorPosition="both"
                className="p-datatable-striped"
                selectionMode="single"
                sortField="hoFechaRegistro" sortOrder={-1}
                rows={10}
                responsive={true} onSelectionChange={e =>
                    seleccionaHomie(e.value)
                }

            >
                <Column field="hoCedula" header="Cédula" sortable={true} filter={true} filterPlaceholder="Digita un número" filterMatchMode="contains" />
                <Column field="hoNombre" header="Nombre" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                <Column field="hoFechaNacimiento" header="Fecha Nacimiento" sortable={true} />
                <Column field="hoTelefono" header="Teléfono" sortable={true} />
            </DataTable>
            <div />





        </Fragment>
    )

}

export default ListarHomie;