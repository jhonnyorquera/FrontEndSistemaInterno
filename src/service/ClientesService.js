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
    
   return axios.post(url, cliente)
        .then(res =>  res.data);
        

}


export function editClient(cliente) {
    axios.put(url, cliente)
        .then(res => {
            if (res.data) {

                return true;
            } else {

                return false;
            }
        });

}




