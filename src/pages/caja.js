/*import { useState, useEffect } from "react";
import io from "socket.io-client";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const socket = io({ path: "/api/socket" });

export default function Caja() {
  const [mesa, setMesa] = useState("");
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Escuchar pedidos actualizados en tiempo real
    socket.on("pedidoActualizado", (pedido) => {
      setPedidos((prev) => [...prev, pedido]);
    });

    return () => {
      socket.off("pedidoActualizado");
    };
  }, []);

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
}*/
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import io from "socket.io-client";
import VistaPrincipalVenta from "@/Components/Venta/Venta";
import { useRouter } from "next/router";

const socket = io({ path: "/api/socket" });

export default function Caja() {
  const [mesa, setMesa] = useState("");
  const [items, setItems] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const router = useRouter();
  // Cargar productos de ejemplo desde el archivo JSON
  useEffect(() => {
    const fetchProductos = async () => {
      const res = await fetch("/productos.json");
      const data = await res.json();
      setProductos(data);
    };
    fetchProductos();

    // Escuchar cambios de estado en tiempo real
    socket.on("actualizarPedido", (pedidoActualizado) => {
      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.id === pedidoActualizado.id
            ? { ...pedido, estado: pedidoActualizado.estado }
            : pedido
        )
      );
    });

    return () => {
      socket.off("actualizarPedido");
    };
  }, []);

  // Función para agregar un producto a los items seleccionados
  const agregarItem = (producto) => {
    setItems((prevItems) => [...prevItems, producto]);
  };

  // Registrar un nuevo pedido
  const registrarPedido = async () => {
    console.log("Items", items)
    if (!mesa || items.length === 0) return alert("Completa los datos");
    const nuevoPedido = { id: Date.now(), mesa, items, estado: "Solicitado" };

    // Enviar el pedido a la API
    const res = await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoPedido),
    });

    if (res.ok) {
      setPedidos((prevPedidos) => [...prevPedidos, nuevoPedido]);
      setMesa("");
      setItems([]);
      socket.emit("nuevoPedido", nuevoPedido); // Enviar el nuevo pedido a la cocina
    }
  };

  // Mostrar los productos disponibles
  const renderProductos = () => {
    return productos.map((producto) => (
      <Button
        key={producto.id}
        label={`${producto.nombre} - $${producto.precio}`}
        icon="pi pi-plus"
        className="p-button-outlined p-m-2"
        onClick={() => agregarItem(producto)}
      />
    ));
  };

  // Mostrar los productos seleccionados
  const renderItemsSeleccionados = () => {
    return items.map((item, index) => (
      <div key={index} className="p-d-flex p-ai-center p-mb-2">
        <span style={{ color: "black" }}>{item.nombre}</span>
        <Button
          icon="pi pi-times"
          className="p-button-danger p-ml-2"
          onClick={() => eliminarItem(index)}
        />
      </div>
    ));
  };

  // Función para eliminar un producto de los seleccionados
  const eliminarItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Renderizar los pedidos actuales con su estado
  const renderPedidos = () => {
    return pedidos.map((pedido) => (
      <tr key={pedido.id}>
        <td>{pedido.id}</td>
        <td>{pedido.mesa}</td>
        <td>{pedido.items.map((item) => item.nombre).join(", ")}</td>
        <td>{pedido.estado}</td>
      </tr>
    ));
  };

  return (<React.Fragment>
    <Button label="Volver..."
      onClick={() => router.push("/")}></Button>
    <div className="container p-d-flex p-flex-column p-ai-center p-p-3">
      <h1>📋 Registro de Pedidos</h1>

      <div className="form p-d-flex p-flex-column p-ai-center p-p-2">
        <InputText
          placeholder="Número de Mesa"
          value={mesa}
          onChange={(e) => setMesa(e.target.value)}
          className="p-mb-2"
        />

        {/* <div className="p-d-flex p-flex-wrap p-ai-center">
          {renderProductos()}
        </div>

        <div className="p-d-flex p-flex-column p-ai-center p-mt-3">
          <h3>Productos Seleccionados</h3>
          {renderItemsSeleccionados()}
        </div> */}
        <VistaPrincipalVenta registrarPedido={registrarPedido}
          setSelectedItems={setItems}
          selectedItems={items}></VistaPrincipalVenta>
        {/* <Button
          label="Registrar Pedido"
          icon="pi pi-check"
          onClick={registrarPedido}
          className="p-mt-3 p-button-success"
        /> */}
      </div>

      <h2>🎯 Pedidos en Curso</h2>
      <div className="p-d-flex p-flex-column p-ai-center">
        {pedidos.length === 0 ? (
          <p>No hay pedidos en curso.</p>
        ) : (
          <DataTable value={pedidos} responsiveLayout="scroll" className="p-mt-2">
            <Column field="id" header="ID" />
            <Column field="mesa" header="Mesa" />
            <Column field="items" header="Items" body={(row) => row.items.map((item) => item.name).join(", ")} />
            <Column field="estado" header="Estado" />
          </DataTable>
        )}
      </div>
    </div>

  </React.Fragment>);
}
