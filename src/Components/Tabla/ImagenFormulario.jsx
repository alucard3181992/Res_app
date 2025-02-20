// ArchivoImagen.jsx
import React from 'react';
import ArchivoImagen from '../CargarImagen/ArchivoImagen';
import { Image } from 'primereact/image';
import { Funciones } from './Funciones';

const RenderizarImagen = ({ campo, cli, setCli, cliente, setCliente }) => {
    function codigoBase64(campo, valor) {
        Funciones.cambioValores(campo, valor, setCli, setCliente, cliente, cli)
    }
    return (<div className={cli.includes(campo.value) ? "field error p-error mb-5" : "field mb-5"}>
        <label className="font-bold">{campo.label}</label>
        {cliente[campo.value] && <div style={{ alignContent: "center", display: "flex", }} className="justify-content-center w-full">
            <Image src={cliente[campo.value]} alt="Foto Actual" preview className="ImgnormalFormulario border-round" style={{ height: "200px", width: "100%" }} />
        </div>}
        <ArchivoImagen codigoBase64={codigoBase64} campo={campo.value} />
        {cli.includes(campo.value) && < small className="p-error font-bold">{`${campo.label.toUpperCase()} ES REQUERIDO`}</small>}
    </div>
    )
}

export default RenderizarImagen;