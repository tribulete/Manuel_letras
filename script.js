async function cargarCSV() {
  const res = await fetch('config.csv');
  const texto = await res.text();
  const lineas = texto.trim().split('\n').slice(1);
  const canciones = lineas.map(linea => {
    const [orden, nombre] = linea.split(';');
    return { orden: Number(orden), nombre, archivo: `${nombre}.md` }; // Generar el nombre del archivo automáticamente
  }).sort((a, b) => a.orden - b.orden);

  const lista = document.getElementById('lista-canciones');
  lista.innerHTML = '';
  canciones.forEach(cancion => {
    const li = document.createElement('li');
    li.textContent = cancion.nombre;
    li.style.cursor = 'pointer';
    li.onclick = () => cargarCancion(cancion.archivo);
    lista.appendChild(li);
  });
}

async function cargarCancion(archivo) {
  const res = await fetch(`canciones/${archivo}`);
  const markdown = await res.text();
  document.getElementById('contenido-cancion').innerHTML = marked.parse(markdown);
}

cargarCSV();
