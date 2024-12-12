import React from 'react';
import './EstilosImagenModal.css';  // Asegúrate de importar los estilos adecuados

const ModalImagen = ({ visible, actualizaVisibilidad, urlImagen }) => {
  if (!visible) return null;  // Si el modal no está visible, no se renderiza

  return (
    <div className="modal-overlay" onClick={() => actualizaVisibilidad(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={() => actualizaVisibilidad(false)}>
          Cerrar
        </button>
        <img src={urlImagen} alt="Imagen seleccionada" className="full-screen-image" />
      </div>
    </div>
  );
};

export default ModalImagen;
