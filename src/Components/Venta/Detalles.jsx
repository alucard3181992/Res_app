import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const Detalles = ({ product, selectedItems, setSelectedItems }) => {

    const [cantidad, setCantidad] = useState(product.cantidad)

    const cambioValores = (valor, precio, key) => {
        const total = valor * precio
        const total2 = total.toFixed(2)
        //product.stotal = total2
        const index = selectedItems.findIndex(item => item.key === key)
        if (index !== -1) {
            const updatedItems = [...selectedItems];
            updatedItems[index] = {
                ...updatedItems[index],
                cantidad: valor,
                stotal: total2
            }
            setSelectedItems(updatedItems);
        }
    }
    const cambioCantidad = (valor) => {
        setCantidad(parseInt(valor))
    }

    useEffect(() => {
        setCantidad(product.cantidad)
    }, [selectedItems])
    //
    //const nuevaVenta = venta.filter((_, i) => i !== index);
    //       setVenta(nuevaVenta);
    const eliminarProducto = (key) => {
        const updatedItems = selectedItems.filter(item => item.key !== key);
        setSelectedItems(updatedItems);
    }
    return (
        <React.Fragment>
            <div className='flex gap-2 mb-2'>
                <InputText
                    className='border-2 w-2 font-bold text-center'
                    value={cantidad}
                    onChange={(e) => { cambioCantidad(e.target.value) }}
                    onBlur={(e) => cambioValores(e.target.value, product.price, product.key)}
                />
                <div className='w-5'>
                    <span className='font-bold ' style={{ display: 'block' }}>{product.name}</span>
                    <span className='font-bold ' style={{ display: 'block' }}>{product.price} bs</span>
                </div>
                <span className='font-bold w-4 text-center'>{product.stotal} bs</span>
                <Button
                    icon="pi pi-times"
                    className='w-1 text-center'
                    severity='danger'
                    text
                    onClick={(e) => {
                        e.preventDefault()
                        eliminarProducto(product.key)
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export default Detalles;
