import React, { Component } from 'react';
import classNames from 'classnames';
import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';


import GestionHomie from './components/HomieComponents/GestionHomie';
import GestionCliente from './components/ClienteComponents/GestionCliente';
import GestionCrearPedido from './components/CrearPedidoComponentes/GestionCrearPedido';
import GestionCatalogo from './components/CatalogoComponent/GestionCatalogo';
import GestionPedido from './components/GestionPedidoComponentes/GestionPedido';
import PedidoPago from './components/PedidoPagoComponentes/PedidoPago';
import PedidoHomieFecha from './components/PedidoHomieFecha/PedidoHomie';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/layout.scss';
import './App.scss';
import Logo from './images/logo-white.png';

class App extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }

    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }

        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
    }

    onMenuItemClick(event) {
        if (!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    createMenu() {
        this.menu = [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => { window.location = '#/' } },
          
            {
                label: 'Pedidos', icon: 'pi pi-fw pi-folder-open',
                items: [
                    { label: 'Crear Pedido', icon: 'pi pi-fw pi-calendar-plus', command: () => { window.location = "#/crearPedido" } },
                    { label: 'Gestionar Pedidos', icon: 'pi pi-fw pi-list', command: () => { window.location = "#/gestionPedido" } },
                    { label: 'Pagos por Pedido', icon: 'pi pi-fw pi-money-bill', command: () => { window.location = "#/pedidoPago" } },
                    { label: 'Pedidos por Homie', icon: 'pi pi-fw pi-clock', command: () => { window.location = "#/pedidoHomie" } }

                ]
            },

            {
                label: 'Catalogos', icon: 'pi pi-fw pi-id-card',
                items: [
                    { label: 'Homies', icon: 'pi pi-fw pi-user-plus', command: () => { window.location = "#/gestionHomie" } },
                    { label: 'Clientes', icon: 'pi pi-fw pi-users', command: () => { window.location = "#/gestionCliente" } },
                    { label: 'Servicios', icon: 'pi pi-fw pi-list', command: () => { window.location = "#/gestionCatalogo" } }
                ]
            },
            


        ];
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    }

    render() {

        const wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });

        const sidebarClassName = classNames("layout-sidebar", {
            'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
            'layout-sidebar-light': this.state.layoutColorMode === 'light'
        });

        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar onToggleMenu={this.onToggleMenu} />

                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                    <div className="layout-logo">
                        <img alt="Logo" src={Logo} />
                    </div>
                    <AppProfile />
                    <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                </div>

                <div className="layout-main">
                    <Route path="/" exact component={Dashboard} />
                    
                    <Route path="/gestionCliente" component={GestionCliente} />
                    <Route path="/gestionPedido" component={GestionPedido} />
                    <Route path="/gestionHomie" component={GestionHomie} />
                    <Route path="/crearPedido" component={GestionCrearPedido} />
                    <Route path="/gestionCatalogo" component={GestionCatalogo} />
                    <Route path="/pedidoPago" component={PedidoPago} />
                    <Route path="/pedidoHomie" component={PedidoHomieFecha} />
                </div>

                <AppFooter />

              
            </div>
        );
    }
}

export default App;
