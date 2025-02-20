import React, { useState, useEffect, useContext } from 'react';

import { dataVenta } from "./data";
import Detalles from './Detalles';
//import { PrincipalContext } from '@/context/PrincipalContext';
import VistaCliente from './Cliente';
import Proforma from './Proforma';

import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';


const VistaPrincipalVenta = ({ registrarPedido, selectedItems = [], setSelectedItems }) => {
    //const { eventData } = useContext(PrincipalContext)

    const [filterValue, setFilterValue] = useState('');
    const [first, setFirst] = useState(0)
    //const [selectedItems, setSelectedItems] = useState([]);
    const [rows, setRows] = useState(6)
    const [total, setTotal] = useState(0)
    const [descuento, setDescuento] = useState(0)
    const [stotal, setSTotal] = useState(0)
    const [vistaCliente, setVistaCliente] = useState(false)
    const [cliente, setCliente] = useState({})
    const [encontrado, setEncontrado] = useState(false)
    const [documento, setDocumento] = useState(false)
    const [proforma, setProforma] = useState(false)

    const filteredProducts = dataVenta.filter((item) =>

        item.name.toLowerCase().includes(filterValue.toLowerCase())
    )

    const header = () => {
        return (
            <><span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    placeholder="Buscar Producto"
                    value={filterValue}
                    onChange={filterProducts}
                    className='w-full p-inputtext-sm'
                />
            </span>
            </>
        )
    }

    const filterProducts = (event) => {
        //setSelectedItems([])
        //console.log("ME LLAMAN BUSCAR");
        setFilterValue(event.target.value);
    }

    const onPageChange = (event) => {
        setFirst(event.first);
        //setSelectedItems([])
    }

    /* const agregarDetalles = (item) => {
        console.log(item)
        const keyNuevo = selectedItems.length + 1
        const itemNuevo = {
            key: Date.now().toString(),
            cantidad: 1,
            stotal: item.price,
            ...item
        }
        const nuevaVenta = [...selectedItems, itemNuevo];
        setSelectedItems(nuevaVenta)
    } */
    const agregarDetalles = (item) => {
        console.log(item);

        // Verifica si el producto ya existe en la lista
        const index = selectedItems.findIndex((producto) => producto.id === item.id);

        if (index !== -1) {
            // Si el producto ya existe, aumenta la cantidad y recalcula el subtotal correctamente
            const nuevaVenta = [...selectedItems];
            nuevaVenta[index] = {
                ...nuevaVenta[index],
                cantidad: Number(nuevaVenta[index].cantidad) + 1, // Convertir a número antes de sumar
                stotal: Number(nuevaVenta[index].stotal) + Number(item.price), // Convertir ambos a número
            };
            setSelectedItems(nuevaVenta);
        } else {
            // Si el producto no existe, agrégalo como un nuevo elemento
            const itemNuevo = {
                key: Date.now().toString(),
                cantidad: 1,
                stotal: Number(item.price), // Asegurar que se almacena como número
                ...item,
            };
            setSelectedItems([...selectedItems, itemNuevo]);
        }
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    }

    const itemTemplate = (product) => {
        return (
            <div className="col-12 md:col-6 lg:col-4 p-2">
                <div className="p-4 border-1 surface-border h-full surface-card border-round product-container">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between bottom-div">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-shopping-cart"
                            onClick={(e) => {
                                e.preventDefault()
                                agregarDetalles(product)
                            }} className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        );
    };
    //992  */
    /* useEffect(() => {
        if (eventData.width > 991) {
            setRows(6)
        } else {
            if (eventData.width < 768) {
                setRows(1)
            } else {
                setRows(4)
            }

        }
    }, [eventData]) */

    useEffect(() => {
        const totalSum = selectedItems.reduce((acc, item) => acc + parseFloat(item.stotal), 0);
        if (totalSum > 0) {
            setSTotal(totalSum);
            const newTotal = totalSum - descuento;
            setTotal(newTotal >= 0 ? newTotal : 0);
        } else {
            setSTotal(0);
            setTotal(0);
        }
    }, [selectedItems, descuento])

    const cambioDescuento = (valor) => {
        setDescuento(parseFloat(valor ? valor : 0))
        const nuevoValor = stotal - valor
        if (valor <= stotal) {
            setTotal(nuevoValor);
        } else {
            // Si quieres realizar alguna otra acción, puedes ponerla aquí.
        }
    }

    const limpiar = () => {
        setSelectedItems([])
    }

    const limpiar2 = () => {
        setCliente({})
        setEncontrado(false)
    }

    const cerrarFormulario = () => {
        console.log("SE CERRO");
    }

    const nuevo = (datos) => {
        console.log("ME LLAMAN NUEVO", datos);
        setDocumento(false)
    }

    const formulario = {
        formularioTitulo: "Titulo del Formulario",
        cerrar: cerrarFormulario,
        botonTitulo: "Registro",
        telefono: true,
        nuevo: nuevo,
        modificar: null,
        campos: [{
            id: [
                { label: 'Identificador de Usuario', value: 'idu', value2: 'idu' },
                { label: 'Identificador de Persona', value: 'idpe', value2: 'idpe' },
                /* { label: 'Identificador de Empresa', value: 'idem', value2: 'empresa.idem' }, */
                // Otros campos de tipo texto
            ],
            texto: [
                { label: 'Cedula de Identidad', value: 'cedula', requerido: true, value2: 'cedula', },
                { label: 'Nombre', value: 'nombre', requerido: true, value2: 'nombre', },
                { label: 'Ap. Paterno', value: 'ap', requerido: true, value2: 'ap', },
                { label: 'Ap. Materno', value: 'am', requerido: false, value2: 'am', },
                // Otros campos de tipo texto
            ],
        }]
    }

    return (<React.Fragment>
        <div className="grid">
            <div className="col-12 md:col-6">
                <DataView
                    value={filteredProducts}
                    itemTemplate={itemTemplate}
                    header={header()}
                    paginator
                    paginatorTemplate={{ layout: 'PrevPageLink  CurrentPageReport NextPageLink' }}
                    currentPageReportTemplate="{currentPage} de {totalPages}"
                    rows={rows}
                    first={first}
                    onPage={onPageChange}
                    sortField={'marca.nom'}
                    sortOrder={1}
                />
            </div>
            <div className="col-12 md:col-6">
                <div className='h-full'>
                    <div className='surface-card shadow-2 p-3 border-round mb-2' style={{
                        height: "calc(100vh - 350px)",
                        overflow: "hidden",
                        overflowY: "auto"

                    }}>{encontrado &&
                        <div className='text-center'>
                            <small
                                className='w-full text-blue-500 font-bold'
                            >
                                Cliente : {cliente.nombre}
                                <Button
                                    text
                                    icon="pi pi-times"
                                    size='small'
                                    severity='danger'
                                    rounded
                                    tooltip='Borrar Cliente'
                                    tooltipOptions={{ position: "bottom" }}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        limpiar2()
                                    }} />
                            </small>
                        </div>
                        }
                        <Button
                            className='text-green-500 font-bold w-full mb-3'
                            text label={`${encontrado ? 'Cambiar ' : 'Selecionar '} Cliente`}
                            onClick={(e) => {
                                e.preventDefault()
                                setVistaCliente(true)
                            }} />
                        {vistaCliente && <VistaCliente
                            setVista={setVistaCliente}
                            vista={vistaCliente}
                            cliente={cliente}
                            setCliente={setCliente}
                            encontrado={encontrado}
                            setEncontrado={setEncontrado}
                            documento={documento}
                            setDocumento={setDocumento}
                            formulario={formulario}
                        />}
                        {selectedItems.length > 0 && selectedItems.map((e, index) =>
                            <Detalles
                                key={index}
                                selectedItems={selectedItems}
                                setSelectedItems={setSelectedItems}
                                product={e} />
                        )}
                    </div>
                    <div className='surface-card shadow-2 p-3 border-round' style={{
                        height: "220px",
                        overflow: "hidden",

                    }}>
                        <div className='flex mb-3'>
                            <span className='w-6 font-bold text-xl'> {selectedItems.length} items </span>
                            <span className='w-6 text-right font-bold text-xl'> Subtotal: {stotal} bs </span>
                        </div>
                        <div className='flex mb-3'>
                            <span className='w-6'></span>
                            <span className='p-float-label w-6'>
                                <InputText
                                    defaultValue={descuento || 0}
                                    className='text-red-500 font-bold w-full text-right'
                                    onChange={(e) => cambioDescuento(e.target.value)}
                                    pt={{
                                        root: {
                                            className: 'border-none', style: {
                                                background: "transparent"
                                            }
                                        }
                                    }} />
                                <label className='text-green-500 font-bold text-right w-full' >Editar Descuento</label>
                            </span>
                        </div>
                        <div className='flex mb-5'>
                            <span className='font-bold text-2xl w-full text-right'>Total : {total} bs </span>
                        </div>
                        <div className='flex mb-5 gap-2'>
                            <Button
                                className='w-2 border-2 border-primary-500 '
                                icon="pi pi-trash"
                                text
                                tooltip='Eliminar todo'
                                tooltipOptions={{ position: "bottom" }}
                                onClick={limpiar} />
                            <Button
                                className='w-10'
                                label='Registrar Pedido'
                                icon="pi pi-angle-right"
                                iconPos='right'
                                tooltip='Aprobar Pedido'
                                tooltipOptions={{ position: "bottom" }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    registrarPedido(selectedItems)
                                    //setProforma(true)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Proforma
            cliente={cliente}
            selectedItems={selectedItems}
            stotal={stotal}
            descuento={descuento}
            total={total}
            visible={proforma}
            setVisible={setProforma} />
    </React.Fragment>)
}

export default VistaPrincipalVenta