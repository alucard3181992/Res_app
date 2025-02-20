import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Caja() {
  const [mesa, setMesa] = useState("");
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  // const [socket, setSocket] = useState(null); // Excluimos el socket

  // useEffect(() => {
  //   const newSocket = io({ path: "/api/socket" });
  //   setSocket(newSocket);

  //   // Escuchar eventos de pedido
  //   newSocket.on("pedidoActualizado", (pedido) => {
  //     setPedidos((prev) => [...prev, pedido]);
  //   });

  //   return () => {
  //     newSocket.off("pedidoActualizado");
  //     newSocket.disconnect(); // Cerrar la conexión
  //   };
  // }, []);

  const agregarItem = () => {
    if (item.trim()) {
      setItems([...items, item]);
      setItem("");
    }
  };

  const registrarPedido = async () => {
    if (!mesa || items.length === 0) return alert("Completa los datos");

    const nuevoPedido = { mesa, items };

    const res = await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoPedido),
    });

    if (res.ok) {
      setMesa("");
      setItems([]);
    }
  };

  return (
    <div className="container">
      <h1>📋 Registro de Pedidos</h1>

      <div className="form">
        <InputText
          placeholder="Número de Mesa"
          value={mesa}
          onChange={(e) => setMesa(e.target.value)}
        />
        <InputText
          placeholder="Agregar Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && agregarItem()}
        />
        <Button label="Agregar" icon="pi pi-plus" onClick={agregarItem} />
        <Button label="Registrar Pedido" icon="pi pi-check" onClick={registrarPedido} />
      </div>

      <h2>📢 Pedidos en Curso</h2>
      <DataTable value={pedidos} responsiveLayout="scroll">
        <Column field="id" header="ID" />
        <Column field="mesa" header="Mesa" />
        <Column field="items" header="Items" body={(row) => row.items.join(", ")} />
        <Column field="estado" header="Estado" />
      </DataTable>
    </div>
  );
}
