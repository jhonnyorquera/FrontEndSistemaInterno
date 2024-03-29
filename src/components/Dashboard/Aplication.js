import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { CSSTransition } from 'react-transition-group';
import Dashboard  from './Dashboard';
import GestionHomie from '../HomieComponents/GestionHomie';
import GestionCliente from '../ClienteComponents/GestionCliente';
import GestionCrearPedido from '../CrearPedidoComponentes/GestionCrearPedido';
import GestionCatalogo from '../CatalogoComponent/GestionCatalogo';
import GestionPedido from '../GestionPedidoComponentes/GestionPedido';
import PedidoPago from '../PedidoPagoComponentes/PedidoPago';
import PedidoHomieFecha from '../PedidoHomieFecha/PedidoHomie';
import RutaPrivada from '../../config/RutaPrivada'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import '../../layout/layout.scss';




const Aplication = () => {
    
    const [layoutMode] = useState('static');
    const [layoutColorMode] = useState('dark')
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [inputStyle] = useState('outlined');
    const [ripple] = useState(false);
    const sidebar = useRef();
    let menuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, 'body-overflow-hidden');
        }
        else {
            removeClass(document.body, 'body-overflow-hidden');
        }
    }, [mobileMenuActive]);






    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
        menuClick = false;
    }

    const onToggleMenu = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                setOverlayMenuActive(prevState => !prevState);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive(prevState => !prevState);
            }
        }
        else {
            setMobileMenuActive(prevState => !prevState);
        }
        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }

    const menu =
        [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => { window.location = '/inicio' } },

            {
                label: 'Pedidos', icon: 'pi pi-fw pi-folder-open',
                items: [
                    { label: 'Crear Pedido', icon: 'pi pi-fw pi-calendar-plus', command: () => { window.location = "/crearPedido" } },
                    { label: 'Gestionar Pedidos', icon: 'pi pi-fw pi-list', command: () => { window.location = "/gestionPedido" } },
                    { label: 'Pagos por Pedido', icon: 'pi pi-fw pi-money-bill', command: () => { window.location = "/pedidoPago" } },
                    { label: 'Pedidos por Homie', icon: 'pi pi-fw pi-clock', command: () => { window.location = "/pedidoHomie" } }

                ]
            },

            {
                label: 'Catalogos', icon: 'pi pi-fw pi-id-card',
                items: [
                    { label: 'Homies', icon: 'pi pi-fw pi-user-plus', command: () => { window.location = "/gestionHomie" } },
                    { label: 'Clientes', icon: 'pi pi-fw pi-users', command: () => { window.location = "/gestionCliente" } },
                    { label: 'Servicios', icon: 'pi pi-fw pi-list', command: () => { window.location = "/gestionCatalogo" } }
                ]
            },



        ];


    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const isDesktop = () => {
        return window.innerWidth > 1024;
    }

    const isSidebarVisible = () => {
        if (isDesktop()) {
            if (layoutMode === 'static')
                return !staticMenuInactive;
            else if (layoutMode === 'overlay')
                return overlayMenuActive;
            else
                return true;
        }

        return true;
    }

    const logo = layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg';

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false
    });

    const sidebarClassName = classNames('layout-sidebar', {
        'layout-sidebar-dark': layoutColorMode === 'dark',
        'layout-sidebar-light': layoutColorMode === 'light'
    });

    return (

        <div>




            <div className={wrapperClass} onClick={onWrapperClick}>
                <AppTopbar onToggleMenu={onToggleMenu} />

                <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
                    <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
                        <div className="layout-logo">
                            <img alt="Logo" src={logo} />
                        </div>
                        <AppProfile />
                        <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
                    </div>
                </CSSTransition>



                <div className="layout-main">
                <RutaPrivada path="/inicio"  component={Dashboard} />
                <RutaPrivada path="/gestionCliente" component={GestionCliente} />
                <RutaPrivada path="/gestionPedido" component={GestionPedido} />
                <RutaPrivada path="/gestionHomie" component={GestionHomie} />
                <RutaPrivada path="/crearPedido" component={GestionCrearPedido} />
                <RutaPrivada path="/gestionCatalogo" component={GestionCatalogo} />
                <RutaPrivada path="/pedidoPago" component={PedidoPago} />
                <RutaPrivada path="/pedidoHomie" component={PedidoHomieFecha} />
                  
                </div>

                <AppFooter />

            </div>
   
        </div>
    );
}
 
export default Aplication;
