async function cargarCSV() {
  const res = await fetch('config.csv');
  const texto = await res.text();
  const lineas = texto.trim().split('\n').slice(1);
  const canciones = lineas.map(linea => {
    const [orden, nombre, tiempo] = linea.split(';');
    return { orden: Number(orden), nombre, archivo: `${nombre}.md`, tiempo: Number(tiempo) };
  }).sort((a, b) => a.orden - b.orden);

  const lista = document.getElementById('lista-canciones');
  lista.innerHTML = '';
  canciones.forEach(cancion => {
    const li = document.createElement('li');
    li.textContent = cancion.nombre;
    li.style.cursor = 'pointer';
    li.onclick = () => cargarCancion(cancion.archivo, cancion.tiempo);
    lista.appendChild(li);
  });
}

async function cargarCancion(archivo, tiempo) {
  const res = await fetch(`canciones/${archivo}`);
  const markdown = await res.text();
  const contenido = document.getElementById('contenido-cancion');
  contenido.innerHTML = marked.parse(markdown);

  // Desplazamiento automáticor   
  contenido.scrollTo(0, 0); // Reinicia el scroll al inicio
  const totalHeight = contenido.scrollHeight - contenido.clientHeight;
  const step = totalHeight / (tiempo * 60); // Calcula el paso por frame (60 FPS)

  let currentScroll = 0;
  const interval = setInterval(() => {
    currentScroll += step;
    contenido.scrollTo(0, currentScroll);

    if (currentScroll >= totalHeight) {
      clearInterval(interval); // Detén el desplazamiento al final
    }
  }, 1000 / 60); // 60 FPS
}

cargarCSV();