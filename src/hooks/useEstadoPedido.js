import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';



const useEstadop = (stateInicial) => {
    const [state, actualizarState] = useState(stateInicial);




    const opciones = [
        { estado: 'REGISTRADO', value: 'REGISTRADO' },
        { estado: 'PAGADO', value: 'PAGADO' },
        { estado: 'CANCELADO', value: 'CANCELADO' }
    ]



    function SelectEstado ()  {
       
       return (
            /* 
        <select       value={state} className="browser-default"
              onChange={e => actualizarState(e.target.value)}
          >
              {opciones.map(opcion => (
                  <option key={opcion.estado} value={opcion.value}>{opcion.value}</option>
  
              ))}
          </select>
                */
               

        <Dropdown value={state} optionLabel="value"
            options={opciones} onChange={(e) => actualizarState(e.value)}
        ></Dropdown>


        )






    }




    return [state, SelectEstado];
}

export default useEstadop;