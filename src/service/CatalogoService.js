
import Global from '../Global';
import axios from 'axios';

var url = Global.urlCliente;


export function getCatalogoList() {
    let listado = [];
    listado = axios.get(url)
        .then(res => res.data);
    return listado;
}

export function saveCatalogo(catalogo) {
    return axios.post(url, catalogo)
        .then(res => res.data);
}


export function editClient(catalogo) {
    axios.put(url, catalogo)
        .then(res => {
            if (res.data) {
                return true;
            } else {
                return false;
            }
        });

}




