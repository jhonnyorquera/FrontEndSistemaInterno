import React, { Fragment, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { getEstadosCobro } from '../../service/VariablesService';
import { Dropdown } from 'primereact/dropdown';
import { getPagosInformacion } from '../../service/ResumeService';

const BuscarPagos = ({ setListaPago, token }) => {

    const [camposBusqueda, setCamposBusqueda] = useState({
        fechaInicio: fechaInicial(),
        fechaFin: fechaFinal(),
        estado: 'TODOS'

    });
    const [estados] = useState(getEstadosCobro);


    const buscar = (e) => {

        e.preventDefault();
       
        getPagosInformacion(token, camposBusqueda).then(data => setListaPago(data));
    
    }



    function fechaInicial(){
        var a= new Date();
        a.setDate(1);
        return a
       }



       function fechaFinal(){
        var date = new Date();
        return new Date(date.getFullYear(), date.getMonth() + 1, 0)
       }


    const { fechaInicio, fechaFin, estado } = camposBusqueda

    return (<Fragment>

        <form onSubmit={buscar}>
            <div className="p-col-12">
                <label htmlFor="codigo" >Desde</label>
            </div>
            <div className="p-col-12">
                <div className="p-col-12">
                    <Calendar name="fechaInicio" value={fechaInicio} onChange={a => setCamposBusqueda({ ...camposBusqueda, fechaInicio: a.value })}  ></Calendar>
                </div>
            </div>

            <div className="p-col-12">
                <label htmlFor="codigo" >Hasta</label>
            </div>
            <div className="p-col-12">
                <div className="p-col-12">
                    <Calendar name="fechaFin" value={fechaFin} onChange={a => setCamposBusqueda({ ...camposBusqueda, fechaFin: a.value })}  ></Calendar>
                </div>
            </div>


            <div className="p-col-12">
                <label htmlFor="codigo" >Estado</label>
            </div>
            <div className="p-col-12">
                <Dropdown value={estado} optionLabel="value"
                    options={estados} onChange={(e) => setCamposBusqueda({ ...camposBusqueda, estado: e.value })}
                ></Dropdown>
            </div>


            <div className="p-col-12">
                <div className="p-col-12">
                    <Button type="submit" label="Buscar"> </Button>
                </div>
            </div>


        </form>

    </Fragment>);
}

export default BuscarPagos;