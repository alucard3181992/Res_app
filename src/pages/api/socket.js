import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Inicializando WebSockets...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("Cliente conectado:", socket.id);

      // Escuchar cuando se envía un nuevo pedido
      socket.on("nuevo_pedido", (pedido) => {
        console.log("Nuevo pedido recibido:", pedido);

        // Enviar el pedido a todos los clientes conectados (cocina)
        io.emit("pedido_actualizado", pedido);
      });

      socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
