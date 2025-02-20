import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";

export default function CabeceraTabla({
    datos,
    botonAdicionar,
    globalFilterValue,
    onGlobalFilterChange,
    seleccion,
    confirmarBorrarMasivo,
    setConfirmarBorrarMasivo,
    botonBorrarMasivo }) {
    return (
        <React.Fragment>
            <div className="flex flex-wrap gap-2">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Buscar..." />
                </span>
                {datos.añadir.visible && <Button
                    label="Nuevo"
                    size="small"
                    icon="pi pi-plus"
                    onClick={botonAdicionar}
                />}
                {datos.borrarMasivo.visible && <Button
                    label="Eliminar"
                    icon="pi pi-trash"
                    size="small"
                    badgeClassName="p-badge-info"
                    badge={seleccion !== null ? seleccion.length : 0}
                    severity="danger"
                    disabled={!seleccion || !seleccion.length}
                    onClick={(e) => { e.preventDefault(), setConfirmarBorrarMasivo(true) }}
                />}
                {confirmarBorrarMasivo && <ConfirmDialog visible={confirmarBorrarMasivo} onHide={() => setConfirmarBorrarMasivo(false)} message="¿ Confirma la eliminacion de los datos seleccionados ?"
                    header="Confirmacion!!!!" icon="pi pi-info-circle" accept={() => botonBorrarMasivo()}
                    acceptClassName='p-button-danger' acceptLabel='Si' />}
            </div>
        </React.Fragment>
    );
};