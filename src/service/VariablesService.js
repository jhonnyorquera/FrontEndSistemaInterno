



export function getEstados() {
    const opciones = [
        { estado: 'PENDIENTE', value: 'PENDIENTE' },
        { estado: 'AGENDADO', value: 'AGENDADO' },
        { estado: 'CANCELADO', value: 'CANCELADO' },
        { estado: 'FINALIZADO', value: 'FINALIZADO' }
    ]
    return opciones;

}


export function getEstadosCobro() {
    const opciones = [
         { estado: '', value: 'TODOS' },  
        { estado: 'POR COBRAR', value: 'POR COBRAR' },        
        { estado: 'PAGADO', value: 'PAGADO' }
    ]
    return opciones;

}




export function getPagos() {
    const opciones = [
        { ppFormaPago: 'EFECTIVO', value: 'EFECTIVO'},
        { ppFormaPago: 'TRANSFERENCIA PICHINCHA' , value: 'TRANSFERENCIA PICHINCHA'},
        { ppFormaPago: 'TRANSFERENCIA PACÍFICO', value: 'TRANSFERENCIA PACÍFICO' },
        { ppFormaPago: 'TRANSFERENCIA GUAYAQUIL' , value:'TRANSFERENCIA GUAYAQUIL' },
        { ppFormaPago: 'PAYMENTEZ' , value:'PAYMENTEZ' }
    ]
    return opciones;

}


export function getNodalidadesContrato() {
    const opciones = [
        { hoModalidad: 'EN RELACIÓN LABORAL', value:'EN RELACIÓN LABORAL' },
        { hoModalidad: 'FREELANCE', value:'FREELANCE' }
    ]
    return opciones;

}



