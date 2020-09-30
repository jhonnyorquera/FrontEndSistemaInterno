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