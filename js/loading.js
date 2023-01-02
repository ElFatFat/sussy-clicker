
//References aux éléments HTML
let imageContainerElement = document.getElementById("scrollUpgrade");
let loadingElement = document.getElementById("loading");
let loadingBarElement = document.getElementById("loadingBar");
let loadingBarFillElement = document.getElementById("loadingBarFill");
let loadingTextElement = document.getElementById("loadingText");

//Variables pour compter le nombre d'images chargées et le nombre d'images à charger
let sizeToPreload;
let loaded;

//On crée un tableau qui contiendra les images à charger
var imagesToPreload = new Array();
//Fonction qui permet de charger les images
function preload() {
    //SizeToPreload est égal au nombre d'images à charger
    sizeToPreload = preload.arguments.length;
    loaded = 0;
    //On parcourt le tableau d'images à charger
    for (i = 0; i < preload.arguments.length; i++) {
        //On crée une nouvelle image et on l'ajoute au tableau
        imagesToPreload[i] = new Image();
        //On charge l'image
        imagesToPreload[i].src = preload.arguments[i];
        //On ajoute un évènement qui se déclenche lorsque l'image est chargée
        imagesToPreload[i].onload = function () {
            //On incrémente le nombre d'images chargées
            loaded++;
            //On actualise la barre de chargement
            actualizeLoadingBar();
            //Si toutes les images sont chargées, on fait disparaitre la barre de chargement
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

//On définit les images à charger
preload(
    "img/bg.png", // 0
    "img/log1.png", // 1
    "img/log2.png", // 2
    "img/log3.png", // 3
    "img/log4.png",  // 4
    "img/achievement.png", // 5
    "img/scoreboard.png", // 6
    "img/save.svg", // 7
    "img/succes.svg", // 8
    "img/fail.svg", // 9

);

//Fonction qui actualise la barre de chargement
function actualizeLoadingBar(){
    loadingBarFillElement.style.width = (loaded/sizeToPreload)*100 + "%";
    loadingTextElement.innerHTML = Math.round((loaded/sizeToPreload)*100) + "% - Chargement...";
}

//Fonction qui applique les images chargées
function applyImages(){
    document.getElementById("body").style.backgroundImage = "url('"+imagesToPreload[0].src+"')";
    document.getElementById("clicker").style.backgroundImage = "url('"+imagesToPreload[1].src+"')";
    document.getElementById("gameIcon").src = imagesToPreload[6].src;
}