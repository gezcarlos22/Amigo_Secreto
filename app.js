let amigos = [];
let sorteado = false; // Variable para controlar la visibilidad de la lista

function agregarAmigo() {
    let inputAmigo = document.getElementById('amigo');
    let nombreAmigo = inputAmigo.value.trim(); // Evitar espacios vacíos

    if (!nombreAmigo) {
        alert('Debes ingresar un nombre válido.');
        return;
    }

    amigos.push(nombreAmigo);
    inputAmigo.value = '';
    inputAmigo.focus();
    sorteado = false; // Permitir que la lista se muestre nuevamente
    renderizarAmigos();
    console.log(amigos);
    habilitarBotonesNuevoSorteo()
    habilitarBotonesSorteo();; // Habilitar los botones después de agregar un amigo
}

function renderizarAmigos() {
    let listaAmigos = document.getElementById('listaAmigos');
    
    // Despues del primer sorteo, la lista desaparece
    if (sorteado) {
        listaAmigos.style.display = "none";
        return;
    }

    listaAmigos.style.display = "block"; // Mostrar la lista si hay amigos y aún no se ha sorteado
    listaAmigos.innerHTML = '';

    amigos.forEach((amigo, index) => {
        let li = document.createElement('li');
        li.textContent = amigo;
        li.style.padding= "5px";

        // Botón para eliminar manualmente un amigo
        let btnEliminar = document.createElement('button');
        btnEliminar.textContent = "❌";
        btnEliminar.style.fontSize = "15px";
        btnEliminar.style.padding = "7px";
    
        btnEliminar.style.marginLeft = "20px";
        btnEliminar.onclick = function () {
            eliminarAmigo(index);
        };

        li.appendChild(btnEliminar);
        listaAmigos.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    renderizarAmigos();
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert('Debes agregar al menos un amigo para continuar.');
        return;
    }

    let indiceSorteado = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos[indiceSorteado];

    // Eliminar al amigo sorteado del array
    amigos.splice(indiceSorteado, 1);

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = "Tu amigo secreto es: " + amigoSorteado;

    
    sorteado = true;
    renderizarAmigos(); 
    deshabilitarBotonesSorteo(); // Deshabilitar los botones después del sorteo
}

function nuevoSorteo() {
    if (confirm("¿Seguro que quieres borrar la lista de amigos y comenzar un nuevo sorteo?")) {
        amigos = []; // Vaciar la lista de amigos
        sorteado = false; // Permitir que la lista se muestre nuevamente
        document.getElementById('resultado').innerHTML = ''; // Limpiar el resultado
        renderizarAmigos(); // Mostrar la lista vacía
        deshabilitarBotonesNuevoSorteo()
        deshabilitarBotonesSorteo(); // Deshabilitar los botones después de reiniciar
    }
}

function habilitarBotonesSorteo() {
    document.querySelector('.button-draw').disabled = false;
}
function habilitarBotonesNuevoSorteo() {
    document.querySelector('.button-new-draw').disabled = false;
}

function deshabilitarBotonesSorteo() {
    document.querySelector('.button-draw').disabled = true;
}

function deshabilitarBotonesNuevoSorteo() {
    document.querySelector('.button-new-draw').disabled = true;
}
// Deshabilitar los botones al cargar la página
deshabilitarBotonesSorteo();
deshabilitarBotonesNuevoSorteo();