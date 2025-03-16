
function showCategory(category) {

    var categories = document.querySelectorAll('.category');
    categories.forEach(function(cat) {
        cat.style.display = 'none';
    });

    document.getElementById(category).style.display = 'block';
}

function showCategoryFromHash() {
    var hash = window.location.hash.substring(1); 
    if (hash) {
        showCategory(hash);
    }
}

function openModal() {
    document.getElementById('modal').classList.remove('hidden');
  }
  
  function closeModal() {
    document.getElementById('modal').classList.add('hidden');
  }

