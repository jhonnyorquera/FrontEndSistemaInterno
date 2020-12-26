import React, { Fragment, useState, useEffect } from 'react';
import { getClientesList } from '../../service/ClientesService';
import CreateCliente from '../ClienteComponents/CreateCliente';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const SeleccionCliente = ({ clienteSelect, seleccionarCliente, cargaEstado, token }) => {

    const [clientesLista, llenaListado] = useState([])
    const [modo, seleccionarModo] = useState('seleccion');


    const actualizarEstadoCrud = () => {

    };

    const [procesando, isProcesando] = useState(false);

    useEffect(() => {


        if (!procesando) {
            getClientesList(token).then(data => llenaListado(data));
            seleccionarModo('seleccion')
        } else {
            isProcesando(true)
            seleccionarModo('')
            cargaEstado('')
        }

        /*eslint-disable */
    }, [procesando]

    );
    /*eslint-disable */

    return (

        <Fragment>
            {modo === 'seleccion' ?

                <DataTable value={clientesLista}
                    selection={clienteSelect}
                    onSelectionChange={e => seleccionarCliente(e.value)}
                    className="p-datatable-sm"
                    selectionMode="single"
                    sortField="clId" sortOrder={-1}
                    responsive={true}
                    dataKey="clCedulaRuc"
                    rows={5} rowsPerPageOptions={[5, 10]}   >
                    <Column field="clCedulaRuc" header="Cédula" sortable={true} filter={true} filterPlaceholder="Digita un número" filterMatchMode="contains" />
                    <Column field="clNombre" header="Nombre" sortable={true} filter={true} filterPlaceholder="Digita una letra" filterMatchMode="contains" />
                    <Column field="clTelefono" header="Teléfono" sortable={true} />
                </DataTable> : null
            }


            <div className="p-col-12">
                <Button label="Crear Cliente" onClick={(e) => seleccionarModo(
                    modo === 'seleccion' ? 'ingreso' : 'seleccion'
                )} />
            </div>

            {modo === 'ingreso' ?

                <CreateCliente
                    estadoCrud={actualizarEstadoCrud}
                    seleccionarCliente={seleccionarCliente}
                    isProcesando={isProcesando} /> : null
            }
        </Fragment>

    )


}

export default SeleccionCliente;