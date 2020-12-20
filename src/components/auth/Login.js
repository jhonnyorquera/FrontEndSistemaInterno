import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import swal from 'sweetalert';
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const Login = (props) => {

    // extraer los valores del context


    const authContext = useContext(AuthContext);
    const {  mensaje, autenticado, iniciarSesion } = authContext;

    const [intentoInterno, setintentoInterno] = useState(0);
    // En caso de que el pwd o usuario no exista
    useEffect(() => {
        
       
        if (autenticado) {

            props.history.push('/inicio');


        } 


        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);



    useEffect(() => {
        return () => {
     
            if(autenticado){
                swal("Somos Homie ", "Bienvenido al Sistema", "success");
            }   else{
                swal("Login Fallido", "Revisa tus credenciales y vuelve a intentar", "warning");
            } 
            

        }
    }, [mensaje, autenticado])

    // State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        user: '',
        pwd: ''
    });

    // extraer de usuario
    const { user, pwd } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault();
    


        // Validar que no haya campos vacios
        if (user.trim() === '' || pwd.trim() === '') {
            swal("Tenemos un nuevo Homie",
                "Se ha registrado un nuevo Homie",
                "success");
        }
        // Pasarlo al action
        iniciarSesion({ user, pwd });

    }



    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="user">user</label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            placeholder="Tu cédula"
                            value={user}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="pwd">Password</label>
                        <input
                            type="password"
                            id="pwd"
                            name="pwd"
                            placeholder="Tu Password"
                            value={pwd}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión" />
                    </div>
                </form>


            </div>
        </div>
    );
}

export default Login;