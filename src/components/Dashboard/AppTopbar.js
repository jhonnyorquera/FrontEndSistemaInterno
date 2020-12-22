import React,{useContext} from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import swal from 'sweetalert';

export const AppTopbar = (props) => {
    const authContext = useContext(AuthContext);
    const {   cerrarSesion } = authContext;

   
    const onClick = (event) => {
        console.log('saleeeeeeeee')
        event.preventDefault();
        localStorage.clear();
        swal("Somos Homie ", "Ten un Buen dia", "success");

        cerrarSesion();
    }


    return (
        <div className="layout-topbar clearfix">
            <button type="button" className="p-link layout-menu-button" onClick={props.onToggleMenu}>
                <span className="pi pi-bars" />
            </button>
            <div className="layout-topbar-icons">
               
                <button type="button" className="p-link" onClick={onClick}>
                    <span className="layout-topbar-item-text">User</span>
                    <span className="layout-topbar-icon pi pi-power-off" />
                </button>
            </div>
        </div>
    );
}