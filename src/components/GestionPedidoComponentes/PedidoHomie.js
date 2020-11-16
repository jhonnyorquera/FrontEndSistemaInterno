import React, { Fragment, useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { editarPedidoHomie } from '../../service/PedidoService';
import { crearPedidoHomie } from '../../service/PedidoService';
import SeleccionHomie from '../CrearPedidoComponentes/SeleccionHomie';
import swal from 'sweetalert';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Rating } from 'primereact/rating';

const PedidoHomie = ({ hoHomieList,codigoPedido  }) => {

   
    const [itemEditar, setItemEditar] = useState(null);
    const [homiesSelected, setHomiesSelected] = useState([])
    const [homiesStatus, setHomieStatus] = useState('')

  


    const [proceso, setProceso] = useState('');
    const [listaPedidoHomie, setListaPedidoHomie] = useState(hoHomieList);
    const [itemNuevo, setItemNuevo] = useState({
        peCodigo: codigoPedido,
        cedulaHomies: []

    });

    useEffect(() => {

        if(homiesSelected.length>0){
            const cedulas = [];
            homiesSelected.forEach(homie=>cedulas.push(homie.hHoCedula));
            setItemNuevo({...itemNuevo, cedulaHomies:cedulas})
            }
                    
    },[homiesSelected])







    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.hoPeHoCalificacion} readonly cancel={false} />;
    }

    const statusBodyTemplate = (rowData) => {
        return <InputSwitch
            id="hoPeStatus" checked={rowData.hoPeStatus}
        />


    }

    



   


    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide('no')} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => onHide('yes')} autoFocus />
            </div>
        );
    }



    const renderFooterCreate = (name) => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => onHide('no')} className="p-button-text" />
                <Button label="Agregar" icon="pi pi-check" onClick={() => agregarHomiesFunc('yes')} autoFocus />
            </div>
        );
    }



 const agregarHomiesFunc = (acc) => {
 
        setProceso('');
    if (acc === 'yes') {
        crearPedidoHomie(itemNuevo).then((res) => {  setListaPedidoHomie(res) });
        swal("Homie agregado", "Se agrega un Homie al pedido", "success");
    }
    
 }


    const agregandoHomies = ()=>{
        setHomieStatus('cargando')
        setProceso('nuevo')

    }


    const onHide = (name) => {
       
     
        setProceso('');


        if (name === 'yes') {
            const listaAux = listaPedidoHomie.filter(n => n.hoPeHoId !== itemEditar.hoPeHoId)
            editarPedidoHomie(itemEditar).then((res) => { setItemEditar(res) });
            listaAux.push(itemEditar);
            setListaPedidoHomie(listaAux);
            swal("Homie Editado", "Se edita un Homie", "success");
        }




    }




    return (<Fragment>


        <Dialog header="Editar Detalles" visible={proceso === 'editar'} style={{ width: '30vw' }} maximizable={true}
            footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>

            {itemEditar ?
                <Fragment>


                    <div className="p-grid">
                        <div style={{ fontWeight: 'bold' }} className="p-col-6"> Homie</div>
                        <div  className="p-col-6"> {itemEditar.hoHomie.hoNombre}</div>

                 </div>

                    <div className="p-grid">
                        <div style={{ fontWeight: 'bold' }} className="p-col-6"> Calificación</div>

                        <div className="p-col-6">
                            <Rating cancel={false} stars={5}
                                id="hoPeHoCalificacion" value={itemEditar.hoPeHoCalificacion}
                                name="hoPeHoCalificacion" maxLength="50"
                                onChange={(e) => { setItemEditar({ ...itemEditar, hoPeHoCalificacion: e.target.value }) }} /> </div>

                    </div>
                    <div className="p-grid">
                        <div style={{ fontWeight: 'bold' }} className="p-col-6"> Estado</div>

                        <div className="p-col-6">
                            <InputSwitch
                                id="hoPeStatus" checked={itemEditar.hoPeStatus}
                                name="hoPeStatus" maxLength="50"
                                onChange={(e) => { setItemEditar({ ...itemEditar, hoPeStatus: e.target.value }) }} /> </div>

                    </div>


                </Fragment>
                : null}
        </Dialog>

        <Dialog header="Agregar Homie a Servicio" visible={proceso === 'nuevo'} style={{ width: '50vw' }} 
        maximizable={true}
            footer={renderFooterCreate('displayBasic')} onHide={() => onHide('displayBasic')}>


            <Fragment>
                <div style={{ fontWeight: 'bold' }} className="p-col-12"> Homies</div>

                {homiesStatus === 'cargando' ?
                <div>                <SeleccionHomie
                    fechaBuscar={''}
                    cargarHomies={setHomiesSelected}
                    cargaEstado={setHomieStatus}
                />
                    
                  </div>
:

                <div className="p-col-6">Homies Seleccionados:
                                      
                       
                            <ul>
                                {homiesSelected.map(function (todo, index) {
                                    return (
                                        <li> {todo.hlHoNombre} </li>
                                    )
                                })}
                            </ul>
                           
                            <Button label="Seleccionar Homies"  onClick={() =>   setHomieStatus('cargando')}/>


                </div>


                   }


            </Fragment>

        </Dialog>








        <DataTable value={listaPedidoHomie} className="p-datatable-sm"
            sortField="hoHomie.hoNombre"
            selection={itemEditar}
            onSelectionChange={e => setItemEditar(e.value)} selectionMode="single"
            onRowEditInit={e => setProceso('editar')}
        >

            <Column field="hoHomie.hoNombre" header="Nombre" ></Column>

            <Column field="hoPeCalificacion" header="Calificación" body={ratingBodyTemplate}></Column>

            <Column field="hoPeStatus" header="Status" body={statusBodyTemplate}></Column>

            <Column rowEditor headerStyle={{ width: '5rem' }} header="Acción" ></Column>

        </DataTable>

        <Button label="Nuevo" icon="pi pi-plus" onClick={() => agregandoHomies()}
   />


    </Fragment>);
}

export default PedidoHomie;