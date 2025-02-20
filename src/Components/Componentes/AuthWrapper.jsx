import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const AuthWrapper = ({ children, correctPassword }) => {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handlePasswordSubmit = () => {
        if (password === correctPassword) {
            setIsAuthenticated(true);
            setErrorMessage("");
        } else {
            setErrorMessage("No tiene los permisos suficientes para acceder a la página. Por favor, introduzca la contraseña correcta.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <h2>Acceso Restringido</h2>
                <p>Ingrese la contraseña para acceder a esta página:</p>
                <InputText
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: "10px", fontSize: "16px", marginBottom: "10px" }}
                />
                <Button
                    onClick={handlePasswordSubmit}
                    style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
                    label="Enviar" />
                {errorMessage && <p className="p-error" style={{ /* color: "red", */ marginTop: "10px" }}>{errorMessage}</p>}
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthWrapper;
