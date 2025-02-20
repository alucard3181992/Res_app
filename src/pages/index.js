import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [hovered, setHovered] = useState(null);

  return (
    <div className="home-container">
      <style jsx>{`
        .home-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 90vh;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* Fondo con animación de luces */
        .home-container::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 165, 0, 0.2), transparent);
          animation: moveLights 6s infinite linear;
        }

        @keyframes moveLights {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        h1 {
          font-size: 3.5rem;
          margin-bottom: 30px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #222;
          text-shadow: 3px 3px 10px rgba(255, 165, 0, 0.6);
        }

        .buttons {
          display: flex;
          gap: 30px;
        }

        .button {
          padding: 25px 50px;
          font-size: 1.8rem;
          font-weight: bold;
          text-align: center;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          width: 220px;
          text-transform: uppercase;
          border: none;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }

        /* Botón Caja */
        .caja {
          background: linear-gradient(135deg, #ff416c, #ff4b2b);
          color: #fff;
        }

        /* Botón Cocina */
        .cocina {
          background: linear-gradient(135deg, #1e90ff, #00c6ff);
          color: #fff;
        }

        /* Efecto de resplandor al pasar el mouse */
        .button:hover {
          transform: scale(1.1);
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.3);
        }

        .button::before {
          content: "";
          position: absolute;
          width: 400%;
          height: 400%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent);
          top: -100%;
          left: -100%;
          transition: all 0.3s ease-in-out;
        }

        .button:hover::before {
          top: 0;
          left: 0;
        }

        /* Animación de rebote al hacer clic */
        .button:active {
          transform: scale(0.95);
        }

      `}</style>

      <h1>🍽️ Sistema de Pedidos</h1>
      <div className="buttons">
        <button
          className="button caja"
          onClick={() => router.push("/caja")}
          onMouseEnter={() => setHovered("caja")}
          onMouseLeave={() => setHovered(null)}
        >
           Caja
        </button>
        <button
          className="button cocina"
          onClick={() => router.push("/cocina")}
          onMouseEnter={() => setHovered("cocina")}
          onMouseLeave={() => setHovered(null)}
        >
           Cocina
        </button>
      </div>
    </div>
  );
}
