import React, { Fragment, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const DetalleServicios = () => {

    const [detalles, setdetalleServicios] = useState([]);

    return (
        <Fragment>
            <h3>Detalle de Servicios</h3>
            <div>
                <DataTable value={detalles} paginator={true}
                    paginatorPosition="bottom"
                    className="p-datatable-striped"
                    selectionMode="single"
                    rows={10}
                    responsive={true} onSelectionChange={e =>
                        e
                    }

                >
                    <Column field="hoNombre" header="Servicio" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                    <Column field="hoTelefono" header="Valor" sortable={true} />
                </DataTable>
            </div>
        </Fragment>
    );
};

export default DetalleServicios;