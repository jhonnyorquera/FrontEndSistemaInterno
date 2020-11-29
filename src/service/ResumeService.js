import Global from '../Global';
import axios from 'axios';



export function getResumenPagos ()  {
    let listado = [];
    listado=axios.get( Global.urlResumenPedidoPago)
        .then(res =>res.data
        )
        return listado;
}


export function getPedidosHomieFecha(requestBody)  {
    let listado = [];
    listado=axios.put( Global.urlResumenPedidosXHomie, requestBody)
        .then(res =>res.data
        )
        return listado;
}



