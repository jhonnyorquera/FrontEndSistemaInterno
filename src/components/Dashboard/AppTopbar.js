import React from 'react';
import { InputText } from 'primereact/inputtext';

export const AppTopbar = (props) => {
   
    const onClick = (event) => {
        console.log('saleeeeeeeee')
        event.preventDefault();
        localStorage.clear();
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