document.addEventListener('DOMContentLoaded', function() {
    // El array de letras posibles
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // Obteniendo los elementos del DOM
    const letraAleatoriaDisplay = document.getElementById('letraAleatoria');
    const textoUsuarioInput = document.getElementById('textoUsuario');
    const verificarBtn = document.getElementById('verificarBtn');
    const nuevaLetraBtn = document.getElementById('nuevaLetraBtn');
    const resultadoDisplay = document.getElementById('resultado');

    let letraCorrecta = ''; // Variable para almacenar la letra correcta actual

    // Función para asignar una nueva letra aleatoria
    function asignarLetraAleatoria() {
        const indiceAleatorio = Math.floor(Math.random() * letras.length);
        letraCorrecta = letras[indiceAleatorio];
        letraAleatoriaDisplay.textContent = letraCorrecta;

        // Limpiar el resultado anterior y el campo de entrada
        resultadoDisplay.textContent = '';
        resultadoDisplay.className = ''; // Limpiar clases de color (correct/incorrect)
        if (textoUsuarioInput) {
            textoUsuarioInput.value = '';
            textoUsuarioInput.focus(); // Poner el foco en el campo de entrada
        }
    }

    // Función para comparar la letra ingresada por el usuario con la letra correcta
    function compararLetras() {
        if (!textoUsuarioInput) {
            resultadoDisplay.textContent = "Error: Campo de entrada no encontrado.";
            resultadoDisplay.className = 'incorrect';
            return;
        }

        const intentoUsuario = textoUsuarioInput.value.toUpperCase(); // Convertir a mayúscula para la comparación

        if (intentoUsuario === '') {
            resultadoDisplay.textContent = 'Por favor, ingresa una letra.';
            resultadoDisplay.className = 'incorrect';
            return;
        }

        if (intentoUsuario.length > 1) {
            resultadoDisplay.textContent = 'Por favor, ingresa solo una letra.';
            resultadoDisplay.className = 'incorrect';
            textoUsuarioInput.value = intentoUsuario.charAt(0); // Opcional: dejar solo la primera letra
            return;
        }

        if (intentoUsuario === letraCorrecta) {
            resultadoDisplay.textContent = '¡Correcto! La letra era ' + letraCorrecta + '.';
            resultadoDisplay.className = 'correct'; // Clase para color verde
            // Opcional: cargar una nueva letra automáticamente después de un acierto
            setTimeout(asignarLetraAleatoria, 1500); // Espera 1.5 segundos
        } else {
            resultadoDisplay.textContent = 'Incorrecto. La letra no es "' + intentoUsuario + '". Intenta de nuevo.';
            resultadoDisplay.className = 'incorrect'; // Clase para color rojo
            if (textoUsuarioInput) {
                textoUsuarioInput.select(); // Seleccionar el texto para facilitar la corrección
            }
        }
    }

    // --- Asignación de Eventos ---

    // Event listener para el botón "Verificar"
    if (verificarBtn) {
        verificarBtn.addEventListener('click', compararLetras);
    } else {
        console.error("El botón con id 'verificarBtn' no fue encontrado.");
    }

    // Event listener para el botón "Nueva Letra"
    if (nuevaLetraBtn) {
        nuevaLetraBtn.addEventListener('click', asignarLetraAleatoria);
    } else {
        console.error("El botón con id 'nuevaLetraBtn' no fue encontrado.");
    }

    // Event listener para la tecla "Enter" en el campo de texto
    if (textoUsuarioInput) {
        textoUsuarioInput.addEventListener('keypress', function(event) {
            // 'Enter' tiene el código 13 o la propiedad key 'Enter'
            if (event.key === 'Enter') {
                event.preventDefault(); // Evitar el comportamiento por defecto del Enter (si estuviera en un form)
                compararLetras();
            }
        });

        // Opcional: Convertir a mayúsculas mientras se escribe
        textoUsuarioInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });

    } else {
        console.error("El campo de entrada con id 'textoUsuario' no se encontró.");
    }

    // --- Inicialización del juego ---
    // Asignar la primera letra cuando la página y el script se hayan cargado completamente
    asignarLetraAleatoria();
});
