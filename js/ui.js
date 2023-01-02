let logActive = false;
var logImage = document.getElementById('clicker');

//On vérifie que l'on est bien sur la page d'index
if (currentWebpage.match("index.html") || currentWebpage.match(/\/$/)) {
    var input = document.getElementById('username_field');
    var button = document.getElementById('validation_Username');

    //Si l'utilisateur rentre un nom d'utilisateur de plus de 5 caractères, on affiche le bouton
    input.addEventListener('input', function () {
        if (this.value.length >= 5) {
            button.classList.add('show');
        }
        else {
            button.classList.remove('show');
        }
    });
}

//Fonction qui permet l'animation de la buche lors du clic
function changeImage() {
    if (logActive == false) {
        if (upgrade5lvl == 1) {
            logImage.style.backgroundImage = "url('../img/log4.png')";
            shakeScreen();
        }
        else {
            logImage.style.backgroundImage = "url('../img/log2.png')";
        }
        setTimeout(changeImage, 200);
        logActive = true;
    } else {
        if (upgrade5lvl == 1) {
            logImage.style.backgroundImage = "url('../img/log3.png')";
            
        }
        else {
            logImage.style.backgroundImage = "url('../img/log1.png')";
        }
        logActive = false;
    }
}

