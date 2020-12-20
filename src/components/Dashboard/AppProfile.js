import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import AuthContext from '../../context/autenticacion/authContext'

export const AppProfile = () => {

    const [expanded, setExpanded] = useState(false);

    const authContext = useContext(AuthContext);
    const { usuario, autenticado, cerrarSesion } = authContext;

    const [user, setUser] = useState(localStorage.getItem('user'))

    useEffect(() => {
        setUser(localStorage.getItem('user'))
    }, [user])

 

    return (
        <div className="layout-profile">
            <div>
                <img src="assets/layout/images/profile.png" alt="Profile" />
            </div>
            <button className="p-link layout-profile-link" >
                <span className="username">{usuario}</span>
                <i className="pi pi-fw pi-cog" />
            </button>
          
        </div>
    );

}