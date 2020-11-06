import React, { Fragment, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { getEstados } from '../../service/VariablesService';


const SeleccionarEstado = ({ pedido, camposPedido }) => {

    const [opciones] = useState(getEstados());

  

    return (
        <Fragment>
            <Dropdown value={pedido['peEstado']} optionLabel="value"
                options={opciones} onChange={(e) =>  camposPedido({ ...pedido, peEstado: e.value })}
            ></Dropdown>
        </Fragment>
    );
}

export default SeleccionarEstado;