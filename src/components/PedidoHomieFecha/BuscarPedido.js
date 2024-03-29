import React, { Fragment, useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { getHomiesList } from '../../service/HomieService';
import { Dropdown } from 'primereact/dropdown';
import { getPedidosHomieFecha } from '../../service/ResumeService';
import { Button } from 'primereact/button';
import swal from 'sweetalert';

const BuscarPedido = ({ setBusqueda, token }) => {

    const [camposBusqueda, setCamposBusqueda] = useState({
        cliente: '',
        fechaInicio: fechaInicial(),
        fechaFin: fechaFinal()
    });



    function fechaInicial(){
        var a= new Date();
        a.setDate(1);
        return a
       }



       function fechaFinal(){
        var date = new Date();
        return new Date(date.getFullYear(), date.getMonth() + 1, 0)
       }


    const [inicio, setInicio] = useState(true);

    const [homie, setHomie] = useState({})
    const [homieSelected, setHomieSelected] = useState({})
  
    /*eslint-disable */
    useEffect(() => {
        if (inicio) {
            getHomiesList(token)
                .then(res =>
                    setHomie(res)
                )
            setInicio(false)
        }
    })

    useEffect(() => {
        if (homieSelected) {
            setCamposBusqueda({ ...camposBusqueda, cliente: homieSelected.hoCedula })
        }
    }, [homieSelected])






    const buscar = (e) => {

        e.preventDefault();


        if (cliente !== '' && fechaInicio !== '' && fechaFin !== '') {


            getPedidosHomieFecha(camposBusqueda, token).then(res => {
                setBusqueda(res)
                if(res.length === 0){
                    swal("No existen Registros", "No existen registros con esos campos de busqueda", "info");
                }
              
            })

        }
    }




    const { fechaInicio, fechaFin, cliente } = camposBusqueda

    return (<Fragment>
        <h1>Pedidos Por Homie</h1>

        <form onSubmit={buscar}>

            <div className="p-col-12">
                <label htmlFor="cliente" >Homie</label>
            </div>
            <div className="p-col-12">
                <Dropdown dataKey="hoCedula" value={homieSelected} optionLabel="hoNombre" filter={true}
                    options={homie} onChange={(e) => setHomieSelected(e.value)}
                ></Dropdown>
            </div>

            <div className="p-col-12">
                <label htmlFor="codigo" >Desde</label>
            </div>
            <div className="p-col-12">
                <div className="p-col-12">
                    <Calendar name="fechaInicio" value={fechaInicio} onChange={a => setCamposBusqueda({ ...camposBusqueda, fechaInicio: a.value })}  ></Calendar>
                </div>
            </div>


            <div className="p-col-12">
                <label htmlFor="fechaFin" >Hasta</label>
            </div>
            <div className="p-col-12">
                <div className="p-col-12">
                    <Calendar name="fechaFin" value={fechaFin} onChange={a => setCamposBusqueda({ ...camposBusqueda, fechaFin: a.value })}  ></Calendar>
                </div>
            </div>

            <div className="p-col-12">
                <div className="p-col-12">
                    <Button type="submit" label="Buscar"> </Button>
                </div>
            </div>


        </form>
    </Fragment>);
}

export default BuscarPedido;