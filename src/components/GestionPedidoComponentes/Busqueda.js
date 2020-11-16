import React, { Fragment, useState } from 'react'
import { getClientesByNombre } from '../../service/ClientesService';
import { getEstados } from '../../service/VariablesService';
import { buscarListaPedido } from '../../service/PedidoService';

import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';


const Busqueda = ({ setBusqueda }) => {


    const [clienteSelect, setCliente] = useState([])
    const [filteredCliente, setFilteredCliente] = useState(null);
    const [estados] = useState(getEstados);






    const searchCliente = (event) => {
        console.log('busca cliente')
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


    const buscar = (e) => {
        console.log('entra a buscar');
        e.preventDefault();
        if (clienteSelect) {
            setCamposBusqueda({ ...camposBusqueda, cliente: clienteSelect.clId })
        }
       
        
        buscarListaPedido(camposBusqueda).then(res => {
            setBusqueda(res)
        })


    }



    const { fechaInicio, fechaFin, estado, codigo } = camposBusqueda


    return (<Fragment>
        <form onSubmit={buscar}>

            <div className="p-col-12">
                <label htmlFor="codigo" >Código</label>
            </div>
            <div className="p-col-12">
                <InputText id="codigo"
                    maxLength="15" name="codigo" placeholder="Ej. PR2020M10N1"
                    onChange={(e) => { setCamposBusqueda({ ...camposBusqueda, codigo: e.target.value }) }} value={codigo} />
            </div>
            <div className="p-col-12">
                <label htmlFor="codigo" >Cliente</label>
            </div>
            <div className="p-col-12">
                <AutoComplete value={clienteSelect} suggestions={filteredCliente} completeMethod={searchCliente} field="clNombre"
                    onChange={(e) => setCliente(e.value)} />
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

            <div className="p-col-12">
                <div className="p-col-12">
                    <Button type="submit" label="Buscar"> </Button>
                </div>
            </div>





        </form>



    </Fragment>);
}

export default Busqueda;