let imageContainerElement = document.getElementById("scrollUpgrade");
let loadingElement = document.getElementById("loading");
let loadingBarElement = document.getElementById("loadingBar");
let loadingBarFillElement = document.getElementById("loadingBarFill");
let loadingTextElement = document.getElementById("loadingText");

let sizeToPreload;
let loaded;

var imagesToPreload = new Array();
function preload() {
    sizeToPreload = preload.arguments.length;
    loaded = 0;
    console.log("Preloading images...");
    for (i = 0; i < preload.arguments.length; i++) {
        imagesToPreload[i] = new Image();
        imagesToPreload[i].src = preload.arguments[i];
        imagesToPreload[i].onload = function () {
            console.log("Preloaded " + this.src);
            // let imageElement = document.createElement("img");
            // imageElement.src = this.src;
            // imageContainerElement.appendChild(imageElement);
            loaded++;
            actualizeLoadingBar();
            if (loaded == sizeToPreload) {
                applyImages();
                loadingElement.style.opacity = 0;
                setTimeout(() => {
                    loadingElement.style.display = "none";
                }, 1000);
            }
        }
    }
}

preload(
    "img/bg.png", // 0
    "img/log1.png", // 1
    "img/log2.png", // 2
    "img/log3.png", // 3
    "img/log4.png",  // 4
    "img/achievement.png", // 5
    "img/scoreboard.png", // 6
);

function actualizeLoadingBar(){
    loadingBarFillElement.style.width = (loaded/sizeToPreload)*100 + "%";
    loadingTextElement.innerHTML = Math.round((loaded/sizeToPreload)*100) + "% - Chargement...";
}

function applyImages(){
    document.getElementById("body").style.backgroundImage = "url('"+imagesToPreload[0].src+"')";
    document.getElementById("clicker").style.backgroundImage = "url('"+imagesToPreload[1].src+"')";
    // document.getElementById("achievement").src = imagesToPreload[5].src;
    document.getElementById("gameIcon").src = imagesToPreload[6].src;
}