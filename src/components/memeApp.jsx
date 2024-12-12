import React, { useState, useEffect, useContext, useRef } from "react";
import Titulo from "./Titulo";
import ElementoMeme from "./ElementMeme/elementoMeme";
import ModalAutenticacion from "./Auntenticacion/modalAutenticacion";
import ModalRegistro from "./Registro/modalRegistro";
import ModalSubirMeme from "./Subirmeme/ModalSubirMeme";
import ModalImagen from "./ModalImagen/modalImagen";
import { ContextoAutenticacion } from "./contexto/contextoAutenticacion";
import useMemes from "./hooks/useMemes";
import "./EstilosInicio.css";

const MemeApp = () => {
  const { estaAutenticado } = useContext(ContextoAutenticacion);
  const { memes, estaCargando, cargarMasMemes, actualizarMemes } = useMemes();
  
  // Estado para el orden de los memes (por likes o por fecha)
  const [orden, setOrden] = useState("new");  // "top" o "new"

  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [modalImagenVisible, setModalImagenVisible] = useState(false);
  const [modalSubirMemeVisible, setModalSubirMemeVisible] = useState(false);
  const [modalRegistroVisible, setModalRegistroVisible] = useState(false);
  const [modalAutenticacionVisible, setModalAutenticacionVisible] = useState(false);

  const scrollRef = useRef();

  const manejarPresionarImagen = (imgUrl) => {
    setImagenSeleccionada(imgUrl);
    setModalImagenVisible(true);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop - clientHeight <= 100 && !estaCargando) {
      cargarMasMemes();
    }
  };

  useEffect(() => {
    if (!estaCargando) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [estaCargando]);

  // Eliminar duplicados y ordenar los memes según el estado "orden"
  const memesUnicos = React.useMemo(() => {
    const memesOrdenados = [...memes];
    if (orden === "top") {
      memesOrdenados.sort((a, b) => b.likes - a.likes);  // Ordenar por likes
    } else if (orden === "new") {
      memesOrdenados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));  // Ordenar por fecha
    }
    return Array.from(new Map(memesOrdenados.map((meme) => [meme._id, meme])).values());
  }, [memes, orden]);

  // Actualizar el orden cuando el usuario cambie la selección
  const manejarCambioOrden = (e) => {
    setOrden(e.target.value);
  };

  return (
    <div className="contenedor">
      <div className="titulo-contenedor">
      <h1 className="titulo_meme">Memes</h1>
        <div className="botones-titulo">
        
          <select className="select" onChange={manejarCambioOrden} value={orden} aria-label="Ordenar memes">
            <option value="top">Más likes</option>
            <option value="new">Más recientes</option>
          </select>
          {estaAutenticado ? (
            <button className="boton_top" onClick={() => setModalSubirMemeVisible(true)} aria-label="Subir Meme">
              Subir Meme
            </button>
          ) : (
            <>
              <button className="boton_top" onClick={() => setModalAutenticacionVisible(true)} aria-label="Ingresar">
                Ingresar
              </button>
              <button className="boton_top" onClick={() => setModalRegistroVisible(true)} aria-label="Registrarse">
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>


      <div ref={scrollRef}>
  {memesUnicos
    .map((meme, index) => {
      // Agrupar los memes en pares
      if (index % 2 === 0) {
        return memesUnicos.slice(index, index + 2);  // Toma dos memes en cada iteración
      }
      return null;  // Evita que los memes individuales se repitan
    })
    .filter(Boolean)  // Filtrar los valores null
    .map((parDeMemes, index) => (
      <div key={index} className="fila-memes">
        {parDeMemes.map((meme) => (
          <ElementoMeme
            key={meme._id}
            meme={meme}
            manejarPresionarImagen={manejarPresionarImagen}
          />
        ))}
      </div>
    ))}
  {estaCargando && <div className="loader">Cargando...</div>}
</div>

      {/* Modales */}
      <ModalAutenticacion
        visible={modalAutenticacionVisible}
        actualizaVisibilidad={setModalAutenticacionVisible}
      />

      <ModalRegistro
        visible={modalRegistroVisible}
        actualizaVisibilidad={setModalRegistroVisible}
      />

      <ModalSubirMeme
        visible={modalSubirMemeVisible}
        actualizaVisibilidad={setModalSubirMemeVisible}
        actualizarMemes={actualizarMemes}
      />

      <ModalImagen
        urlImagen={imagenSeleccionada}
        visible={modalImagenVisible}
        actualizaVisibilidad={setModalImagenVisible}
      />
    </div>
  );
};

export default MemeApp;
