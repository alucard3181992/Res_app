import React, { useState } from 'react';

import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import SimplePdf from '../Componentes/SImplePDF';
import PdfVenta from './PdfVenta';

const Proforma = ({ cliente, selectedItems, stotal, descuento, total, visible, setVisible }) => {
    const empresa = {
        nombre: "Mi Empresa S.A.",
        direccion: "Calle Falsa 123",
        telefono: "555-1234",
        email: "info@miempresa.com",
        lugar: "La Paz, Bolivia",
        fecha: new Date().toLocaleDateString()
    };

    const [pdf, setPdf] = useState(false)
    const hideModal = () => { // Clear animation class before hiding
        setVisible(false);
    };
    //fade
    //slide
    //zoom
    //bounce
    //flip
    //slide-right
    //zoom-out
    //slide-bottom
    //slide-left
    //zoom-squares
    //rotate

    const transitionOptions = {
        classNames: "slide-bottom",
        timeout: { enter: 400, exit: 400 },
    };
    return (
        <Dialog
            visible={visible}
            style={{ width: '80vw' }}
            onHide={hideModal}
            modal
            transitionOptions={transitionOptions}
        >
            <Card className="p-shadow-5" style={{ width: '100%', margin: '0 auto', borderRadius: '1rem', }}>
                <div className="p-d-flex p-flex-column p-ai-center">
                    <h2>{empresa.nombre}</h2>
                    <p>{empresa.direccion}</p>
                    <p>{empresa.telefono}</p>
                    <p>{empresa.email}</p>
                    <Divider />
                    <div className="p-d-flex p-flex-column p-ai-center p-mb-3">
                        <h3>Factura / Proforma</h3>
                        <p><strong>Lugar:</strong> {empresa.lugar}</p>
                        <p><strong>Fecha:</strong> {empresa.fecha}</p>
                    </div>
                    <Divider />
                    <div className="p-mb-3" style={{ width: '100%' }}>
                        <h4>Datos del Cliente</h4>
                        <p><strong>Nombre:</strong> {cliente.nombre} {cliente.ap} {cliente.am}</p>
                        <p><strong>Cédula:</strong> {cliente.cedula}</p>
                    </div>
                    <Divider />
                    <div className="p-mb-3" style={{ width: '100%' }}>
                        <h4>Detalles de la Compra</h4>
                        <DataTable
                            value={selectedItems}
                            stripedRows
                            emptyMessage="S/N"
                        >
                            <Column field='name' header='Producto' />
                            <Column field='cantidad' header='Cantidad' className='text-center' />
                            <Column field='price' header='Precio Unitario' className='text-center' />
                            <Column field='stotal' header='Subtotal' className='text-center' />
                        </DataTable>
                    </div>
                    <Divider />
                    <div className="p-d-flex p-flex-column p-ai-end p-mb-3" style={{ width: '100%' }}>
                        <div className="p-d-flex p-jc-between" style={{ width: '100%' }}>
                            <p><strong>Subtotal:</strong></p>
                            <p>{stotal.toFixed(2)} Bs</p>
                        </div>
                        <div className="p-d-flex p-jc-between" style={{ width: '100%' }}>
                            <p><strong>Descuento:</strong></p>
                            <p>{descuento.toFixed(2)} Bs</p>
                        </div>
                        <div className="p-d-flex p-jc-between" style={{ width: '100%' }}>
                            <h3><strong>Total:</strong></h3>
                            <h3>{total.toFixed(2)} Bs</h3>
                        </div>
                    </div>
                </div>
            </Card>
            <Button
                label='Generar Pdf'
                rounded
                severity='info'
                icon="pi pi-file-pdf"
                iconPos='right'
                onClick={(e) => {
                    e.preventDefault()
                    selectedItems.length ? setPdf(true) : null
                }} />
            {pdf && selectedItems.length && <PdfVenta
                cliente={cliente}
                descuento={descuento}
                empresa={empresa}
                selectedItems={selectedItems}
                setVisible={setPdf}
                stotal={stotal}
                total={total}
                visible={pdf} />}
        </Dialog>
    );
};
export default Proforma