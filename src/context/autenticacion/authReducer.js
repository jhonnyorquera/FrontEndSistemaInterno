import {

    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        case LOGIN_EXITOSO:
            console.log('correcto')
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', action.payload.usuario);
            if (action.payload.usuario) {
                return {
                    ...state,
                    autenticado: true,
                    mensaje: 'Bienvenido',
                    cargando: false,
                    usuario: action.payload.usuario,
                    token: action.payload.token,
                    intento: 0

                }
            }
            break
        case CERRAR_SESION:

            return {
                ...state,
                autenticado: false,
                token: null
            }
        case LOGIN_ERROR:
            console.log('incorrecto')
            return {
                ...state,
                autenticado: false,
                token: null,
                mensaje: 'Ha ocurrido una Falla',
                intento: 1
            }
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload,
                cargando: false
            }

        default:
            return state;
    }
}