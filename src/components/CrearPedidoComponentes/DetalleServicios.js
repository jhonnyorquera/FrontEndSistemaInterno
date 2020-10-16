import React, { Fragment, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';



const DetalleServicios = ({ servicios }) => {

    const [detalles, setdetalleServicios] = useState([]);
    const columns = [
        { field: 'seNombre', header: 'Servicio' },
        { field: 'seValor', header: 'Valor' },
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
        console.log('valor')
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
        return <InputText type="text" value={props.rowData[field]} onChange={(e) => onEditorValueChange(productKey, props, e.target.value)} />;
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    const totalValor= () => {
        let total = 0;
        for(let sale of detalles) {
            total = total+parseFloat(sale.seValor);
        }

        return formatCurrency(total);
    }


    let footerGroup = <ColumnGroup>
    <Row>
        <Column footer="Totals:" colSpan={1} footerStyle={{textAlign: 'right'}}/>
        <Column footer={totalValor} />

    </Row>
    </ColumnGroup>;

    return (
        <Fragment>
            <h3>Detalle de Servicios</h3>
            <div>


                <DataTable value={detalles} editMode="cell" footerColumnGroup={footerGroup}
                    className="editable-cells-table">
                    {
                        columns.map(col => {
                            const { field, header } = col;
                            const validator = (field === 'quantity' || field === 'price') ? positiveIntegerValidator : emptyValueValidator;
                            return <Column key={field} field={field} header={header} editor={(props) => inputTextEditor('products2', props, field)} editorValidator={validator}
                                onEditorInit={onEditorInit} onEditorCancel={onEditorCancel} onEditorSubmit={onEditorSubmit} />
                        })
                    }
                </DataTable>

            </div>
        </Fragment>
    );
};

export default DetalleServicios;