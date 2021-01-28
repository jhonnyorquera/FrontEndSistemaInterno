import React, { Fragment,  useState, useContext } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ResumenPagos from './ResumenPagos';
import BuscarPagos from './BuscarPagos';


const PedidoPago = () => {
    const authContext = useContext(AuthContext);
    const { token } = authContext;

    const [listaPago, setListaPago] = useState({});





    const valor = (rowData) => {

        var faltante = rowData.peValor - rowData.peValorPagado


        return (
            <React.Fragment>


                <label htmlFor="psNombre" > ${faltante}
                </label>

            </React.Fragment>
        );
    }






    return (<Fragment>
        <div className="p-grid p-fluid dashboard">
            <div className="p-lg-2">
                <div className="card">
                    <BuscarPagos 
                    setListaPago={setListaPago} 
                    token={token}/>
                </div>

                <div className="card">
                    <div>
                        <ResumenPagos
                            listaPago={listaPago}
                        />

                    </div>
                </div>
            </div>
            <div className="p-lg-10">
                <div className="card">
                    <h1>Cobransas</h1>
                    <DataTable value={listaPago} className="p-datatable-sm"

                    >
                        <Column field="peCliente" header="Nombre" sortable={true} filter={true} filterMatchMode="contains"> </Column>
                        <Column field="peCodigo" header="Código Pedido" sortable={true} filter={true} filterMatchMode="contains" > </Column>
                        <Column field="peValor" header="Valor Total"  > </Column>
                        <Column field="peValorPagado" header="Valor Pagado"  > </Column>

                        <Column field="peValor" header="Faltante" body={valor}></Column>
                        <Column field="peStatusPago" header="Status Pago" sortable={true} filter={true} filterMatchMode="contains" ></Column>




                    </DataTable>
                </div>
            </div>
        </div>
    </Fragment>);
}

export default PedidoPago;