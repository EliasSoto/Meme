import { useState, useEffect } from "react";
import { obtenerMemes } from "../servicios/memes";

const useMemes = () => {
  const [memes, actualizaMemes] = useState([]);
  const [estaCargando, actualizaEstaCargando] = useState(false);
  const [pagina, actualizaPagina] = useState(1);
  const [hayMas, actualizaHayMas] = useState(true);

  const cargarMemes = (pagina) => {
    if (!hayMas) {
      actualizaEstaCargando(false);
      return;
    }

    actualizaEstaCargando(true);
    obtenerMemes(pagina, 10)
      .then(([data, error]) => {
        if (error) {
          console.error(error);
          actualizaEstaCargando(false);
          return;
        }

        if (data.length < 10) {
          actualizaHayMas(false);
        }

        if (data.length) {
          actualizaMemes((prevMemes) => [...prevMemes, ...data]);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => actualizaEstaCargando(false));
  };

  const actualizarMemes = () => {
    actualizaMemes([]);
    actualizaHayMas(true);
    actualizaPagina(1);
    cargarMemes(1);
  };

  const cargarMasMemes = () => {
    if (hayMas && !estaCargando) {
      actualizaPagina((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    cargarMemes(pagina);
  }, [pagina]);

  return { memes, estaCargando, cargarMasMemes, actualizarMemes };
};

export default useMemes;
