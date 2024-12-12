import React, { useState } from "react";
import "./EstilosModalRegistro.css"; // Asegúrate de crear este archivo CSS
import { registrar } from "../servicios/memes";

const ModalRegistro = ({ visible, actualizaVisibilidad }) => {
  const [usuario, actualizaUsuario] = useState("");
  const [contraceña, actualizaContraceña] = useState("");
  const [confirmaContraceña, actualizaConfirmaContraceña] = useState("");
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const [cargando, setCargando] = useState(false); // Estado para manejar el estado de carga

  const manejaEnvio = async () => {
    if (usuario.trim() === "" || contraceña.trim() === "" || confirmaContraceña.trim() === "") {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    if (contraceña !== confirmaContraceña) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setCargando(true); // Activar el estado de carga

    const [_, error] = await registrar(usuario, contraceña);
    setCargando(false); // Desactivar el estado de carga

    if (error) {
      setError(error); // Mostrar el error de registro
      return;
    }

    alert("Usuario registrado correctamente");
    actualizaVisibilidad(false);
  };

  if (!visible) return null;

  return (
    <div className="fondo-modal">
      <div className="modal_registrar">

      <div className="barra_top">
          <div ></div>
          <h2 className="texto_registro">Registro</h2>

        <button onClick={() => actualizaVisibilidad(false)} className="boton_cerrar">
          X
        </button>
     
        </div>

        
        
        {/* Mostrar error si existe */}
        {error && <div className="error-message">{error}</div>}
        
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => actualizaUsuario(e.target.value)}
          className="entrada_sesion"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraceña}
          onChange={(e) => actualizaContraceña(e.target.value)}
          className="entrada_sesion"
        />
        <input
          type="password"
          placeholder="Repite la contraseña"
          value={confirmaContraceña}
          onChange={(e) => actualizaConfirmaContraceña(e.target.value)}
          className="entrada_sesion"
        />
        <button onClick={manejaEnvio} className="boton_login" disabled={cargando}>
          {cargando ? "Registrando..." : "Enviar"}
        </button>
        
      </div>
    </div>
  );
};

export default ModalRegistro;
