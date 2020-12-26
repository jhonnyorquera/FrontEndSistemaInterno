import React, { Fragment, useState, useContext } from 'react'
import { getClientesByNombre } from '../../service/ClientesService';
import { getEstados } from '../../service/VariablesService';
import { buscarListaPedido } from '../../service/PedidoService';
import AuthContext from '../../context/autenticacion/authContext';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import swal from 'sweetalert';


const Busqueda = ({ setBusqueda }) => {


    const [clienteSelect, setCliente] = useState([])
    const [filteredCliente, setFilteredCliente] = useState(null);
    const [estados] = useState(getEstados);

    const authContext = useContext(AuthContext);
    const {  token } = authContext;





    const searchCliente = (event) => {
        setTimeout(() => {
            getClientesByNombre(event.query.toUpperCase(), token).then(res => setFilteredCliente(res));
        }, 250);
    }
    const [camposBusqueda, setCamposBusqueda] = useState({
        cliente: '',
        fechaInicio: '',
        fechaFin: '',
        estado: '',
        codigo: ''

    });


    const buscar = (e) => {

        e.preventDefault();
        setBusqueda([])
        if (clienteSelect) {
            setCamposBusqueda({ ...camposBusqueda, cliente: clienteSelect.clNombre })
        }
    
       
        buscarListaPedido(camposBusqueda, token).then(res => {
            setBusqueda(res)
            if(res.length === 0){
                swal("No existen Registros", "No existen registros con esos campos de busqueda", "info");
            }
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
                    <Calendar name="fechaInicio"  value={fechaInicio} onChange={a => setCamposBusqueda({ ...camposBusqueda, fechaInicio: a.value })}  ></Calendar>
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