// ################### FICHIER DE GESTION DES DONNEES (VARIABLES/SAUVEGARDES) ###################
// ################### VARIABLES ###################
var username;
var money;
var upgrade1lvl;
var upgrade2lvl;
var upgrade3lvl;
var elapsedTime;
var highscore;
var alltimeClicks;
var alltimeMoney;
var alltimeSpent;
var alltimeHighscore;
var clicksPerSecondLatest;
var moneyPerSecondLatest;
var upgrade1DefaultPrice = 100;
var upgrade2DefaultPrice = 100;
var upgrade3DefaultPrice = 10000;
var upgrade1Price;
var upgrade2Price;
var upgrade3Price;
var upgrade1Unlocked = false;
var upgrade2Unlocked = false;
var upgrade3Unlocked = false;
//Nom de la page actuelle
var currentWebpage = window.location.pathname;
//Référence pour afficher le popup sur la page index.html lorsque qu'une sauvegarde est trouvée
var usernameFoundElement = document.getElementById("usernameFound");
var moneyFoundElement = document.getElementById("moneyFound");
var debugDataElement = document.getElementById("debugData");
var popupSaveDataFoundElement = document.getElementById("popupSaveDataFound");
//Référence pour récupérer le nom d'utilisateur entré dans le champ de texte
var usernameFieldElement = document.getElementById("username_field");
//Vérification de l'existence d'une sauvegarde selon la page dans laquelle l'utilisateur est.
//On vérifie que l'on est sur la page /index.html ou / (racine du site)
if (currentWebpage.match("index.html") || currentWebpage.match(/\/$/)) {
    //Verification que les données de sauvegarde existent et affichage du popup si c'est le cas
    if (checkSaveValidity()) {
        //Vérifie que les éléments sont bien chargés (exigé par Typescript)
        if (usernameFoundElement != null &&
            moneyFoundElement != null &&
            debugDataElement != null &&
            popupSaveDataFoundElement != null) {
            {
                //On met à jour les informations du popup pour indiquer les données de la sauvegarde.
                usernameFoundElement.innerHTML =
                    "Nom : " + localStorage.getItem("username");
                moneyFoundElement.innerHTML =
                    "Argent : " + localStorage.getItem("money") + " $";
                //On affiche le popup informant que des informations ont été trouvées
                popupSaveDataFoundElement.classList.remove("hidden");
            }
        }
    }
}
//Fonction qui vérifie si le nom fourni par l'utilisateur est valide. Si c'est le cas, création d'une sauvegarde et redirection vers la page de jeu.
function validateUsername() {
    if (usernameFieldElement != null) {
        var usernameFromField = usernameFieldElement.value;
        if (usernameFromField != "") {
            createSave(usernameFromField);
            window.location.href = "game.html";
        }
        else {
            alert("Veuillez entrer un nom d'utilisateur");
        }
    }
}
// ################### CODE JUSTE POUR MANAGE LES DONNEES DE SAUVEGARDES ###################
function createSave(username) {
    localStorage.setItem("username", username);
    localStorage.setItem("money", '0');
    localStorage.setItem("upgrade1lvl", '0');
    localStorage.setItem("upgrade2lvl", '0');
    localStorage.setItem("upgrade3lvl", '0');
    localStorage.setItem("elapsedTime", '0');
    localStorage.setItem("upgrade1Unlocked", 'false');
    localStorage.setItem("upgrade2Unlocked", 'false');
    localStorage.setItem("upgrade3Unlocked", 'false');
}
function deleteSave() {
    localStorage.removeItem("username");
    localStorage.removeItem("money");
    localStorage.removeItem("upgrade1lvl");
    localStorage.removeItem("upgrade2lvl");
    localStorage.removeItem("upgrade3lvl");
    localStorage.removeItem("elapsedTime");
    localStorage.removeItem("upgrade1Unlocked");
    localStorage.removeItem("upgrade2Unlocked");
    localStorage.removeItem("upgrade3Unlocked");
    window.location.href = "index.html";
}
function deleteStatistics() {
    localStorage.setItem("alltimeClicks", '0');
    localStorage.setItem("alltimeMoney", '0');
    localStorage.setItem("alltimeSpent", '0');
    localStorage.setItem("alltimeHighscore", '0');
    deleteSave();
}
function save() {
    localStorage.setItem("username", username);
    localStorage.setItem("money", money.toString());
    localStorage.setItem("upgrade1lvl", upgrade1lvl.toString());
    localStorage.setItem("upgrade2lvl", upgrade2lvl.toString());
    localStorage.setItem("upgrade3lvl", upgrade3lvl.toString());
    localStorage.setItem("elapsedTime", elapsedTime.toString());
    localStorage.setItem("alltimeClicks", alltimeClicks.toString());
    localStorage.setItem("alltimeMoney", alltimeMoney.toString());
    localStorage.setItem("alltimeSpent", alltimeSpent.toString());
    localStorage.setItem("alltimeHighscore", alltimeHighscore.toString());
    localStorage.setItem("upgrade1Unlocked", upgrade1Unlocked.toString());
    localStorage.setItem("upgrade2Unlocked", upgrade2Unlocked.toString());
    localStorage.setItem("upgrade3Unlocked", upgrade3Unlocked.toString());
}
function loadSave() {
    //Le 'as string' est nécessaire car Typescript alerte d'une erreur de type string||null. Or on sait que la valeur ne sera jamais null. On peut donc forcer le type.
    username = localStorage.getItem("username");
    money = parseInt(localStorage.getItem("money"));
    highscore = 0;
    upgrade1lvl = parseInt(localStorage.getItem("upgrade1lvl"));
    upgrade2lvl = parseInt(localStorage.getItem("upgrade2lvl"));
    upgrade3lvl = parseInt(localStorage.getItem("upgrade3lvl"));
    elapsedTime = parseInt(localStorage.getItem("elapsedTime"));
    alltimeClicks = parseInt(localStorage.getItem("alltimeClicks"));
    alltimeMoney = parseInt(localStorage.getItem("alltimeMoney"));
    alltimeSpent = parseInt(localStorage.getItem("alltimeSpent"));
    alltimeHighscore = parseInt(localStorage.getItem("alltimeHighscore"));
    clicksPerSecondLatest = alltimeClicks;
    moneyPerSecondLatest = alltimeMoney;
    upgrade1Unlocked = (localStorage.getItem("upgrade1Unlocked") == 'true') ? true : false;
    upgrade2Unlocked = (localStorage.getItem("upgrade2Unlocked") == 'true') ? true : false;
    upgrade3Unlocked = (localStorage.getItem("upgrade3Unlocked") == 'true') ? true : false;
}
function checkSaveValidity() {
    //Condition élargie sur plusieurs lignes pour plus de lisibilité
    if (localStorage.getItem("username") == undefined ||
        localStorage.getItem("money") == undefined ||
        localStorage.getItem("upgrade1lvl") == undefined ||
        localStorage.getItem("upgrade2lvl") == undefined ||
        localStorage.getItem("upgrade3lvl") == undefined ||
        localStorage.getItem("elapsedTime") == undefined) {
        return false;
    }
    else {
        return true;
    }
}
function goToGame() {
    window.location.href = "game.html";
}
//# sourceMappingURL=manageData.js.map