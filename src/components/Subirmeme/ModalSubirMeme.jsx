import React, { useState, useContext } from "react";
import { ContextoAutenticacion } from "../contexto/contextoAutenticacion";
import { subirMeme } from "../servicios/memes";
import "./EstilosModalSubirMeme.css"; // Asegúrate de tener este archivo CSS

const ModalSubirMeme = ({ visible, actualizaVisibilidad, actualizarMemes }) => {
  const { credenciales, estaAutenticado } = useContext(ContextoAutenticacion);

  const [titulo, actualizaTitulo] = useState("");
  const [descripcion, actualizaDescripcion] = useState("");
  const [imagen, actualizaImagen] = useState(null);
  const [nombreImagen, setNombreImagen] = useState("");

  const eligeImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      actualizaImagen(archivo);
      setNombreImagen(archivo.name);
    }
  };

  const manejaSubida = () => {
    if (!imagen || !titulo || !descripcion) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    if (!estaAutenticado || !credenciales) {
      alert("Debe iniciar sesión para subir memes.");
      return;
    }
    subirMeme(credenciales.access_token, titulo, descripcion, imagen).then(
      ([_, error]) => {
        if (error) {
          alert(error);
          return;
        }
        actualizaVisibilidad(false);
        actualizarMemes();
      }
    );
  };

  if (!visible) return null;

  return (
    <div className="fondo-modal">
      <div className="modal_subir">
        <div className="barra_top">
          <div></div>
          <h2 className="texto_inicia">Subir Meme</h2>
          <button onClick={() => actualizaVisibilidad(false)} className="boton_cerrar">
            X
          </button>
        </div>

        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => actualizaTitulo(e.target.value)}
          className="entrada_sesion"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => actualizaDescripcion(e.target.value)}
          className="entrada_sesion"
        />

        <div>
          {/* Input de tipo file con botón personalizado */}
         
          <input
            id="imagen"
            type="file"
            accept="image/*"
            onChange={eligeImagen}
            className="entrada-imagen"
            hidden
          />
          
        </div>
        <div>
          
        </div>
        <button onClick={manejaSubida} className="boton_login">
          Subir
        </button>
      </div>
    </div>
  );
};

export default ModalSubirMeme;
