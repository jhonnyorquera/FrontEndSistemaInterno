import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props  }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando, iniciarSesion } = authContext;
    const[aut, setAut]=useState(false)

    useEffect(() => {
        console.log('RUTA PRIVADA')
       

        // eslint-disable-next-line
    }, []);

    return ( 
        <Route { ...props } render={ props => !autenticado && !cargando ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />

     );
}
 
export default RutaPrivada;