import React, { useState, Fragment, useEffect, useContext} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AuthContext from '../../context/autenticacion/authContext';
import { getHomiesList } from '../../service/HomieService';




const ListarHomie = ({ homieSeleccion, actualizarEstadoCrud, procesando, isProcesando }) => {
  
  
    const authContext = useContext(AuthContext);
    const {  token } = authContext;

    const [listaHomie, setListaHomie] = useState([]);

    const seleccionaHomie = (variable) => {
        homieSeleccion(variable);
        actualizarEstadoCrud('view')
    }

    useEffect(() => {
        if (procesando) {
            getHomiesList(token)
                .then(res =>
                    setListaHomie(res)
                );
            isProcesando(false)
        }   // eslint-disable-next-line
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