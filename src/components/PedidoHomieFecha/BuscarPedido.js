import React, { Fragment, useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { getHomiesList } from '../../service/HomieService';
import { Dropdown } from 'primereact/dropdown';
import { getPedidosHomieFecha } from '../../service/ResumeService';
import { Button } from 'primereact/button';

const BuscarPedido = ({ setBusqueda }) => {

    const [camposBusqueda, setCamposBusqueda] = useState({
        cliente: '',
        fechaInicio: '',
        fechaFin: ''
    });

    const [inicio, setInicio] = useState(true);

    const [homie, setHomie] = useState({})
    const [homieSelected, setHomieSelected] = useState({})

    useEffect(() => {
        if (inicio) {
            getHomiesList()
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


            getPedidosHomieFecha(camposBusqueda).then(res => {
                setBusqueda(res)
            })

        }
    }




    const { fechaInicio, fechaFin, cliente } = camposBusqueda

    return (<Fragment>
        <h1>Pedidos Por Homie</h1>

        <form onSubmit={buscar}>

            <div className="p-col-12">
                <label htmlFor="cliente" >Cliente</label>
            </div>
            <div className="p-col-12">
                <Dropdown value={homieSelected} optionLabel="hoNombre" filter={true}
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