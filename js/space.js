// Obtiene el botón de búsqueda, el campo de entrada y el contenedor de resultados del DOM
const buscarButton = document.getElementById("btnBuscar");
const busquedaInput = document.getElementById("inputBuscar");
const resultadosContenedor = document.getElementById("contenedor");

// Agrega un evento de clic al botón de búsqueda
buscarButton.addEventListener("click", () => {
  // Limpia el contenedor de resultados para mostrar nuevos resultados
  resultadosContenedor.innerHTML = "";

  // Construye la URL de la API usando el valor ingresado en el campo de búsqueda
  const apiUrl = `https://images-api.nasa.gov/search?q=${busquedaInput.value}`;
  
  // Realiza la solicitud a la API
  fetch(apiUrl)
    .then((respuesta) => {
      // Convierte la respuesta a formato JSON
      return respuesta.json();
    })
    .then((datos) => {
      // Recorre cada elemento en la colección de datos recibidos
      datos.collection.items.forEach((elemento) => {
        console.log(elemento); // Muestra el elemento en la consola para depuración
        
        // Crea un nuevo artículo para mostrar los resultados
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card", "bg-dark"); // Añade clases para el estilo de la tarjeta

        // Configura el contenido HTML de la tarjeta con los datos de la imagen
        tarjeta.innerHTML = `
            <img src="${elemento.links[0].href}" class="card-img-top" alt="${elemento.data[0].title}">
            <div class="card-body">
                <h5 class="card-title">${elemento.data[0].title}</h5> <!-- Título de la imagen -->
                <p class="card-text">${elemento.data[0].description}</p> <!-- Descripción de la imagen -->
                <p class="card-footer"><small class="text-muted">${elemento.data[0].date_created}</small></p> <!-- Fecha de creación -->
            </div>
          `;
        
        // Añade la tarjeta al contenedor de resultados
        resultadosContenedor.appendChild(tarjeta);
      });
    })
    .catch((error) => {
      // Manejo de errores en caso de que la solicitud falle
      console.error("Error al obtener los datos:", error);
    });
});
