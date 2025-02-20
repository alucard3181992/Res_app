import { useState, useEffect } from "react";

import { DataView } from "primereact/dataview";

export default function CocinaVista({ products }) {

    const renderItemsSeleccionados = (items) => {
        return items.map((item, index) => (
            <div key={index} className="p-d-flex p-ai-center p-mb-2 text-xl font-bold">
                <span>{item.name}</span>
                <span className="text-blue-500" > {item.cantidad}</span>
            </div>
        ));
    };
    const itemTemplate = (productos) => {
        console.log("PRODUCTOS", productos)
        const product = productos.items
        return (
            <div className="col-12 md:col-6 lg:col-6 p-2">
                <div className="p-4 border-1 surface-border h-full surface-card border-round product-container">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">Mesa: {productos.mesa}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        {renderItemsSeleccionados(product)}
                    </div>
                    <div className="flex align-items-center justify-content-between bottom-div">
                        <span className="font-semibold">{productos.estado}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <DataView
            value={products}
            itemTemplate={itemTemplate}
            header={"PEDIDOS"}
            paginator
            paginatorTemplate={{ layout: 'PrevPageLink  CurrentPageReport NextPageLink' }}
            currentPageReportTemplate="{currentPage} de {totalPages}"
            rows={10}
            //first={first}
            //onPage={onPageChange}
            //sortField={'marca.nom'}
            sortOrder={1}
        />
    );
}
