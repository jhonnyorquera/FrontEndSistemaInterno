import Global from '../Global';
import axios from 'axios';



export function getResumenPagos ()  {
    let listado = [];
    listado=axios.get( Global.urlResumenPedidoPago)
        .then(res =>res.data
        )
        return listado;
}



