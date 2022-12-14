// ################### FICHIER DE GESTION DES DONNEES (VARIABLES/SAUVEGARDES) ###################

// ################### VARIABLES ###################
let username: string;
let money: number;
let upgrade1lvl: number;
let upgrade2lvl: number;
let upgrade3lvl: number;
let upgrade4lvl: number;
let upgrade5lvl: number;
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
let upgrade4DefaultPrice: number = 500000;
let upgrade5DefaultPrice: number = 1000000;
let upgrade1Price: number;
let upgrade2Price: number;
let upgrade3Price: number;
let upgrade4Price: number;
let upgrade5Price: number;

let upgrade1Unlocked: boolean = false;
let upgrade2Unlocked: boolean = false;
let upgrade3Unlocked: boolean = false;
let upgrade4Unlocked: boolean = false;
let upgrade5Unlocked: boolean = false;

//Nom de la page actuelle
let currentWebpage = window.location.pathname;

//Référence pour afficher le popup sur la page index.html lorsque qu'une sauvegarde est trouvée
let usernameFoundElement = document.getElementById("usernameFound");
let moneyFoundElement = document.getElementById("moneyFound");
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
    localStorage.setItem("upgrade4lvl", '0');
    localStorage.setItem("upgrade5lvl", '0');
    localStorage.setItem("elapsedTime", '0');
    localStorage.setItem("upgrade1Unlocked", 'false');
    localStorage.setItem("upgrade2Unlocked", 'false');
    localStorage.setItem("upgrade3Unlocked", 'false');
    localStorage.setItem("upgrade4Unlocked", 'false');
    localStorage.setItem("upgrade5Unlocked", 'false');
}

function deleteSave():void {
    localStorage.removeItem("username");
    localStorage.removeItem("money");
    localStorage.removeItem("upgrade1lvl");
    localStorage.removeItem("upgrade2lvl");
    localStorage.removeItem("upgrade3lvl");
    localStorage.removeItem("upgrade4lvl");
    localStorage.removeItem("upgrade5lvl");
    localStorage.removeItem("elapsedTime");
    localStorage.removeItem("upgrade1Unlocked");
    localStorage.removeItem("upgrade2Unlocked");
    localStorage.removeItem("upgrade3Unlocked");
    localStorage.removeItem("upgrade4Unlocked");
    localStorage.removeItem("upgrade5Unlocked");
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
    localStorage.setItem("upgrade4lvl", upgrade4lvl.toString());
    localStorage.setItem("upgrade5lvl", upgrade5lvl.toString());
    localStorage.setItem("elapsedTime", elapsedTime.toString());
    localStorage.setItem("alltimeClicks", alltimeClicks.toString());
    localStorage.setItem("alltimeMoney", alltimeMoney.toString());
    localStorage.setItem("alltimeSpent", alltimeSpent.toString());
    localStorage.setItem("alltimeHighscore", alltimeHighscore.toString());
    localStorage.setItem("upgrade1Unlocked", upgrade1Unlocked.toString());
    localStorage.setItem("upgrade2Unlocked", upgrade2Unlocked.toString());
    localStorage.setItem("upgrade3Unlocked", upgrade3Unlocked.toString());
    localStorage.setItem("upgrade4Unlocked", upgrade4Unlocked.toString());
    localStorage.setItem("upgrade5Unlocked", upgrade5Unlocked.toString());
}

function loadSave():void {
    //Le 'as string' est nécessaire car Typescript alerte d'une erreur de type string||null. Or on sait que la valeur ne sera jamais null. On peut donc forcer le type.
    username = localStorage.getItem("username") as string;
    money = parseInt(localStorage.getItem("money") as string);
    highscore = 0;
    upgrade1lvl = parseInt(localStorage.getItem("upgrade1lvl") as string);
    upgrade2lvl = parseInt(localStorage.getItem("upgrade2lvl") as string);
    upgrade3lvl = parseInt(localStorage.getItem("upgrade3lvl") as string);
    upgrade4lvl = parseInt(localStorage.getItem("upgrade4lvl") as string);
    upgrade5lvl = parseInt(localStorage.getItem("upgrade5lvl") as string);
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
    upgrade4Unlocked = (localStorage.getItem("upgrade4Unlocked") as string == 'true') ? true : false;
    upgrade5Unlocked = (localStorage.getItem("upgrade5Unlocked") as string == 'true') ? true : false;

}

function checkSaveValidity():boolean {
    //Condition élargie sur plusieurs lignes pour plus de lisibilité
    if (
        localStorage.getItem("username") == undefined ||
        localStorage.getItem("money") == undefined ||
        localStorage.getItem("upgrade1lvl") == undefined ||
        localStorage.getItem("upgrade2lvl") == undefined ||
        localStorage.getItem("upgrade3lvl") == undefined ||
        localStorage.getItem("upgrade4lvl") == undefined ||
        localStorage.getItem("upgrade5lvl") == undefined ||
        localStorage.getItem("elapsedTime") == undefined 
    ) {
        return false;
    } else {
        return true;
    }
}

function convertNumber(string){
    let input = string.toString();
    if (input.length > 3 && input.length <= 6) {
        return input.substring(0, input.length-3) + " K";
    }else if (input.length > 6 && input.length <= 9) {
        return input.substring(0, input.length-6) + " M";
    }else if (input.length > 9 && input.length <= 12) {
        return input.substring(0, input.length-9) + " B";
    }else if (input.length > 12 && input.length <= 15) {
        return input.substring(0, input.length-12) + " T";
    }else if (input.length > 15 && input.length <= 18) {
        return input.substring(0, input.length-15) + " Q";
    }else if (input.length > 18 && input.length <= 21) {
        return input.substring(0, input.length-18) + " Qi";
    }else if (input.length > 21 && input.length <= 24) {
        return input.substring(0, input.length-21) + " Sx";
    }else {
        return input;
    }
}

function goToGame():void {
    window.location.href = "game.html";
}