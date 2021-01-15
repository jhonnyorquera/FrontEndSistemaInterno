import React, { Fragment, useEffect, useState } from 'react';

const ResumeHorasTotal = ({ busqueda }) => {

const[cantidad, setCantidad]=useState(0);

useEffect(()=>{
   if(busqueda.length>0){
        setCantidad(
            busqueda.map( 
                pedido => pedido.plCantidadHoras)
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
           


        </Fragment>
    );
}

export default ResumeHorasTotal;