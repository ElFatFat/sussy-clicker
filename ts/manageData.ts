// ################### FICHIER DE GESTION DES DONNEES (VARIABLES/SAUVEGARDES) ###################
// Fichier en TypeScript car problème de type de variables avec JavaScript.
// Code surement à revoir (dû à l'apprentissage de TypeScript) pour plus de lisibilité et de clarté, ne pas hésiter à me reprendre sur les mauvaises pratiques.

let username: string;
let money: number;
let upgrade1lvl: number;
let upgrade2lvl: number;
let upgrade3lvl: number;
let elapsedTime: number;
let alltimeClicks: number;
let alltimeMoney: number;
let alltimeSpent: number;
let alltimeHighscore: number;

let upgrade1DefaultPrice: number = 100;
let upgrade2DefaultPrice: number = 100;
let upgrade3DefaultPrice: number = 10000;
let upgrade1Price: number;
let upgrade2Price: number;
let upgrade3Price: number;

//Nom de la page actuelle
let currentWebpage = window.location.pathname;

//Référence pour afficher le popup sur la page index.html lorsque qu'une sauvegarde est trouvée
let usernameFoundElement = document.getElementById("usernameFound");
let moneyFoundElement = document.getElementById("moneyFound");
let debugDataElement = document.getElementById("debugData");
let popupSaveDataFoundElement = document.getElementById("popupSaveDataFound");

let usernameFieldElement = document.getElementById("username_field") as HTMLInputElement;


//Vérification de l'existence d'une sauvegarde selon la page dans laquelle l'utilisateur est.
if (currentWebpage.match("index.html") || currentWebpage.match(/\/$/)) {
    //Verification que TOUTE les données sont présentes.
    if (!checkSaveValidity()) {
        console.log("Première connexion");
    } else {
        //Condition élargie sur plusieurs lignes pour plus de lisibilité
        if (
            usernameFoundElement != null &&
            moneyFoundElement != null &&
            debugDataElement != null &&
            popupSaveDataFoundElement != null
        ) {
            {
                //On met à jour les informations du popup pour indiquer les données de la sauvegarde.
                usernameFoundElement.innerHTML =
                    "Nom : " + localStorage.getItem("username");
                moneyFoundElement.innerHTML =
                    "Argent : " + localStorage.getItem("money") + " $";
                debugDataElement.innerHTML =
                    "Debug :     u1:" +
                    localStorage.getItem("upgrade1lvl") +
                    " u2:" +
                    localStorage.getItem("upgrade2lvl") +
                    " u3:" +
                    localStorage.getItem("upgrade3lvl") +
                    " eT:" +
                    localStorage.getItem("elapsedTime") +
                    "s";
                //On affiche le popup informant que des informations ont été trouvées
                popupSaveDataFoundElement.classList.remove("hidden");
            }
        }
    }
}

function validateUsername(): void {
    if(usernameFieldElement != null){
        let usernameFromField = usernameFieldElement.value;
        if (usernameFromField != "") {
            createSave(usernameFromField);
            window.location.href = "game.html";
        } else {
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
    console.debug("Sauvegarde créée !");
}

function deleteSave():void {
    localStorage.removeItem("username");
    localStorage.removeItem("money");
    localStorage.removeItem("upgrade1lvl");
    localStorage.removeItem("upgrade2lvl");
    localStorage.removeItem("upgrade3lvl");
    localStorage.removeItem("elapsedTime");
    window.location.href = "index.html";
}
function deleteStatistics():void {
    localStorage.setItem("alltimeClicks", '0');
    localStorage.setItem("alltimeMoney", '0');
    localStorage.setItem("alltimeSpent", '0');
    localStorage.setItem("alltimeHighscore", '0');
    deleteSave();
}
    
function save():void {
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
    console.debug("Sauvegarde effectuée !");
}

function loadSave():void {
    console.debug("Valeur du localStorage pendant loadSave() :" + localStorage.getItem('username'));
    //Le 'as string' est nécessaire car Typescript alerte d'une erreur de type string||null. Or on sait que la valeur ne sera jamais null. On peut donc forcer le type.
    username = localStorage.getItem("username") as string;
    money = parseInt(localStorage.getItem("money") as string);
    upgrade1lvl = parseInt(localStorage.getItem("upgrade1lvl") as string);
    upgrade2lvl = parseInt(localStorage.getItem("upgrade2lvl") as string);
    upgrade3lvl = parseInt(localStorage.getItem("upgrade3lvl") as string);
    elapsedTime = parseInt(localStorage.getItem("elapsedTime") as string);
    alltimeClicks = parseInt(localStorage.getItem("alltimeClicks") as string);
    alltimeMoney = parseInt(localStorage.getItem("alltimeMoney") as string);
    alltimeSpent = parseInt(localStorage.getItem("alltimeSpent") as string);
    alltimeHighscore = parseInt(localStorage.getItem("alltimeHighscore") as string);
}

function checkSaveValidity():boolean {
    //Condition élargie sur plusieurs lignes pour plus de lisibilité
    if (
        localStorage.getItem("username") == undefined ||
        localStorage.getItem("money") == undefined ||
        localStorage.getItem("upgrade1lvl") == undefined ||
        localStorage.getItem("upgrade2lvl") == undefined ||
        localStorage.getItem("upgrade3lvl") == undefined ||
        localStorage.getItem("elapsedTime") == undefined
    ) {
        return false;
    } else {
        return true;
    }
}

function goToGame():void {
    window.location.href = "game.html";
}
