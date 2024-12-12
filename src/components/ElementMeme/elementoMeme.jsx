import { useState, useContext } from "react";
import { ContextoAutenticacion } from "../contexto/contextoAutenticacion";
import { likeMeme } from "../servicios/memes";
import "./EstilosElementoMeme.css";

function ElementoMeme({ meme, manejarPresionarImagen }) {
  const { credenciales, estaAutenticado } = useContext(ContextoAutenticacion);
  const [likes, actualizaLikes] = useState(meme.likes);

  const manejarLike = () => {
    if (!estaAutenticado || !credenciales) {
      alert("Debe iniciar sesión para dar me gusta.");
      return;
    }

    likeMeme(credenciales.access_token, meme._id).then(
      ([nuevosLikes, error]) => {
        if (error) {
          alert(error);
          return;
        }

        actualizaLikes(nuevosLikes);
      },
    );
  };

  return (
    <div className="contenedorMeme">
      <div className="top_meme">
      <h2 className="titulo">{meme.title}</h2>
      <p className="descripcion">{meme.description}</p>
      </div>
      
      <img
        src={meme.img_url}
        alt={meme.title}
        className="imagen"
        onClick={() => manejarPresionarImagen(meme.img_url)}
      />
      <div className="cierreSeccion">
        <button className="meGusta" onClick={manejarLike}>
          <span className="corazon">❤️</span> {likes}
        </button>
        <span className="usuario">{meme.user}</span>
      </div>
    </div>
  );
}

export default ElementoMeme;
