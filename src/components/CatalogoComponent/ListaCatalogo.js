import React, { Fragment, useState, useEffect } from 'react';

import { getCatalogoList } from '../../service/CatalogoService';
import { editCatalogo } from '../../service/CatalogoService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import swal from 'sweetalert';



const ListaCatalogo = ({llenaLista, cambiaEstadoLlenar, actualizarEstadoCrud, token}) => {


    const [catalogoLista, llenaListado] = useState([])

   


    const columns = [

        { field: 'seNombre', header: 'Servicio' },
        { field: 'seNombreDetalle', header: 'Nombre' },
        { field: 'seCantidad', header: 'Cantidad' },
        { field: 'seValor', header: 'Costo' }
    ];

    const llenarLista = () => {
        getCatalogoList(token).then(data => llenaListado(data));
    }

    let editingCellRows = {};


    useEffect(() => {
        if (llenaLista) {
            llenarLista();
            cambiaEstadoLlenar(false);
        } // eslint-disable-next-line
    }, [llenaLista, cambiaEstadoLlenar]
    );


    const inputTextEditor = (productKey, props, field) => {
        actualizarEstadoCrud('');

        return <InputText type="text" value={props.rowData[field]}
            onEditorSubmit={onEditorSubmit}
            onChange={(e) =>
                onEditorValueChange(productKey, props, e.target.value)} />;

    }



    const onEditorSubmit = e => {
        let aux = 0;
        catalogoLista.map((clave, i) => {
            if (e.rowIndex === i) {
                aux = clave.seCodigo;
            }
            return null;
        })
        const editarObjeto = catalogoLista.find(serv => {
            return serv.seCodigo === aux
        })

        if (editarObjeto) {
            editCatalogo(editarObjeto, token).then(res => {
                if (res.status === 200) {
                    swal("Servicio Editado!", "Se ha editado el Servicio: ", "success");
                    llenarLista();
                } else {
                    swal("Algo paso!", "No se ha editado el Servicio: ", "error");
                }
            })
            return null;
        }
    }

    const onEditorValueChange = (productKey, props, value) => {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        llenaListado(updatedProducts)
    }


    const onEditorInit = (props) => {

        const { rowIndex: index, field, rowData } = props;
        if (!editingCellRows[index]) {
            editingCellRows[index] = { ...rowData };
        }
        editingCellRows[index][field] = catalogoLista[index][field];
    }

    const onEditorCancel = (props) => {
        const { rowIndex: index, field } = props;
        let products = [...catalogoLista];
        products[index][field] = editingCellRows[index][field];
        delete editingCellRows[index][field];
        llenaListado(products);
    }







    const positiveIntegerValidator = (props) => {
        const { rowData, field } = props;
        return isPositiveInteger(rowData[field]);
    }

    const isPositiveInteger = (val) => {
        let str = String(val);
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, "") || "0";
        var n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }

    const emptyValueValidator = (props) => {
        const { rowData, field } = props;
        return rowData[field].trim().length > 0;
    }



    return (
        <Fragment>
            <h1>Lista Catalogo</h1>
            <DataTable value={catalogoLista} editMode="cell"
                sortField="seCodigo" sortOrder={-1}
                className="editable-cells-table">
                {
                    columns.map(col => {
                        const { field, header } = col;
                        const validator = (field === 'seValor') ? positiveIntegerValidator : emptyValueValidator;
                        return <Column key={field} field={field} header={header}
                            editor={(props) =>
                                inputTextEditor(catalogoLista, props, field)}
                            editorValidator={validator}
                            onEditorInit={onEditorInit} onEditorCancel={onEditorCancel} onEditorSubmit={onEditorSubmit} />
                    })
                }
            </DataTable>
        </Fragment>
    )
}
export default ListaCatalogo;