import React, { Fragment, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Button } from 'primereact/button';



const DetalleServicios = ({ cargaEstado, servicios, cargarServicios }) => {

    const [detalles, setdetalleServicios] = useState([]);

    const [detallesSelect, setdetalleSelectedServicios] = useState([]);

    const columns = [
        { keyC: 'seCodigo', field: 'seNombre', header: 'Servicio' },
        { keyC: 'seCodigo', field: 'seCantidad', header: 'Cantidad' },
        { keyC: 'seCodigo', field: 'seValor', header: 'Valor' }

    ];



    let editingCellRows = {};

    const onEditorInit = (props) => {
        const { rowIndex: index, field, rowData } = props;
        if (!editingCellRows[index]) {
            editingCellRows[index] = { ...rowData };
        }
        editingCellRows[index][field] = detalles[index][field];
    }

    const onEditorCancel = (props) => {
        const { rowIndex: index, field } = props;
        let products = [...detalles];
        products[index][field] = editingCellRows[index][field];
        delete editingCellRows[index][field];

        setdetalleServicios(products);
    }

    const onEditorSubmit = (props) => {
        const { rowIndex: index, field } = props;

    }

    useEffect(() => {
        setdetalleServicios(servicios)
    }, [servicios]);

    const positiveIntegerValidator = (props) => {
        const { rowData, field } = props;
        return isPositiveInteger(rowData[field]);
    }

    const emptyValueValidator = (props) => {
        const { rowData, field } = props;
        return rowData[field].trim().length > 0;
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

    const onEditorValueChange = (productKey, props, value) => {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        setdetalleServicios(updatedProducts)

        totalValor()
    }

    const inputTextEditor = (productKey, props, field) => {
        if (field === 'seValor' || field === 'seCantidad') {
            return <InputText type="text" value={props.rowData[field]} onChange={(e) => onEditorValueChange(productKey, props, e.target.value)} />;
        } else {
            return <div className="p-text-bold">{props.rowData[field]}</div>
        }

    }


    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const totalValor = () => {
        let total = 0;
        for (let sale of detalles) {
            total = total + parseFloat(sale.seValor);
        }

        return formatCurrency(total);
    }

    const eliminarProductos = (e) => {
        let _products = detalles.filter(val => !detallesSelect.includes(val));
        setdetalleServicios(_products)
        cargarServicios(_products)


    }



    let footerGroup = <ColumnGroup>
        <Row>
            <Column footer="Total:" colSpan={3} footerStyle={{ textAlign: 'right' }} />
            <Column footer={totalValor} />

        </Row>
    </ColumnGroup>;

    return (
        <Fragment>
            <h3>Detalle de Servicios</h3>
            <div>

                <div className="p-col-12" align="right">
                    <Button onClick={(e) => cargaEstado('servicios')} icon="pi pi-search" className="p-button-raised p-button-rounded" />
                </div>
                <DataTable value={detalles} editMode="cell"
                    footerColumnGroup={footerGroup}
                    className="editable-cells-table"
                    onSelectionChange={e => setdetalleSelectedServicios(e.value)}
                    selection={detallesSelect}
                    selectionMode="multiple"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    {
                        columns.map(col => {
                            const { keyC, field, header } = col;
                            const validator = (field === 'seValor') ? positiveIntegerValidator : emptyValueValidator;

                            return <Column key={keyC} field={field} header={header} editor={(props) => inputTextEditor('detalles', props, field)} editorValidator={validator}
                                onEditorInit={onEditorInit} onEditorCancel={onEditorCancel} onEditorSubmit={onEditorSubmit} />
                        })
                    }
                </DataTable>
                <div className="p-col-12" align="right">
                    <Button onClick={(e) => eliminarProductos(e)} icon="pi pi-times" className="p-button-raised p-button-rounded p-button-danger" />
                </div>


            </div>
        </Fragment>
    );
};

export default DetalleServicios;