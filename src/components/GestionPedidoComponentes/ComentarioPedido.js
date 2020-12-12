import React, { Fragment, useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import Moment from 'react-moment';
import 'moment/locale/es';
import 'moment-timezone';
import 'moment-timezone';
import swal from 'sweetalert';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';


import { guardarComentarioPedido } from '../../service/PedidoService';

import { editarComentarioPedido } from '../../service/PedidoService';

const ComentarioPedido = ({ pedidoInfo }) => {


    const [comentarios, setComentarios] = useState(pedidoInfo.hoComentarioList)
    const [proceso, setProceso] = useState('')
    const [comentario, setComentario] = useState({
        obFechaComentario: '',
        obComentario: '',
        hoPedidoCod: pedidoInfo.peCodigo

    })


    const { obComentario } = comentario

    const iniciarCreacion = () => {
        setProceso('crear');
        setComentario({
            hoPedidoCod: pedidoInfo.peCodigo
        });

    }


    useEffect(() => {
        setComentarios(pedidoInfo.hoComentarioList)

        setComentario({ ...comentario, hoPedidoCod: pedidoInfo.peCodigo }) // eslint-disable-line no-use-before-define
        /*eslint-disable */
    }, [pedidoInfo])
    /*eslint-enable */


    const iniciarEdicion = (item) => {

        setProceso('editar');
        setComentario(item);
    }

    const onHide = (name) => {

        if (name === 'yes') {
            if (proceso === 'editar') {
                const listaAux = comentarios.filter(n => n.obFechaComentario !== comentario.obFechaComentario)
                editarComentarioPedido(comentario).then((res) => { setComentario(res) });
                listaAux.push(comentario);
                setComentarios(listaAux);
                swal("Comentario Editado", "Se ha editado un Comentario", "success");
            }
            if (proceso === 'crear') {
                const listaAux = comentarios
                guardarComentarioPedido(comentario).then((res) => { setComentario(res) })
                listaAux.push(comentario);
                setComentarios(listaAux)
                swal("Comentario Creado", "Se añadió un Comentario", "success");
            }

        }
        setProceso('')
    }



    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide('no')} className="p-button-text" />

                <Button label="Procesar" icon="pi pi-check" onClick={() => onHide('yes')} autoFocus />

            </div>
        );
    }





    return (<Fragment>


        <Dialog header="Comentario" visible={proceso === 'editar' || proceso === 'crear'}
            style={{ width: '30vw' }} maximizable={true} footer={renderFooter('displayBasic')}
            onHide={() => onHide('displayBasic')}
        >
            <form>

                <div className="p-grid">
                    <div className="p-col-12">    <label htmlFor="obComentario" >Comentario</label></div>
                    <div className="p-col-12">    <InputTextarea id="obComentario"
                        name="obComentario" value={obComentario} onChange={(e) => setComentario({ ...comentario, obComentario: e.target.value })} />
                    </div></div>



            </form>


        </Dialog>

        <Button label="Nuevo Comentario" onClick={(e) => iniciarCreacion()} icon="pi pi-plus" />

        <div>

            {comentarios.map(cmt => (
                <Card >

                    <div className="p-grid">
                        <label className="p-col-12" style={{ fontWeight: 'bold' }} >

                            <Moment fromNow>{cmt.obFechaComentario}</Moment> </label>

                    </div>

                    <div className="p-grid">
                        <label htmlFor="obComentario" className="p-col-12"></label>
                        <label id="obComentario" className="p-col-12"> {cmt.obComentario}</label>
                    </div>



                    <div style={{ textAlign: 'right' }} >
                        <Button icon="pi pi-pencil" onClick={() => iniciarEdicion(cmt)} className="p-button-rounded p-button-text" />
                    </div>
                </Card>

            ))}
        </div>


    </Fragment>);
}

export default ComentarioPedido;