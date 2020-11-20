



export function getEstados() {
    const opciones = [
        { estado: 'REGISTRADO', value: 'REGISTRADO' },
        { estado: 'PAGADO', value: 'PAGADO' },
        { estado: 'CANCELADO', value: 'CANCELADO' }
    ]
    return opciones;

}



export function getPagos() {
    const opciones = [
        { ppFormaPago: 'EFECTIVO', value: 'EFECTIVO'},
        { ppFormaPago: 'TRANSFERENCIA PICHINCHA' , value: 'TRANSFERENCIA PICHINCHA'},
        { ppFormaPago: 'TRANSFERENCIA PACÍFICO', value: 'TRANSFERENCIA PACÍFICO' },
        { ppFormaPago: 'TRANSFERENCIA GUAYAQUIL' , value:'TRANSFERENCIA GUAYAQUIL' }
    ]
    return opciones;

}



