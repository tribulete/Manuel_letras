document.addEventListener('DOMContentLoaded', () => {
  fetch('config.csv')
    .then(response => response.text())
    .then(data => {
      const lineas = data.trim().split('\n');
      const encabezado = lineas.shift().split(';'); // Ignoramos la cabecera: orden;nombre;tiempo

      const canciones = lineas.map(linea => {
        const campos = linea.split(';');
        const orden = parseInt(campos[0], 10);
        const nombre = campos[1];
        const tiempo = parseInt(campos[2], 10); // Se ignora por ahora
        const archivo = `${nombre}.md`; // Construimos el nombre del fichero

        return { orden, nombre, archivo };
      });

      // Ordenamos por el campo 'orden'
      canciones.sort((a, b) => a.orden - b.orden);

      // Mostramos la lista de canciones en el HTML
      const lista = document.getElementById('lista-canciones');
      canciones.forEach(cancion => {
        const li = document.createElement('li');
        const enlace = document.createElement('a');
        enlace.href = `cancion.html?archivo=${encodeURIComponent(cancion.archivo)}`;
        enlace.textContent = cancion.nombre.replace(/_/g, ' '); // Para mostrarlo más legible
        li.appendChild(enlace);
        lista.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error al cargar config.csv:', error);
    });
});
