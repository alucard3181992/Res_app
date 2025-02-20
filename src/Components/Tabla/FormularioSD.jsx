import React from 'react';
import { InputText } from 'primereact/inputtext';

const FormularioSD = ({ cliente, setCliente, buscar = false, lista = [], elemento = "", clienteVacio, disabled = false }) => {
    const handleInputChange = (e, key) => {
        setCliente(prevState => ({
            ...prevState,
            [key]: e.target.value
        }));
    };

    const handleSearch = () => {
        if (buscar && elemento) {
            const found = lista.find(item => item[elemento] === cliente[elemento]);
            if (found) {
                setCliente(found);
            } else {
                const clienteNuevo = {
                    ...clienteVacio,
                    [elemento]: cliente[elemento]
                }
                setCliente(clienteNuevo)
            }
        }
    };
    const dat = disabled ? " intocable " : ""
    return (
        <div className={"p-4 border-round shadow-2 surface-card h-full " + dat}>
            {Object.keys(cliente).map((key, index) => (
                <div key={index} className="p-field mb-4">
                    <span className="p-float-label p-input-icon-right w-full">
                        <InputText
                            id={key}
                            value={cliente[key]}
                            onChange={(e) => handleInputChange(e, key)}
                            className={buscar && key === elemento ? 'p-inputtext-icon w-full' : 'w-full'}
                        //disabled={disabled}
                        />
                        <label htmlFor={key}>{key}</label>
                        {buscar && key === elemento && (
                            <i className="pi pi-search" onClick={handleSearch} />
                        )}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default FormularioSD;
