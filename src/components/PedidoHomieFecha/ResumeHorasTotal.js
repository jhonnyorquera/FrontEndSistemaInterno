import React, { Fragment, useEffect, useState } from 'react';

const ResumeHorasTotal = ({ busqueda }) => {

const[cantidad, setCantidad]=useState(0);

const[promedio, setPromedio]=useState(0);


useEffect(()=>{
   if(busqueda.length>0){
        setCantidad(
            busqueda.map( 
                pedido => pedido.plCantidadHoras)
                .reduce((a,b) =>a+b,0 )
        )
    }
},[busqueda])



useEffect(()=>{
    if(busqueda.length>0){
         setPromedio(
             busqueda.map( 
                 pedido => 
                 pedido.peCalificacion ? pedido.peCalificacion : 0
                 )
                 .reduce((a,b) =>a+b,0 ) /busqueda.map( 
                    pedido => 
                    pedido.peCalificacion ? 1 : 0
                    )
                    .reduce((a,b) =>a+b,0 )
         )
     }
 },[busqueda])

    return (

        <Fragment>
          

                <div className="card summary">
                    <span className="title">Total Horas</span>
                    <span className="count visitors">{cantidad}</span>
                </div>

                <div className="card summary">
                    <span className="title">P. Calificación</span>
                    <span className="count purchases">{promedio.toFixed(2)}</span>
                </div>
           


        </Fragment>
    );
}

export default ResumeHorasTotal;