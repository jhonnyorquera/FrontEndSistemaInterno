import React, { Fragment, useEffect, useState, useContext} from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import { getResumenPagos } from '../../service/ResumeService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressBar } from 'primereact/progressbar';


const PedidoPago = () => {
    const authContext = useContext(AuthContext);
    const {  token } = authContext;

    const [listaPago, setListaPago] = useState({});
    const [recarga, setRecarga] = useState(true);

   /*eslint-disable */
    useEffect(() => {
        if (recarga) {
            getResumenPagos(token).then(data => setListaPago(data));
            setRecarga(false);
        }

    })



    
    const valor= (rowData) => {
     

        return (
            <React.Fragment>
               
                
        <label htmlFor="psNombre" > ${rowData.peValorPagado} de ${rowData.peValor} 
           </label>
               
            </React.Fragment>
        );
    }

    const activityBodyTemplate = (rowData) => {
        var progreso =rowData.peValor - rowData.peValorPagado 

        return (
            <React.Fragment>
                
                
                <ProgressBar value={progreso} showValue={false} unit={'$'}  showValue ={true}/>
            </React.Fragment>
        );
    }


    return (<Fragment>
        <div className="datatable-filter-demo">
           
            <div className="card">
            <h1>Cobransas</h1>
                <DataTable value={listaPago} className="p-datatable-sm"

                >
                 <Column field="peCliente" header="Nombre" > </Column>
                    <Column field="peCodigo" header="Código Pedido" > </Column>

                    <Column field="peValor" header="Valores"  body={valor}></Column> 
                
                    <Column field="peValorPagado"  body={activityBodyTemplate} header="Faltante"></Column>



                </DataTable>
            </div></div>
    </Fragment>);
}

export default PedidoPago;