import Global from '../Global';
import axios from 'axios';

var url = Global.urlCrearPedido;




export function crearPedido(entidad, token) {
        return axios.put(url, entidad, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => res.data);
}

export function buscarListaPedido(entidad, token) {
        return axios.put(Global.urlListarPedido, entidad, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => res.data);
}

export function buscarPedidoByCodigo(name,token) {
        let listado = {};
        listado = axios.get(Global.urlHomiePedidoCod + name, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => listado = res.data);
        return listado;
}


export function editarPedidoDetalle(entidad,token) {
        return axios.put(Global.urlHomiePedidoCod, entidad, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => res.data);
}


export function editarPedidoHomie(entidad,token) {
        return axios.put(Global.urlPedidoHomie, entidad, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => res.data);
}

export function crearPedidoHomie(entidad, token) {
        return axios.post(Global.urlPedidoHomie, entidad, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => res.data);
}

export function editarPedidoPagoHomie(entidad, token) {
        return axios.put(Global.urlPedidoPago, entidad, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => res.data);
}

export function guardarPedidoPagoHomie(entidad,token) {
        return axios.post(Global.urlPedidoPago, entidad, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => res.data);
}


export function guardarComentarioPedido(entidad, token) {
        return axios.post(Global.urlComentario, entidad, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => res.data);
}

export function editarComentarioPedido(entidad, token) {
        return axios.put(Global.urlComentario, entidad, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => res.data);
}


export function guardarPedidoServicio(entidad,token) {
        return axios.post(Global.urlPedidoServicio, entidad, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => res.data);
}

export function editarPedidoServicio(entidad, token) {
        return axios.put(Global.urlPedidoServicio, entidad, { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => res.data);
}







