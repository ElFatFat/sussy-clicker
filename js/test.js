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

/*change src of the image on click*/

function changeImage() {
    var logImage = document.getElementById('logImg');
    if (logImage.src = "log1.png") {
        logImage.src = "log2.png";
    } else {
        logImage.src = "log1.png";
    }
}

