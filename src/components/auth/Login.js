import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import swal from 'sweetalert';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Login = (props) => {

    // extraer los valores del context


    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    // En caso de que el pwd o usuario no exista
    useEffect(() => {
        if (autenticado) {
            props.history.push('/inicio#/');
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    useEffect(() => {
        return () => {
            if (autenticado) {
                swal("Somos Homie ", "Bienvenido al Sistema", "success");
            } else {
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
            swal("Ingresa datos",
                "Ingresa Datos de usuarios",
                "success");
        }
        // Pasarlo al action
        iniciarSesion({ user, pwd });

    }



    return (
        <div className="form-usuario">

            <div className="contenedor-form sombra-dark">

                <div class="myDiv">
                <img src="assets/layout/images/logo-white.svg" alt="Logo" width="200" />
                </div>
                <br></br>
                <div>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                    <div class="label-form"> <label htmlFor="user">Cédula</label></div>
                        <InputText
                            type="text"
                            id="user"
                            name="user"
                            placeholder="Tu cédula"
                            value={user}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                    <div class="label-form"> <label htmlFor="pwd">Password</label></div>
                    <InputText
                            type="password"
                            id="pwd"
                            name="pwd"
                            placeholder="Tu Password"
                            value={pwd}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form" class="myDiv">
                        <Button type="submit" label="INICIAR SESIÓN" />
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Login;