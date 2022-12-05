//Vérification de l'existence d'une sauvegarde selon la page dans laquelle l'utilisateur est.
let currentWebpage = window.location.pathname;
if (currentWebpage.includes("index.html") || currentWebpage.match(/\/$/)) {
    //Page de connexion
    if (localStorage.getItem("username") == null) {
        //On s'assure que le localStorage est bien vide
        deleteSave();
        //TODO Choisir son nom
        console.log("Premiere connexion");
    } else {
        //TODO Popup "session déjà existante !"
    }
} else if (currentWebpage.includes("game.html")) {
    test();
    //Page de jeu
} else {
    //Page autre
    console.log("Page inconnue");
}

function createSave(username) {
    localStorage.setItem("username", username);
    localStorage.setItem("money", 0);
    localStorage.setItem("upgrade1lvl", 0);
    localStorage.setItem("upgrade2lvl", 0);
    localStorage.setItem("upgrade3lvl", 0);
    localStorage.setItem("elapsedTime", 0);
    localStorage.setItem("")
}

function deleteSave() {
    localStorage.clear();
}

function save() {
    localStorage.setItem("username", username);
    localStorage.setItem("money", money);
    localStorage.setItem("upgrade1lvl", upgrade1lvl);
    localStorage.setItem("upgrade2lvl", 0);
    localStorage.setItem("upgrade3lvl", 0);
    localStorage.setItem("elapsedTime", 0);
}

function validateUsername() {
    let username = document.getElementById("username_field").value;
    if (username != "") {
        createSession(username);
        window.location.href = "scoreboard.html";
    } else {
        alert("Veuillez entrer un nom d'utilisateur");
    }
}
