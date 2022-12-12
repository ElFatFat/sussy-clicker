var input = document.getElementById('username_field');
var button = document.getElementById('validation_Username');

input.addEventListener('input', function() {
    if (this.value.length >= 5 ) {
        button.classList.add('show');
    } 
    else {
        button.classList.remove('show');
    }
    });
    
    function longueur(chaine) {
        return chaine.length;
    }