import React, { Fragment, useState } from 'react';
import { getDashboard } from '../../service/ResumeService';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

const BusquedaDash = ({ setDash, token }) => {



    const [camposBusqueda, setCamposBusqueda] = useState({
        fechaInicio: fechaInicial(),
        fechaFin: fechaFinal(),
        estado: 'TODOS'

    });

    function fechaInicial() {
        var a = new Date();
        a.setDate(1);
        return a
    }



    function fechaFinal() {
        var date = new Date();
        return new Date(date.getFullYear(), date.getMonth() + 1, 0)
    }

    const buscar = (e) => {
        e.preventDefault();

        getDashboard(token, camposBusqueda)
            .then(res =>
                setDash(res)
            );

    }

    const { fechaInicio, fechaFin } = camposBusqueda



    return (
        <Fragment>
             <div className="card">
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
                    <div className="p-col-12">
                        <Button type="submit" label="Buscar"> </Button>
                    </div>
                </div>


            </form>

            </div>
        </Fragment>

    );
}

export default BusquedaDash;