// ################### FICHIER DE GESTION DES DONNEES (VARIABLES/SAUVEGARDES) ###################

// ################### VARIABLES ###################
let username: string;
let money: number;
let upgrade1lvl: number;
let upgrade2lvl: number;
let upgrade3lvl: number;
let elapsedTime: number;
let highscore: number;
let alltimeClicks: number;
let alltimeMoney: number;
let alltimeSpent: number;
let alltimeHighscore: number;
let clicksPerSecondLatest: number;
let moneyPerSecondLatest: number;

let upgrade1DefaultPrice: number = 100;
let upgrade2DefaultPrice: number = 100;
let upgrade3DefaultPrice: number = 10000;
let upgrade1Price: number;
let upgrade2Price: number;
let upgrade3Price: number;

let upgrade1Unlocked: boolean = false;
let upgrade2Unlocked: boolean = false;
let upgrade3Unlocked: boolean = false;

//Nom de la page actuelle
let currentWebpage = window.location.pathname;

//Référence pour afficher le popup sur la page index.html lorsque qu'une sauvegarde est trouvée
let usernameFoundElement = document.getElementById("usernameFound");
let moneyFoundElement = document.getElementById("moneyFound");
let debugDataElement = document.getElementById("debugData");
let popupSaveDataFoundElement = document.getElementById("popupSaveDataFound");

//Référence pour récupérer le nom d'utilisateur entré dans le champ de texte
let usernameFieldElement = document.getElementById("username_field") as HTMLInputElement;


//Vérification de l'existence d'une sauvegarde selon la page dans laquelle l'utilisateur est.
//On vérifie que l'on est sur la page /index.html ou / (racine du site)
if (currentWebpage.match("index.html") || currentWebpage.match(/\/$/)) {
    //Verification que les données de sauvegarde existent et affichage du popup si c'est le cas
    if (checkSaveValidity()) {
        //Vérifie que les éléments sont bien chargés (exigé par Typescript)
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
                //On affiche le popup informant que des informations ont été trouvées
                popupSaveDataFoundElement.classList.remove("hidden");
            }
        }
    }
}

//Fonction qui vérifie si le nom fourni par l'utilisateur est valide. Si c'est le cas, création d'une sauvegarde et redirection vers la page de jeu.
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
    localStorage.setItem("upgrade1Unlocked", 'false');
    localStorage.setItem("upgrade2Unlocked", 'false');
    localStorage.setItem("upgrade3Unlocked", 'false');
}

function deleteSave():void {
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
    localStorage.setItem("upgrade1Unlocked", upgrade1Unlocked.toString());
    localStorage.setItem("upgrade2Unlocked", upgrade2Unlocked.toString());
    localStorage.setItem("upgrade3Unlocked", upgrade3Unlocked.toString());
}

function loadSave():void {
    //Le 'as string' est nécessaire car Typescript alerte d'une erreur de type string||null. Or on sait que la valeur ne sera jamais null. On peut donc forcer le type.
    username = localStorage.getItem("username") as string;
    money = parseInt(localStorage.getItem("money") as string);
    highscore = 0;
    upgrade1lvl = parseInt(localStorage.getItem("upgrade1lvl") as string);
    upgrade2lvl = parseInt(localStorage.getItem("upgrade2lvl") as string);
    upgrade3lvl = parseInt(localStorage.getItem("upgrade3lvl") as string);
    elapsedTime = parseInt(localStorage.getItem("elapsedTime") as string);
    alltimeClicks = parseInt(localStorage.getItem("alltimeClicks") as string);
    alltimeMoney = parseInt(localStorage.getItem("alltimeMoney") as string);
    alltimeSpent = parseInt(localStorage.getItem("alltimeSpent") as string);
    alltimeHighscore = parseInt(localStorage.getItem("alltimeHighscore") as string);
    clicksPerSecondLatest = alltimeClicks;
    moneyPerSecondLatest = alltimeMoney;

    upgrade1Unlocked = (localStorage.getItem("upgrade1Unlocked") as string == 'true') ? true : false;
    upgrade2Unlocked = (localStorage.getItem("upgrade2Unlocked") as string == 'true') ? true : false;
    upgrade3Unlocked = (localStorage.getItem("upgrade3Unlocked") as string == 'true') ? true : false;
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
