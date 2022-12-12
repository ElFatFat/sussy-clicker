/*change src of the image on click*/

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

var logImage = document.getElementById('logImg');
    function changeImage() {
        if (logImage.src.match("img/log1.png")) {
            logImage.src = "img/log2.png";
            setTimeout(changeImage, 100);
            console.log("image changed");
        } else {
            logImage.src = "img/log1.png";
            console.log("image reinitialised");
        }
    }
    


if (currentWebpage.match("game.html") || currentWebpage.match(/\/$/)) {
    changeImage();
}