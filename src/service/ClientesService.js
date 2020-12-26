import Global from '../Global';
import axios from 'axios';

var url = Global.urlCliente;


export function getClientesList(token) {
    let listado = [];
    listado = axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => res.data);
    return listado;
}

export function getClientesByNombre(name, token) {

    let listado = [];
    listado = axios.get(Global.urlClienteByName + name, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => listado = res.data);

    return listado;
}

export function saveClient(cliente, token) {

    return axios.post(url, cliente, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => res.data);


}


export function editClient(cliente, token) {
    axios.put(url, cliente, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            if (res.data) {

                return true;
            } else {

                return false;
            }
        });

}


export function getEstados() {
    var estados = ' [' +
        '{ "estado":"REGISTRADO"},' +
        '{ "estado":"AGENDADO"},' +
        '{ "estado":"PAGADO"},' +
        '{ "estado":"CANCELADO"} ]';
    return JSON.parse(estados)

}





