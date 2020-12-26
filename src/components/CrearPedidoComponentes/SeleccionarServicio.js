import React, { Fragment, useEffect, useState } from 'react';
import { getCatalogoList } from '../../service/CatalogoService';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const SeleccionarServicio = ({ servicios, cargarServicios, cargaEstado, token }) => {

    const [catalogoLista, llenaListado] = useState([])
    const [selectServices, setSelectServices] = useState([]);




    const llenarLista = () => {
        getCatalogoList(token).then(data => llenaListado(data));
    }

    useEffect(() => {
        llenarLista();
         // eslint-disable-next-line
    }, []
    );


    const seleccionarServicios = e => {
        e.preventDefault();
 
        let aux = servicios
        
        var iter = 0;
        
        for (var valor of selectServices) {
            iter+=1;
            valor['seCodigo']  = iter;
            const updatedItems = [...aux, valor];
            aux = updatedItems
        }

        let listaOrdenada = []
        for (var val of aux) {
            iter+=1;
            val['seCodigo']  = iter;
            const updatedItems = [...listaOrdenada, val];
            listaOrdenada = updatedItems
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
                <Column field="seNombreDetalle" header="Servicio" sortable={true} filter={true} filterPlaceholder="Digita un número" filterMatchMode="contains" />
                <Column field="seCantidad" header="Cantidad" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                <Column field="seValor" header="Valor" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />

          
            </DataTable>

        </Fragment>

    )
}

export default SeleccionarServicio;