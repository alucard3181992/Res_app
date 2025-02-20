import { useState, useEffect } from "react";
import io from "socket.io-client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CocinaVista from "@/Components/Venta/Cocina";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

const socket = io({ path: "/api/socket" });

export default function Cocina() {
  const [pedidos, setPedidos] = useState([]);
  const router = useRouter();
  useEffect(() => {
    // Escuchar pedidos actualizados en tiempo real
    socket.on("pedidoActualizado", (pedido) => {
      setPedidos((prev) => [...prev, pedido]);
    });

    return () => {
      socket.off("pedidoActualizado");
    };
  }, []);

  // Función para extraer los nombres de los productos
  const mostrarItems = (items) => {
    return items.map(item => item.name).join(", "); // Asumimos que "nombre" es la propiedad del producto
  };

  return (
    <div className="container">
      <Button label="Volver..."
      onClick={() => router.push("/")}></Button>
      <h1>🍳 Pedidos en Cocina</h1>
      <DataTable value={pedidos} responsiveLayout="scroll">
        <Column field="id" header="ID" />
        <Column field="mesa" header="Mesa" />
        <Column field="items" header="Items" body={(row) => mostrarItems(row.items)} />
        <Column field="estado" header="Estado" />
      </DataTable>
      <CocinaVista products={pedidos}></CocinaVista>
    </div>
  );
}
