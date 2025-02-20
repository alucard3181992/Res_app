import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function TestPage() {
  const [socket, setSocket] = useState(null);
  const [pedido, setPedido] = useState("");
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const socketInstance = io({ path: "/api/socket" });
    setSocket(socketInstance);

    socketInstance.on("pedido_actualizado", (nuevoPedido) => {
      setPedidos((prev) => [...prev, nuevoPedido]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const enviarPedido = () => {
    if (socket && pedido) {
      socket.emit("nuevo_pedido", pedido);
      setPedido("");
    }
  };

  return (
    <div>
      <h1>Test de WebSockets</h1>
      <input
        type="text"
        value={pedido}
        onChange={(e) => setPedido(e.target.value)}
        placeholder="Nuevo pedido"
      />
      <button onClick={enviarPedido}>Enviar Pedido</button>

      <h2>Pedidos en Cocina:</h2>
      <ul>
        {pedidos.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}
