import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props  }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;
    const[aut, setAut]=useState(false)

    useEffect(() => {
        let a=localStorage.getItem('token');
        if(a){
            console.log('tokeeeeeeeeeeeeeeeen'+a)
            setAut(true)
        }

        // eslint-disable-next-line
    }, []);

    return ( 
        <Route { ...props } render={ props => !aut && !cargando ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />

     );
}
 
export default RutaPrivada;