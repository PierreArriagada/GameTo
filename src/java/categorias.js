function showCategory(category) {
    // Ocultar todas las categorías
    var categories = document.querySelectorAll('.category');
    categories.forEach(function(cat) {
        cat.style.display = 'none';
    });
    // Mostrar la categoría seleccionada
    document.getElementById(category).style.display = 'block';
}