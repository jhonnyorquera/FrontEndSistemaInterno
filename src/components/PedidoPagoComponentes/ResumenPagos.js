import React, { Fragment, useEffect, useState } from 'react';
const ResumenPagos = ({ listaPago }) => {

    const [valorTotal, setValorTotal] = useState(0);

    useEffect(() => {
        if (listaPago.length > 0) {
            setValorTotal(
                listaPago.map(
                    pedido => pedido.peValor)
                    .reduce((a, b) => a + b, 0)
            )
        }

    }, [listaPago])

    return (<Fragment>
        <div className="card summary">
            <span className="title">Venta Total        </span>
            <span className="count visitors">{valorTotal}</span>
        </div>
    </Fragment>);
}

export default ResumenPagos;