/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import SearchBar from './Buscar';
import ProductList from '../Venta3/ProductList';

export default function Tabla2({ lista, añadir }) {
    const [layout, setLayout] = useState('grid');

    /* useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data.slice(0, 12)));
    }, []); */

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
    };

    const listItem = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button
                                icon="pi pi-shopping-cart"
                                className="p-button-rounded"
                                disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                                onClick={(e) => {
                                    e.preventDefault()
                                    añadir(product)
                                }}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
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
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button
                            icon="pi pi-shopping-cart"
                            className="p-button-rounded"
                            disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                            onClick={(e) => {
                                e.preventDefault()
                                añadir(product)
                            }}></Button>
                    </div>
                </div>
            </div>
        );
    };


    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }
        if (layout === 'list') return listItem(product);
        else if (layout === 'grid') return gridItem(product)
    }

    const [first, setFirst] = useState(0)
    const [sortOrder, setSortOrder] = useState(1);

    const getSortOptions = (product) => {
        const sortOptions = [];
        for (const key in product) {
            if (typeof product[key] === 'number') {
                sortOptions.push(
                    { label: `${key.charAt(0).toUpperCase() + key.slice(1)} Menor a Mayor`, value: key },
                    { label: `${key.charAt(0).toUpperCase() + key.slice(1)} Mayor a Menor`, value: `!${key}` }
                );
            } else {
                sortOptions.push(
                    { label: `${key.charAt(0).toUpperCase() + key.slice(1)} A - Z`, value: key },
                    { label: `${key.charAt(0).toUpperCase() + key.slice(1)} Z - A`, value: `!${key}` }
                );
            }
        }
        return sortOptions;
    };
    //console.log("LA LISTA ES ", getSortOptions(lista[0]));
    const sortOptions = getSortOptions(lista[0])
    const [sortField, setSortField] = useState(sortOptions[0].value);
    const [sortKey, setSortKey] = useState(sortOptions[0].value);

    const onPageChange = (event) => {
        setFirst(event.first);
        //setSelectedItems([])
    }

    const cambioOrden = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const [filteredProducts2, setFilteredProducts2] = useState(lista);

    useEffect(() => {
        setFilteredProducts2(lista);
    }, [lista]);

    const handleFilter = (filtered) => {
        setFilteredProducts2(filtered);
    }
    const p = () => {
        return (<div className='flex p-dataview-layout-options p-selectbutton p-buttonset'>
            <Button className={`p-button p-button-icon-only ${layout === "grid" ? ' p-highlight ' : ''}`}
                icon="pi pi-microsoft"
                onClick={(e) => {
                    e.preventDefault(),
                        setLayout("grid")
                }} />
            <Button className={`p-button p-button-icon-only ${layout === "list" ? ' p-highlight ' : ''}`}
                icon="pi pi-list"
                onClick={(e) => {
                    e.preventDefault(),
                        setLayout("list")
                }} />
            <Button className={`p-button p-button-icon-only ${layout === "table" ? ' p-highlight ' : ''}`}
                icon="pi pi-table"
                onClick={(e) => {
                    e.preventDefault(),
                        setLayout("table")
                }} />
        </div>)
    }

    const startContent = (
        <React.Fragment>
            <SearchBar
                products={lista}
                onFilter={handleFilter}
            />
        </React.Fragment>
    )

    const endContent = (
        <React.Fragment>
            <div className="flex w-full">
                <Dropdown options={sortOptions}
                    value={sortKey} optionLabel="label"
                    placeholder="Ordenar por:" onChange={cambioOrden}                   

                />
                {p()}
            </div>
        </React.Fragment>
    )
    const header = () => {
        return (
            <Toolbar start={startContent} end={endContent} />
        );
    };

    return (
        <div className="card">
            soy tabla2
            {layout === "table" ?
                <ProductList onAddToCart={añadir} products={lista} p={p} />
                :
                <DataView
                    value={filteredProducts2}
                    itemTemplate={itemTemplate}
                    layout={layout}
                    header={header()}
                    first={first}
                    onPage={onPageChange}
                    paginator
                    rows={4}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    pt={{
                        grid: { className: 'surface-ground' }
                    }}
                />
            }


        </div>
    )
}
