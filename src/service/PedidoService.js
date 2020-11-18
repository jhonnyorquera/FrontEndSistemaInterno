import Global from '../Global';
import axios from 'axios';

var url = Global.urlCrearPedido;




export function crearPedido(entidad) {

        return axios.put(url, entidad)
                .then(res => res.data);

}

export function buscarListaPedido(entidad) {

        return axios.put(Global.urlListarPedido, entidad)
                .then(res => res.data);

}


export function buscarPedidoByCodigo(name) {

        let listado = {};
        listado = axios.get(Global.urlHomiePedidoCod + name)
                .then(res => listado = res.data);

        return listado;

}




export function editarPedidoDetalle(entidad) {
        return axios.put(Global.urlHomiePedidoCod, entidad)
                .then(res => res.data);
}


export function editarPedidoHomie(entidad) {
        return axios.put(Global.urlPedidoHomie, entidad)
                .then(res => res.data);
}

export function crearPedidoHomie(entidad) {
        return axios.post(Global.urlPedidoHomie, entidad)
                .then(res => res.data);
}

export function editarPedidoPagoHomie(entidad) {
        return axios.put(Global.urlPedidoPago, entidad)
                .then(res => res.data);
}

export function guardarPedidoPagoHomie(entidad) {
        return axios.post(Global.urlPedidoPago, entidad)
                .then(res => res.data);
}


export function guardarComentarioPedido(entidad) {
        return axios.post(Global.urlComentario, entidad)
                .then(res => res.data);
}

export function editarComentarioPedido(entidad) {
        return axios.put(Global.urlComentario, entidad)
                .then(res => res.data);
}







