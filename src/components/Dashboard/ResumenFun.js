import React, { Fragment } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';

const ResumenFun = ({resumenHomie}) => {


    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.calificacion} readOnly cancel={false} />;
    }
    



    return (
        <Fragment>
            <div className="datatable-templating-demo">
                <div className="card">
                    <DataTable value={resumenHomie} >
                       
                        <Column field="nombre" header="Nombre"></Column>
                        <Column field="calificacion" header="Calificación" body={ratingBodyTemplate}></Column>
                        <Column field="dinero" header="Dinero"></Column>
                        <Column field="limpiezas" header="Limpiezas"></Column>
                        
                       
                    </DataTable>
                </div>
            </div>

        </Fragment>
    );
}

export default ResumenFun;