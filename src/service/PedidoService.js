import Global from '../Global';
import axios from 'axios';

var url = Global.urlCrearPedido;




export function crearPedido(entidad) {
    
   return axios.put(url, entidad)
        .then(res =>  res.data);
        
}


