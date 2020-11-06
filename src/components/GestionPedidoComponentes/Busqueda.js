import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import { getClientesByNombre } from '../../service/ClientesService';
import { getEstados } from '../../service/VariablesService';

import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';


const Busqueda = () => {

  
    const [filteredCliente, setFilteredCliente] = useState(null);
    const [estados] = useState(getEstados);






    const searchCliente = (event) => {
        setTimeout(() => {
            let filteredCliente;
            getClientesByNombre(event.query.toUpperCase()).then(res => setFilteredCliente(res));


        }, 250);
    }
    const [camposBusqueda, setCamposBusqueda] = useState({
        cliente: 0,
        fechaInicio: '',
        fechaFin: '',
        estado: '',
        codigo: ''

    });



    const { cliente, fechaInicio, fechaFin, estado, codigo } = camposBusqueda


    return (<Fragment>
        <form>

            <div className="p-col-12">
                <label htmlFor="codigo" >Código</label>
            </div>
            <div className="p-col-12">
                <InputText id="codigo" required={true}
                    minLength="10" maxLength="10" name="codigo" placeholder="Ej. PR2020M10N1"
                    onChange={(e) => { setCamposBusqueda({ ...camposBusqueda, codigo: e.target.value }) }} value={codigo} />
            </div>
            <div className="p-col-12">
                <label htmlFor="codigo" >Cliente</label>
            </div>
            <div className="p-col-12">
                <AutoComplete value={cliente} suggestions={filteredCliente} completeMethod={searchCliente} field="clNombre"
                    onChange={(e) => setCamposBusqueda({ ...camposBusqueda,cliente: e.value.clId})} />
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



        </form>



    </Fragment>);
}

export default Busqueda;