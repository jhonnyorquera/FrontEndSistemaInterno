import React, { useState } from 'react';



const useEstadoPedido = (stateInicial) => {
    const [state, actualizarState] = useState(stateInicial);



    const opciones = [
        { estado: 'REGISTRADO', value: 'REGISTRADO' },
        { estado: 'PAGADO', value: 'PAGADO' },
        { estado: 'CANCELADO', value: 'CANCELADO' }
    ];



    const SelectEstado = () => (
        <select
            value={state}
            onChange={e => actualizarState(e.tarjet.value)}
        >
            {opciones.map(opcion => (
                <option key={opcion.estado} value={opcion.value}>{opcion.value}</option>

            ))}


        </select>



    )




    return [state, SelectEstado];
}

export default useEstadoPedido;