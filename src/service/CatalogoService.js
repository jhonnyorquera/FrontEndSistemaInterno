
import Global from '../Global';
import axios from 'axios';

var url = Global.urlCatalogo;


export function getCatalogoList() {
    let listado = [];
    listado = axios.get(url)
        .then(res => res.data);
    return listado;
}

export function createCatalogo(catalogo) {
    return axios.post(url, catalogo)
        .then(res => res.data);
}




export function editCatalogo(objeto){

    return axios.put(url, objeto)
     .then(res =>
         res
     )
 
 }




