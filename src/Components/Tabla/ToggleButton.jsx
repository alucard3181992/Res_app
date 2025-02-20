import React from 'react';
import { ToggleButton } from 'primereact/togglebutton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Funciones } from './Funciones';

const RenderizarToggleButton = ({ campo, cli, setCli, cliente, setCliente, }) => {
    return (
        <div className={cli.includes(campo.value) ? "field error p-error" : "field"}>
            <label className="font-bold">{campo.etiqueta}</label>
            <DataTable
                value={campo.opciones}
            >
                <Column header="Nº" body={(data, options) => options.rowIndex + 1} frozen />
                <Column header="Nombre" field="label" sortable />
                <Column header="Asignado" sortable body={(data) =>
                    <ToggleButton
                        name={data}
                        checked={cliente[campo.value].includes(data.value)}
                        onChange={(e) => Funciones.cambioToggleButton(campo.value, e, setCli, setCliente, cliente, cli)}
                        onIcon="pi pi-check"
                        offIcon="pi pi-times"
                        onLabel="Si"
                        offLabel="No"
                        className={`w-8rem ${cliente[campo.value].includes(data.value) ? '' : 'bg-purple-500 border-red'}`}
                    />} />

            </DataTable>
            {cli.includes(campo.value) && < small className="p-error font-bold">{`${campo.etiqueta.toUpperCase()} ES REQUERIDO`}</small>}
        </div>
    )
}

export default RenderizarToggleButton;