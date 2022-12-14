let logActive = false;

if (currentWebpage.match("index.html") || currentWebpage.match(/\/$/)) {
    var input = document.getElementById('username_field');
    var button = document.getElementById('validation_Username');

    input.addEventListener('input', function () {
        if (this.value.length >= 5) {
            button.classList.add('show');
        }
        else {
            button.classList.remove('show');
        }
    });
}

var logImage = document.getElementById('clicker');
function changeImage() {
    if (logActive == false) {
        if (upgrade5lvl == 1) {
            logImage.style.backgroundImage = "url('../img/log4.png')";
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
}