import React, { Fragment, useEffect, useState } from 'react';
import { getCatalogoList } from '../../service/CatalogoService';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const SeleccionarServicio = ({ servicios, cargarServicios, cargaEstado }) => {

    const [catalogoLista, llenaListado] = useState([])
    const [selectServices, setSelectServices] = useState([]);




    const llenarLista = () => {
        getCatalogoList().then(data => llenaListado(data));
    }

    useEffect(() => {
        llenarLista();
    }, []
    );





    const addItem = (newItem) => {

    }



    const seleccionarServicios = e => {
        e.preventDefault();
        let aux = servicios
        for (var valor of selectServices) {
            const updatedItems = [...aux, valor];
            aux = updatedItems
        }
        cargarServicios(aux);

        cargaEstado('')

    }


    return (
        <Fragment>
            <div><Button label="Seleccionar" onClick={(e) => seleccionarServicios(e)} className="p-button-raised p-button-rounded" /></div>


            <DataTable value={catalogoLista}
                paginator={true}
                paginatorPosition="bottom"
                selection={selectServices}
                className="p-datatable-striped"
                selectionMode="multiple"
                sortField="seCodigo" sortOrder={-1}
                onSelectionChange={e => setSelectServices(e.value)}
                responsive={true}

                rows={10} rowsPerPageOptions={[10, 20, 50]}   >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                <Column field="seNombre" header="Cédula" sortable={true} filter={true} filterPlaceholder="Digita un número" filterMatchMode="contains" />
                <Column field="seValor" header="Nombre" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />

            </DataTable>

        </Fragment>

    )
}

export default SeleccionarServicio;