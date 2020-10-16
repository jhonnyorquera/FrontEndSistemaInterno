import Global from '../Global';
import axios from 'axios';


var url = Global.urlHomie;


export function getHomiesList  ()  {
    let listado = [];
    listado=axios.get(url)
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


export function createHomie(homie){

    return axios.post(url, homie)
     .then(res =>
         res.data
     )
 
 }


 export function getHomiesDisponiblesList  ()  {
    let listado = [];
    listado=axios.get(Global.urlHomieDisponible)
        .then(res =>res.data
        )
        return listado;
}

export function getHomiesPedidosList  (fechaBuscar)  {
    var fecha = {fechaBuscar: fechaBuscar};
    let listado = [];
    listado=axios.post(Global.urlHomiePedidos, fecha)
        .then(res =>res.data
        )
        return listado;
}


