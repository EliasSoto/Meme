import React, { useState, useContext } from "react";
import { ContextoAutenticacion } from "../contexto/contextoAutenticacion";
import "./EstilosmodalAutenticacion.css";

const ModalAutenticacion = ({ visible, actualizaVisibilidad }) => {
  const [usuario, actualizaUsuario] = useState("");
  const [contraseña, actualizaContraseña] = useState("");

  const { autenticarUsuario } = useContext(ContextoAutenticacion);

  const manejarEnvio = async () => {
    if (!usuario || !contraseña) {
      alert("Por favor, completa ambos campos.");
      return;
    }
  
    const esExitoso = await autenticarUsuario(usuario, contraseña);
    if (esExitoso) {
      actualizaVisibilidad(false);
      alert("Autenticación exitosa");
    } else {
      alert("Autenticación fallida");
    }
  };
  

  if (!visible) return null;

  return (
    <div className="fondo-modal">
      <div className="modal_ingresar">
        <div className="barra_top">
          <div ></div>
        <h2 className="texto_inicia">Iniciar Sesión</h2>

        <button onClick={() => actualizaVisibilidad(false)} className="boton_cerrar">
          X
        </button>
     
        </div>

       
        
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
          value={contraseña}
          onChange={(e) => actualizaContraseña(e.target.value)}
          className="entrada_sesion"
        />
        <div>
        <button onClick={manejarEnvio} className="boton_login">
          Iniciar Sesión
        </button>
       

        </div>
        
      </div>
    </div>
  );
};

export default ModalAutenticacion;