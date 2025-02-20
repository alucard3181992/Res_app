import React, { useState, useEffect } from "react";
import { clientes } from "./data";
import FormularioPrincipal from "../Tabla/Formulario";
import FormularioPrincipalND from "../Tabla/FormularioNDialog";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Tooltip } from "primereact/tooltip";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { ObtenerObjetoCampo } from "../Func/Campos";

const VistaCliente = ({
    vista,
    setVista,
    cliente,
    setCliente,
    encontrado,
    setEncontrado,
    documento,
    formulario,
    setDocumento,
}) => {

    const clienteDatos = {
        cedula: "",
        nombre: "",
        ap: "",
        am: "",
    }
    const objetosConCategorias = [
        { objeto: clienteDatos, categoria: "texto" },
    ];
    const camposObtenidos = ObtenerObjetoCampo(objetosConCategorias);

    const NuevosCampos = {
        ...formulario,
        campos: [{ ...camposObtenidos }]
    }
    const buscarCliente = (valor) => {
        setShowForm(true)
        const persona = clientes.filter((e) => e.cedula === valor)
        if (persona.length) {
            setCliente(persona[0])
            setEncontrado(true)
        } else {
            const nuevoCliente = {
                ...clienteDatos,
                cedula: valor
            }
            setCliente(nuevoCliente)
            setEncontrado(false)
        }
    }

    const ClienteVista = ({ cliente }) => (
        <Card
            title={<span className="text-primary">Detalles del Cliente</span>}
            className="p-shadow-5 text-center"
            style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '1rem',
                padding: '2rem',
            }}
        >
            <div className="p-field p-mb-3">
                <Tooltip target=".custom-tooltip-name" content="Nombre del cliente" />
                <label className="p-mb-1 custom-tooltip-name"><strong>Nombre:</strong></label>
                <p className="text-xl">{cliente.nombre}</p>
            </div>
            <Divider />
            <div className="p-field p-mb-3">
                <Tooltip target=".custom-tooltip-ap" content="Apellido paterno del cliente" />
                <label className="p-mb-1 custom-tooltip-ap"><strong>Apellido Paterno:</strong></label>
                <p className="text-xl">{cliente.ap}</p>
            </div>
            <Divider />
            <div className="p-field p-mb-3">
                <Tooltip target=".custom-tooltip-am" content="Apellido materno del cliente" />
                <label className="p-mb-1 custom-tooltip-am"><strong>Apellido Materno:</strong></label>
                <p className="text-xl">{cliente.am}</p>
            </div>
            <Button
                label="Editar"
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success p-mt-3"
                onClick={(e) => {
                    e.preventDefault()
                    setDocumento(true)
                }}
            />
            <Button
                label="Aceptar"
                icon="pi pi-check"
                className="p-button-rounded p-button-info p-mt-3"
                onClick={(e) => {
                    e.preventDefault()
                    setVista(false)
                }}
            />
        </Card>
    );

    const [showForm, setShowForm] = useState(false);

    const handleToggle = () => {
        setShowForm(!showForm);
    };

    const ClienteNoEncontrado = () => (
        <Card
            title={<span className="text-danger">Cliente No Encontrado</span>}
            className="p-shadow-5 text-center"
            style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '1rem',
                padding: '2rem',
            }}
        >
            {showForm ? <React.Fragment><p className="text-lg">El cliente no se encuentra en nuestra base de datos. Por favor, intente con otra búsqueda.</p>
                <Button
                    label="Nuevo"
                    icon="pi pi-plus"
                    className="p-button-rounded p-button-success p-mt-3"
                    /* onClick={(e) => {
                        e.preventDefault()
                        setDocumento(true)
                    }} */
                    onClick={handleToggle}
                />
            </React.Fragment>
                :
                <React.Fragment>

                    <FormularioPrincipalND
                        setFormulario={setDocumento}
                        formulario={documento}
                        datosFormulario={NuevosCampos}
                        datosCliente={cliente}
                        columnas={"col-12"} />
                    <Button
                        label="Volver"
                        iconPos="right"
                        icon="pi pi-arrow-left"
                        className="p-button-danger p-mt-3"
                        onClick={handleToggle}
                    />
                </React.Fragment>}
        </Card>
    );

    return (<React.Fragment>
        <Dialog
            visible={vista}
            onHide={(e) => setVista(false)}
        >
            <div className="centro-total">
                <div>
                    <span className="p-float-label font-bold p-input-icon-right mt-4">
                        <InputText
                            defaultValue={""}
                            onChange={(e) => buscarCliente(e.target.value)} />
                        <label className="w-full">Cedula y/o NIT </label>
                    </span>
                </div>
            </div>
            {encontrado ? <ClienteVista cliente={cliente} /> : <ClienteNoEncontrado />}
            <FormularioPrincipal
                setFormulario={setDocumento}
                formulario={documento}
                datosFormulario={NuevosCampos}
                datosCliente={cliente} />
        </Dialog>
    </React.Fragment>)
}
export default VistaCliente

