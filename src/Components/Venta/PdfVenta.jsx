import React from "react";
import SimplePdf from "../Componentes/SImplePDF";
import { Dialog } from "primereact/dialog";

const PdfVenta = ({ empresa, visible, setVisible, selectedItems, cliente, stotal, descuento, total }) => {

    const hideModal = () => {
        setVisible(false);
    };
    const detalles = selectedItems.map(item => ({
        Producto: item.name,
        Cantidad: item.cantidad,
        PUnit: item.price,
        SubTotal: item.stotal
    }));
    const clienteNuevo = {
        Cedula: cliente.cedula,
        Nombre: cliente.nombre,
        Apellido_Paterno: cliente.ap,
        Apellido_Materno: cliente.am,
    }
    const datos = {
        Empresa: empresa,
        Datos_Del_Cliente: clienteNuevo,
        Detalles: detalles,
        "": {
            stotal,
            descuento,
            total,
        }
    }
    const transitionOptions = {
        classNames: "slide-bottom",
        timeout: { enter: 300, exit: 300 },
    };
    const verQR = {
        ver: false,
        datos: ``,
    };

    const verLogo = {
        ver: false,
        ruta: "/icons/img/report.png"
    };

    return (<React.Fragment>
        <Dialog
            visible={visible}
            style={{ width: '80vw' }}
            onHide={hideModal}
            modal
            transitionOptions={transitionOptions}
        >
            <SimplePdf
                Datos={datos}
                titulo={"TITULO"}
                subTitulo={"Subtitulo"}
                verQR={verQR}
                verLogo={verLogo}
                SegundaPagina={null}
                data={{
                    ver: false,
                }}
                tema={"azul"}
            />
        </Dialog>
    </React.Fragment>)
}
export default PdfVenta