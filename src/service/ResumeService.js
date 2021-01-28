import Global from '../Global';
import axios from 'axios';



export function getResumenPagos (token)  {
    let listado = [];
    listado=axios.get( Global.urlResumenPedidoPago,  { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res =>res.data
        )
        return listado;
}

export function getPagosInformacion (token, requestBody)  {
    let listado = [];
    listado=axios.put( Global.urlPagos, requestBody, { 
        headers: {"Authorization" : `Bearer ${token}`}, }
     )
        .then(res =>res.data
        )
        return listado;
}

export function getPedidosHomieFecha(requestBody, token)  {
    let listado = [];
    listado=axios.put( Global.urlResumenPedidosXHomie, requestBody, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res =>res.data
        )
        return listado;
}

export function getDashboard(token)  {
    let listado = [];
    listado=axios.get( Global.urlResumenDashboard,  { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res =>res.data
        )
        return listado;
}



