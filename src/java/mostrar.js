document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.substring(1); // Obtiene el hash de la URL
    if (hash) {
        const cuadro = document.getElementById(hash);
        if (cuadro) {
            cuadro.classList.remove('hidden'); // Muestra el cuadro
        }
    }
});