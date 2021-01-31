import Global from '../Global';
import axios from 'axios';



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

export function getDashboard(token, camposBusqueda)  {
    let listado = [];
    listado=axios.put( Global.urlResumenDashboard, camposBusqueda, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res =>res.data
        )
        return listado;
}



