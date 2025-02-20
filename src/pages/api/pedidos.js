// /pages/api/pedidos.js

import { Server } from "socket.io";

let pedidos = []; // Lista en memoria para almacenar los pedidos (puedes usar una base de datos aquí si lo prefieres)

export default function handler(req, res) {
  // Usamos POST para registrar un nuevo pedido
  if (req.method === "POST") {
    const nuevoPedido = req.body;

    // Guardar el pedido (en memoria o base de datos)
    pedidos.push(nuevoPedido);

    // Emitir el pedido a todos los clientes conectados
    // Asegúrate de que tu Socket.io esté inicializado correctamente
    if (res.socket.server.io) {
      res.socket.server.io.emit("pedidoActualizado", nuevoPedido);
    }

    // Responder con éxito
    return res.status(201).json({ message: "Pedido registrado" });
  }

  // Si no es un POST, devolver un método no permitido
  return res.status(405).json({ message: "Método no permitido" });
}
