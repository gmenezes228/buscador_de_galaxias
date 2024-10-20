// Agregar un evento de clic al botón de búsqueda
document.getElementById('btnBuscar').addEventListener('click', function() {
    // Obtener el término de búsqueda ingresado por el usuario
    const terminoBuscar = document.getElementById('inputBuscar').value;
    // Obtener el contenedor donde se mostrarán los resultados
    const contenedor = document.getElementById('contenedor');
    // Limpiar el contenedor de resultados anteriores
    contenedor.innerHTML = '';

    // Verificar que el usuario haya ingresado un término de búsqueda
    if (terminoBuscar) {
        // Construir la URL de la API de la NASA con el término de búsqueda
        const url = `https://images-api.nasa.gov/search?q=${terminoBuscar}`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            // Comprobar si hay elementos en la colección de resultados
            if (data.collection && data.collection.items.length > 0) {
                // Limpiar el contenedor de resultados antes de agregar nuevas tarjetas
                contenedor.innerHTML = ''; 
    
                // Iterar sobre cada elemento de la colección
                data.collection.items.forEach(item => {
                    // Obtener el título, descripción, fecha y URL de la imagen
                    const titulo = item.data[0]?.title || 'Sin título';
                    const descripcion = item.data[0]?.description || 'Sin descripción';
                    const fecha = item.data[0]?.date_created || 'Sin fecha';
                    const imagenUrl = item.links[0]?.href || '';
    
                    // Crear la tarjeta de Bootstrap
                    const card = `
                      <div class="col-md-4 mb-4"> <!-- 3 tarjetas por fila -->
                        <div class="card" style="width: 18rem; margin: 10px;">
                            <img src="${imagenUrl}" class="card-img-top" alt="${titulo}">
                            <div class="card-body">
                                <h5 class="card-title">${titulo}</h5>
                                <p class="card-text">${descripcion}</p>
                                <p><strong>Fecha:</strong> ${fecha}</p>
                                <a href="${imagenUrl}" class="btn btn-primary" target="_blank">Ver imagen</a>
                            </div>
                        </div>
                    `;
    
                    // Agregar la tarjeta al contenedor de resultados
                    contenedor.innerHTML += card;
                });
            } else {
                // Si no hay imágenes, mostrar un mensaje al usuario
                contenedor.innerHTML = '<p>No se encontraron imágenes.</p>';
            }
        })
        .catch(error => {
            // Manejar errores de la solicitud o de la respuesta
            console.error('Error:', error);
            contenedor.innerHTML = '<p>Error al realizar la búsqueda.</p>';
        });
    } else {
        // Si no se ingresó un término de búsqueda, mostrar un mensaje
        contenedor.innerHTML = '<p>Por favor, ingrese un término de búsqueda.</p>';
    }})