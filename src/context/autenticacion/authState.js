import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';

import {

    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {
    const initialState = {
        
        token: localStorage.getItem('token'),
        autenticado: localStorage.getItem('user') !== null ? true : false,
        usuario: localStorage.getItem('user'),
        mensaje: null,
        cargando: false,
        intento: 0
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);



    // Cuando el usuario inicia sesión
    const iniciarSesion = async datos => {
        
        try {
         
            const respuesta = await clienteAxios.post('user', datos);

            const intentos=0

            if (respuesta.data.usuario) {
                dispatch({
                    type: LOGIN_EXITOSO,
                    payload: respuesta.data
                });
            } else {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: intentos
                })
            }

            // Obtener el usuario

        } catch (error) {
           

            dispatch({
                type: LOGIN_ERROR,
                payload: 0
            })
        }
    }

    // Cierra la sesión del usuario
    const cerrarSesion = () => {
        console.log('cierra sesion')
  
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                intento: state.intento,
                iniciarSesion,
                cerrarSesion
            }}
        >{props.children}

        </AuthContext.Provider>
    )
}
export default AuthState;