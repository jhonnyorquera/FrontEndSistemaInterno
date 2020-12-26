
import Global from '../Global';
import axios from 'axios';

var url = Global.urlCatalogo;


export function getCatalogoList(token) {
    let listado = [];
    listado = axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => res.data);
    return listado;
}

export function createCatalogo(catalogo, token) {
    return axios.post(url, catalogo, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => res.data);
}




export function editCatalogo(objeto, token){

    return axios.put(url, objeto, { headers: {"Authorization" : `Bearer ${token}`} })
     .then(res =>
         res
     )
 
 }




