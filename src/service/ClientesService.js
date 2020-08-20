import Global from '../Global';
import axios from 'axios';

var url = Global.urlCliente;


export function getClientesList() {
    let listado = [];
    listado = axios.get(url)
        .then(res => res.data);
    return listado;
}

export function saveClient(cliente) {
    axios.post(url, cliente)
        .then(res => {
            if (res.data) {
                console.log('retorna verdadero')
                return res.data;
            } else {
                console.log('retorna falspo')
                return false;
            }
        });

}


export function editClient(cliente) {
    axios.put(url, cliente)
        .then(res => {
            if (res.data) {
                console.log('retorna verdadero')
                return true;
            } else {
                console.log('retorna falspo')
                return false;
            }
        });

}




