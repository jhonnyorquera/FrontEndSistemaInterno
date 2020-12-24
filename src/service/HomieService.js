import Global from '../Global';
import axios from 'axios';

var url = Global.urlHomie;


export function getHomiesList  (token)  {
    let listado = [];
    listado=axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res =>res.data
        )
        return listado;
}

export function editHomie(homie){

   return axios.put(url, homie)
    .then(res =>
        res
    )

}


export function createHomie(homie, token){

    return axios.post(url, homie, { headers: {"Authorization" : `Bearer ${token}`} })
     .then(res =>
         res.data
     )
 
 }



export function getHomiesPedidosList  (fechaBuscar)  {
    var fecha = {fechaBuscar: fechaBuscar};
    let listado = [];
    listado=axios.post(Global.urlHomiePedidos, fecha)
        .then(res =>res.data
        )
        return listado;
}


