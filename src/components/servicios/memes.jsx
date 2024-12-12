const urlBase = "https://memes-api.grye.org";

// Función para obtener memes desde la API
export const obtenerMemes = async (pagina, cantidad) => {
  try {
    const url = `${urlBase}/memes/?page=${pagina}&limit=${cantidad}`;
    const respuesta = await fetch(url);

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Error al obtener memes"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};


export const autenticar = async (usuario, contraseña) => {
  try {
    const respuesta = await fetch(`${urlBase}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({
        username: usuario,
        password: contraseña,
      }).toString(),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Usuario o contraseña incorrectos"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};


export const likeMeme = async (token, memeId) => {
  try {
    if (!token) {
      return [null, "Debes iniciar sesión para dar like a un meme."];
    }

    const url = `${urlBase}/memes/${memeId}`;

    const respuesta = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const { likes } = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Error al dar like a meme"];
    }

    return [likes, null];
  } catch (error) {
    return [null, error.message || "Error al subir meme"];
  }
};

export const registrar = async (usuario, contraseña) => {
  try {
    const respuesta = await fetch(`${urlBase}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({
        username: usuario,
        password: contraseña,
      }).toString(),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Error al registrar usuario"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const subirMeme = async (token, titulo, descripcion, imagen) => {
  try {
    if (!token) {
      return [null, "Debes iniciar sesión para subir un meme."];
    }

    const url = `${urlBase}/memes/?title=${encodeURIComponent(
      titulo,
    )}&description=${encodeURIComponent(descripcion)}`;

    const dataFormulario = new FormData();

    // En el entorno web, se usa el archivo directamente desde el input
    if (imagen) {
      // Verificar si la imagen es un objeto de tipo File (lo que ocurre al seleccionar un archivo en un input)
      if (imagen instanceof File) {
        dataFormulario.append("file", imagen);  // Agregar el archivo a FormData
      } else {
        // Si la imagen es un objeto que contiene un URI (por ejemplo, una URL de imagen), también podrías manejarla así:
        const respuesta = await fetch(imagen);
        const archivoBlob = await respuesta.blob();
        dataFormulario.append("file", archivoBlob, "meme.jpg");
      }
    } else {
      return [null, "No se proporcionó una imagen para subir."];
    }

    // Realizar la solicitud HTTP para subir el meme
    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: dataFormulario,
    });

    if (!respuesta.ok) {
      return [null, "Error al subir meme"];
    }

    return ["Meme subido con éxito!", null];
  } catch (error) {
    return [null, error.message || "Error al subir meme"];
  }
};
